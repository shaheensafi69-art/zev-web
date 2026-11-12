import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import { dispatchTelegramHtml, escapeTelegramHtml } from '@/lib/server/telegram';

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`referral-claim:${user.id}`, 10, 60 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many referral attempts.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const rawCode = String(body.referralCode || '')
    .trim()
    .replace(/^@+/, '');

  if (rawCode.length < 2 || rawCode.length > 64) {
    return NextResponse.json(
      { ok: false, error: 'Please provide a valid referral code or username.' },
      { status: 400 }
    );
  }

  // Prevent duplicate claims
  const [{ data: existingRef }, { data: selfProf }] = await Promise.all([
    admin.from('referrals').select('id, referrer_id').eq('referee_id', user.id).maybeSingle(),
    admin.from('profiles').select('referred_by').eq('id', user.id).maybeSingle(),
  ]);

  if (existingRef || (selfProf as Record<string, unknown> | null)?.referred_by) {
    return NextResponse.json(
      { ok: false, error: 'A referral code has already been claimed for this account.' },
      { status: 409 }
    );
  }

  // Look up referrer by referral_code OR username (case-insensitive)
  const safePattern = rawCode.replace(/[%_,()]/g, '');
  const { data: candidates, error: lookupErr } = await admin
    .from('profiles')
    .select('id, username, first_name, last_name, referral_code, referral_count')
    .or(`referral_code.ilike.${safePattern},username.ilike.${safePattern}`)
    .limit(5);

  if (lookupErr) {
    return NextResponse.json({ ok: false, error: lookupErr.message }, { status: 500 });
  }

  const matched = (candidates || []).find((c) => {
    const row = c as Record<string, unknown>;
    const rc = String(row.referral_code || '').toLowerCase();
    const un = String(row.username || '').toLowerCase();
    const target = rawCode.toLowerCase();
    return rc === target || un === target;
  }) as Record<string, unknown> | undefined;

  if (!matched) {
    return NextResponse.json(
      { ok: false, error: 'Referral code not found.' },
      { status: 404 }
    );
  }

  const referrerId = String(matched.id);
  if (referrerId === user.id) {
    return NextResponse.json(
      { ok: false, error: 'You cannot refer your own account.' },
      { status: 400 }
    );
  }

  const { error: insertErr } = await admin.from('referrals').insert({
    referrer_id: referrerId,
    referee_id: user.id,
    referred_id: user.id,
    referral_code: String(matched.referral_code || matched.username || rawCode),
    status: 'verified',
  });

  if (insertErr) {
    return NextResponse.json(
      { ok: false, error: insertErr.message },
      { status: 409 }
    );
  }

  await admin
    .from('profiles')
    .update({ referred_by: referrerId, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  // Re-fetch updated count on referrer (populated by DB trigger trg_referral_insert)
  const { data: updatedReferrer } = await admin
    .from('profiles')
    .select('username, first_name, last_name, referral_count')
    .eq('id', referrerId)
    .maybeSingle();

  const updatedCount = Number(
    (updatedReferrer as Record<string, unknown> | null)?.referral_count ??
      Number(matched.referral_count || 0) + 1
  );

  if (updatedCount >= 100) {
    const rName = `${matched.first_name || ''} ${matched.last_name || ''}`.trim() || String(matched.username || '');
    const html = [
      `🎉 <b>100 REFERRALS REACHED - LIFETIME BLUE UNLOCKED!</b> 🎉`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Full Name:</b> ${escapeTelegramHtml(rName)}`,
      `🔖 <b>Username:</b> @${escapeTelegramHtml(String(matched.username || 'user'))}`,
      `🆔 <b>User UUID:</b> <code>${escapeTelegramHtml(referrerId)}</code>`,
      `🏆 <b>Total Qualified Referrals:</b> <b>${updatedCount} / 100</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
    ].join('\n');
    await dispatchTelegramHtml(html);
  }

  return NextResponse.json({
    ok: true,
    referrerId,
    referrerUsername: String(matched.username || ''),
    referrerReferralCount: updatedCount,
  });
}

