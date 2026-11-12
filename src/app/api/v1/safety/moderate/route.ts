import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';

interface SafetyResult {
  isSafe: boolean;
  blockedCategory?: string;
  errorMessage?: string;
  likelihoods?: Record<string, string>;
  provider: string;
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
      return NextResponse.json({ ok: true, ...visionRes });
    }
  }

  if (geminiKey) {
    const geminiRes = await runGeminiSafetyFallback(base64Image, mimeType, geminiKey);
    if (geminiRes) {
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

