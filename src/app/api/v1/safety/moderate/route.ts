import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser, getSupabaseAdmin } from '@/lib/server/supabaseAdmin';

interface SafetyResult {
  isSafe: boolean;
  blockedCategory?: string;
  errorMessage?: string;
  likelihoods?: Record<string, string>;
  provider: string;
}

async function handleModerationViolation(userId: string, blockedCategory: string) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('warning_count, is_restricted')
      .eq('id', userId)
      .single();

    const currentStrikes = profile?.warning_count || 0;
    const newStrikes = currentStrikes + 1;
    const nowIso = new Date().toISOString();

    if (newStrikes >= 2) {
      // 2nd strike or more: Automatically restrict account for 3 days (72 hours)
      const expiresAt = new Date(Date.now() + 72 * 3600 * 1000).toISOString();
      const reason =
        'Automated AI Moderation: Repeated attempts to upload prohibited (+18) content.';

      await supabaseAdmin
        .from('profiles')
        .update({
          is_restricted: true,
          restricted_until: expiresAt,
          restriction_reason: reason,
          warning_count: newStrikes,
          last_warning_at: nowIso,
          last_warning_reason: 'Prohibited adult content violation (Strike 2 - Account Restricted)',
          updated_at: nowIso,
        })
        .eq('id', userId);

      try {
        await supabaseAdmin.from('user_restrictions').insert({
          user_id: userId,
          type: 'RESTRICTION',
          warning_level: 2,
          reason: 'Automated AI Moderation: Prohibited adult (+18) content violation (Strike 2)',
          details: `Automated detection via Cloud Vision/Gemini (${blockedCategory}). Account placed under 72h restriction.`,
          duration_hours: 72,
          expires_at: expiresAt,
          status: 'active',
          created_by: 'ZEV AI Cloud Moderation',
        });
      } catch (e) {
        console.warn('Failed to insert user_restrictions log:', e);
      }

      try {
        await supabaseAdmin.from('user_notifications').insert({
          user_id: userId,
          title: 'Account Restriction Notice 🚫',
          message:
            'Your ZEV account has been temporarily restricted for 3 days due to repeated attempts to post prohibited (+18) content. Certain features are limited.',
          notification_type: 'account_restricted',
          app_source: 'zev',
          is_read: false,
        });
      } catch (e) {
        console.warn('Failed to insert user_notifications log:', e);
      }

      return {
        isRestricted: true,
        strikes: newStrikes,
        errorMessage:
          'این محتوا به دلیل شامل بودن موارد غیراخلاقی (+۱۸) مسدود شد. به دلیل نقض مکرر قوانین، حساب شما به مدت ۳ روز محدود (ری‌استریکت) شد.',
      };
    } else {
      // 1st strike: Warning
      await supabaseAdmin
        .from('profiles')
        .update({
          warning_count: 1,
          last_warning_at: nowIso,
          last_warning_reason: 'Prohibited adult content violation (Strike 1 - Warning)',
          updated_at: nowIso,
        })
        .eq('id', userId);

      try {
        await supabaseAdmin.from('user_notifications').insert({
          user_id: userId,
          title: 'Policy Warning: Inappropriate Content ⚠️',
          message:
            'Your upload was blocked because it contained prohibited (+18) adult content. Please note that a second attempt will result in immediate account restriction.',
          notification_type: 'warning',
          app_source: 'zev',
          is_read: false,
        });
      } catch (e) {
        console.warn('Failed to insert warning notification:', e);
      }

      return {
        isRestricted: false,
        strikes: 1,
        errorMessage:
          'این محتوا به دلیل شامل بودن موارد غیراخلاقی (+۱۸) مسدود شد (اخطار ۱ از ۲). در صورت تکرار مجدد، حساب شما به صورت خودکار ری‌استریکت خواهد شد.',
      };
    }
  } catch (err) {
    console.error('[handleModerationViolation] Error updating strikes:', err);
    return { isRestricted: false, strikes: 1 };
  }
}

async function runGoogleVisionSafeSearch(
  base64Image: string,
  apiKey: string
): Promise<SafetyResult | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'SAFE_SEARCH_DETECTION' }],
            },
          ],
        }),
        signal: controller.signal,
      }
    );
    clearTimeout(timer);

    if (!res.ok) return null;

    const json = (await res.json()) as {
      responses?: Array<{
        safeSearchAnnotation?: Record<string, string>;
      }>;
    };
    const annotation = json.responses?.[0]?.safeSearchAnnotation;
    if (!annotation) return null;

    const adult = (annotation.adult || 'UNKNOWN').toUpperCase();
    const racy = (annotation.racy || 'UNKNOWN').toUpperCase();
    const violence = (annotation.violence || 'UNKNOWN').toUpperCase();

    const likelihoods = {
      adult,
      racy,
      violence,
      medical: (annotation.medical || 'UNKNOWN').toUpperCase(),
      spoof: (annotation.spoof || 'UNKNOWN').toUpperCase(),
    };

    if (adult === 'LIKELY' || adult === 'VERY_LIKELY' || racy === 'VERY_LIKELY') {
      return {
        isSafe: false,
        blockedCategory: 'adult',
        errorMessage:
          'این محتوا شامل موارد غیراخلاقی یا نامناسب (+۱۸) تشخیص داده شد و امکان انتشار آن در زِو وجود ندارد.',
        likelihoods,
        provider: 'google-vision',
      };
    }

    if (violence === 'VERY_LIKELY') {
      return {
        isSafe: false,
        blockedCategory: 'violence',
        errorMessage:
          'این محتوا حاوی صحنه‌های خشونت شدید یا نامناسب تشخیص داده شد و امکان انتشار آن در زِو وجود ندارد.',
        likelihoods,
        provider: 'google-vision',
      };
    }

    return { isSafe: true, likelihoods, provider: 'google-vision' };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

