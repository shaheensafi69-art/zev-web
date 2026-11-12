import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import { dispatchTelegramHtml, escapeTelegramHtml } from '@/lib/server/telegram';

const PLAN_PRICES: Record<string, { name: string; priceLabel: string; amount: number }> = {
  monthly: { name: 'ZEV Blue Monthly', priceLabel: '$2.99 / month', amount: 2.99 },
  yearly: { name: 'ZEV Blue Yearly', priceLabel: '$24.99 / year', amount: 24.99 },
  lifetime: { name: 'ZEV Blue Lifetime', priceLabel: '$49.99 once', amount: 49.99 },
};

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`verification:${user.id}`, 10, 15 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many verification requests. Please wait before retrying.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const mode = String(body.mode || 'subscription').trim().toLowerCase();

  const { data: profile, error: profileErr } = await admin
    .from('profiles')
    .select('id, username, first_name, last_name, email, referral_code, referral_count, is_verified, lifetime_blue_eligible')
    .eq('id', user.id)
    .single();

  if (profileErr || !profile) {
    return NextResponse.json({ ok: false, error: 'User profile not found.' }, { status: 404 });
  }

  const p = profile as Record<string, unknown>;
  const username = String(p.username || 'user');
  const fullNameFromDb = `${p.first_name || ''} ${p.last_name || ''}`.trim();
  const fullName = String(body.fullName || fullNameFromDb || username).trim();
  const refCode = String(p.referral_code || username);
  const referralCount = Number(p.referral_count || 0);

  if (mode === 'referral_milestone') {
    const { count: realRefRows } = await admin
      .from('referrals')
      .select('id', { count: 'exact', head: true })
      .eq('referrer_id', user.id);

    const authoritativeCount = Math.max(referralCount, realRefRows || 0);
    if (authoritativeCount < 100 && p.lifetime_blue_eligible !== true) {
      return NextResponse.json(
        {
          ok: false,
          error: `Milestone requires 100 verified referrals (current: ${authoritativeCount}).`,
          currentReferrals: authoritativeCount,
        },
        { status: 400 }
      );
    }

    const milestoneNow = new Date().toISOString();
    await admin
      .from('profiles')
      .update({
        is_verified: true,
        lifetime_blue_eligible: true,
        referral_count: authoritativeCount,
        updated_at: milestoneNow,
      })
      .eq('id', user.id);

    await admin.from('user_verifications').upsert(
      {
        user_id: user.id,
        badge_type: 'blue_tick',
        badge_label: 'Referral Legend',
        status: 'verified',
        is_active: true,
        plan_type: 'lifetime_referral',
        verification_reason: `Earned Free Lifetime ZEV Blue via ${authoritativeCount} verified referrals`,
        verified_at: milestoneNow,
        expires_at: null,
        updated_at: milestoneNow,
      },
      { onConflict: 'user_id' }
    );

    await admin.from('subscriptions').upsert(
      {
        user_id: user.id,
        plan: 'lifetime_referral',
        plan_type: 'lifetime_referral',
        status: 'active',
        amount: 0,
        plan_price: '$0.00',
        currency: 'USD',
        payment_method: '100-Referral Milestone',
        is_active: true,
        starts_at: milestoneNow,
        expires_at: null,
        updated_at: milestoneNow,
      },
      { onConflict: 'user_id' }
    );

    await admin.from('user_notifications').insert({
      user_id: user.id,
      title: 'Lifetime ZEV Blue Unlocked!',
      message: `Congratulations! With ${authoritativeCount} verified referrals, your permanent Free ZEV Blue Badge is now active.`,
      notification_type: 'verification',
      app_source: 'zev',
      is_read: false,
    });

    await admin.from('user_support_tickets').insert({
      user_id: user.id,
      username,
      email: String(p.email || user.email || '') || null,
      category: 'blue_verification_milestone',
      subject: `100 Referral Milestone Activated (@${username})`,
      description: `User reached ${authoritativeCount} verified referrals and activated Lifetime ZEV Blue.`,
      status: 'resolved',
      priority: 'high',
    });

    const html = [
      `🎉 <b>100 REFERRALS REACHED - LIFETIME BLUE UNLOCKED!</b> 🎉`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Full Name:</b> ${escapeTelegramHtml(fullName)}`,
      `🔖 <b>Username:</b> @${escapeTelegramHtml(username)}`,
      `🆔 <b>User UUID:</b> <code>${escapeTelegramHtml(user.id)}</code>`,
      `🏆 <b>Total Qualified Referrals:</b> <b>${authoritativeCount} / 100</b>`,
      ``,
      `🌟 <b>Status:</b> Lifetime ZEV Blue Badge activated automatically.`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
    ].join('\n');

    const tg = await dispatchTelegramHtml(html);
    return NextResponse.json({
      ok: true,
      mode: 'referral_milestone',
      activated: true,
      telegramSent: tg.sent,
    });
  }

  // Subscription / Blue Badge request flow
  const rawPlanKey = String(body.planKey || 'monthly').trim().toLowerCase();
  const planMeta = PLAN_PRICES[rawPlanKey] || {
    name: String(body.planName || rawPlanKey),
    priceLabel: String(body.planPrice || 'Custom'),
    amount: Number(body.numericAmount || 0) || 0,
  };

  const phone = String(body.phone || '').trim();
  if (phone.length < 5) {
    return NextResponse.json(
      { ok: false, error: 'A valid Phone or WhatsApp number is required.' },
      { status: 400 }
    );
  }

  const email = String(body.email || p.email || user.email || '').trim();
  const notes = String(body.notes || '').trim().slice(0, 1000);
  const paymentMethod = String(body.paymentMethod || 'In-App Review / Direct').trim().slice(0, 80);
  const reason = `Plan: ${planMeta.name} (${planMeta.priceLabel}) | Contact: ${phone} | Name: ${fullName} | Notes: ${notes} | Method: ${paymentMethod}`;
  const nowIso = new Date().toISOString();

  // Check if user already holds an active non-expired paid subscription -> NEVER downgrade it
  const { data: existingSub } = await admin
    .from('subscriptions')
    .select('id, status, is_active, expires_at, plan')
    .eq('user_id', user.id)
    .maybeSingle();

  const subRow = existingSub as Record<string, unknown> | null;
  const hasActivePaidSub =
    subRow &&
    subRow.is_active === true &&
    subRow.status === 'active' &&
    (!subRow.expires_at || new Date(String(subRow.expires_at)) > new Date());

  if (!hasActivePaidSub) {
    await admin.from('user_verifications').upsert(
      {
        user_id: user.id,
        badge_type: 'blue_tick',
        badge_label: 'Verified Creator',
        status: 'pending',
        is_active: false,
        verification_reason: reason,
        plan_type: rawPlanKey,
        updated_at: nowIso,
      },
      { onConflict: 'user_id' }
    );

    await admin.from('subscriptions').upsert(
      {
        user_id: user.id,
        plan: rawPlanKey,
        plan_type: rawPlanKey,
        status: 'pending',
        amount: planMeta.amount,
        plan_price: planMeta.amount,
        currency: 'USD',
        payment_method: paymentMethod,
        contact_phone: phone,
        notes,
        is_active: false,
        updated_at: nowIso,
      },
      { onConflict: 'user_id' }
    );
  }

  // Always record an immutable ticket audit entry
  await admin.from('user_support_tickets').insert({
    user_id: user.id,
    username,
    email: email || null,
    phone,
    category: 'blue_verification',
    subject: `ZEV Blue Request: ${planMeta.name} (@${username})`,
    description: hasActivePaidSub
      ? `[Active subscriber renewal/upgrade inquiry] ${reason}`
      : reason,
    status: 'open',
    priority: 'high',
  });

  const dateStr = nowIso.slice(0, 10);
  const timeStr = nowIso.slice(11, 19) + ' UTC';

  const html = [
    `💎 <b>NEW ZEV BLUE VERIFICATION REQUEST</b> 💎`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Full Name:</b> ${escapeTelegramHtml(fullName || 'Not provided')}`,
    `🔖 <b>Username:</b> @${escapeTelegramHtml(username)}`,
    `📧 <b>Email:</b> ${escapeTelegramHtml(email || 'Not provided')}`,
    `📞 <b>Phone / WhatsApp:</b> <code>${escapeTelegramHtml(phone)}</code>`,
    `🆔 <b>User UUID:</b> <code>${escapeTelegramHtml(user.id)}</code>`,
    ``,
    `📦 <b>Selected Plan:</b> <b>${escapeTelegramHtml(planMeta.name)}</b>`,
    `💰 <b>Price:</b> <b>${escapeTelegramHtml(planMeta.priceLabel)}</b>`,
    `🔗 <b>Referral Code:</b> <code>${escapeTelegramHtml(refCode)}</code>`,
    `👥 <b>Current Referrals:</b> <b>${referralCount} / 100</b>`,
    ``,
    `📝 <b>Notes / Message:</b>`,
    `<i>${escapeTelegramHtml(notes || 'None')}</i>`,
    ``,
    `📅 <b>Date:</b> ${dateStr}`,
    `⏰ <b>Time:</b> ${timeStr}`,
    `━━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Action Required: Review details and verify payment on Admin Panel.</i>`,
  ].join('\n');

  const tg = await dispatchTelegramHtml(html);

  return NextResponse.json({
    ok: true,
    mode: 'subscription',
    preservedExistingActiveSubscription: Boolean(hasActivePaidSub),
    telegramSent: tg.sent,
  });
}