async function runGeminiSafetyFallback(
  base64Image: string,
  mimeType: string,
  apiKey: string
): Promise<SafetyResult | null> {
  const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
  const prompt =
    'Evaluate this image for moderation. Does this image depict explicit adult content, pornography, sexual nudity, or extreme violence? Respond ONLY with JSON: {"is_adult": boolean, "is_violence": boolean}';

  for (const model of models) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inline_data: {
                      mime_type: mimeType,
                      data: base64Image,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0,
              response_mime_type: 'application/json',
            },
          }),
          signal: controller.signal,
        }
      );
      clearTimeout(timer);

      if (!res.ok) continue;

      const json = (await res.json()) as {
        candidates?: Array<{
          content?: { parts?: Array<{ text?: string }> };
        }>;
      };
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!rawText) continue;

      const parsed = JSON.parse(rawText) as { is_adult?: boolean; is_violence?: boolean };
      if (parsed.is_adult) {
        return {
          isSafe: false,
          blockedCategory: 'adult',
          errorMessage:
            'این محتوا به دلیل شامل بودن موارد غیراخلاقی (+۱۸) مسدود شد و در زِو مجاز نیست.',
          provider: model,
        };
      }
      if (parsed.is_violence) {
        return {
          isSafe: false,
          blockedCategory: 'violence',
          errorMessage:
            'این محتوا به دلیل شامل بودن خشونت شدید مسدود شد و در زِو مجاز نیست.',
          provider: model,
        };
      }
      return { isSafe: true, provider: model };
    } catch {
      clearTimeout(timer);
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user } = auth.ctx;

  const rl = checkRateLimit(`moderate:${user.id}`, 45, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many moderation requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const rawImage = typeof body.imageBase64 === 'string' ? body.imageBase64.trim() : '';
  const mimeType =
    typeof body.mimeType === 'string' && body.mimeType.startsWith('image/')
      ? body.mimeType
      : 'image/jpeg';

  if (!rawImage) {
    return NextResponse.json({ ok: true, isSafe: true, provider: 'none' });
  }

  const base64Image = rawImage.includes('base64,')
    ? rawImage.split('base64,').pop() || ''
    : rawImage;

  if (base64Image.length > 8 * 1024 * 1024) {
    return NextResponse.json(
      { ok: false, error: 'Image payload too large for safety scan (max ~6 MB).' },
      { status: 413 }
    );
  }

  const visionKey = (process.env.GOOGLE_VISION_API_KEY || '').trim();
  const geminiKey = (process.env.GOOGLE_GEMINI_API_KEY || visionKey).trim();

  if (visionKey) {
    const visionRes = await runGoogleVisionSafeSearch(base64Image, visionKey);
    if (visionRes) {
      if (!visionRes.isSafe) {
        const violation = await handleModerationViolation(
          user.id,
          visionRes.blockedCategory || 'adult'
        );
        return NextResponse.json({
          ok: true,
          ...visionRes,
          isRestricted: violation.isRestricted,
          strikes: violation.strikes,
          errorMessage: violation.errorMessage || visionRes.errorMessage,
        });
      }
      return NextResponse.json({ ok: true, ...visionRes });
    }
  }

  if (geminiKey) {
    const geminiRes = await runGeminiSafetyFallback(base64Image, mimeType, geminiKey);
    if (geminiRes) {
      if (!geminiRes.isSafe) {
        const violation = await handleModerationViolation(
          user.id,
          geminiRes.blockedCategory || 'adult'
        );
        return NextResponse.json({
          ok: true,
          ...geminiRes,
          isRestricted: violation.isRestricted,
          strikes: violation.strikes,
          errorMessage: violation.errorMessage || geminiRes.errorMessage,
        });
      }
      return NextResponse.json({ ok: true, ...geminiRes });
    }
  }

  // Graceful fallback so upstream API latency does not lock out users
  return NextResponse.json({
    ok: true,
    isSafe: true,
    degraded: true,
    provider: 'fallback',
  });
}

