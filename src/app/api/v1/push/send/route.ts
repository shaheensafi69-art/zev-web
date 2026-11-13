import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getSupabaseAdmin,
  requireAuthUser,
} from '@/lib/server/supabaseAdmin';
import { getFirebaseServiceAccount, sendFcmMulticast } from '@/lib/server/fcm';

function hasValidCronSecret(req: NextRequest): boolean {
  const expected = (process.env.CRON_SECRET_KEY || '').trim();
  const provided = (req.headers.get('x-cron-secret') || '').trim();
  if (!expected || !provided) return false;
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(provided, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const isCron = hasValidCronSecret(req);
  let callerUserId: string | null = null;

  if (!isCron) {
    const auth = await requireAuthUser(req);
    if (!auth.ok) return auth.response;
    callerUserId = auth.ctx.user.id;

    const rl = checkRateLimit(`push:${callerUserId}`, 60, 60_000);
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Push rate limit exceeded.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
      );
    }
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const recipientUserId = String(body.recipientUserId || '').trim();
  const title = String(body.title || '').trim().slice(0, 120);
  const messageBody = String(body.body || '').trim().slice(0, 500);
  const notificationType = String(body.notificationType || 'general').trim().slice(0, 64);
  const deepLink = String(body.deepLink || '').trim().slice(0, 300);
  const androidChannelId = String(body.androidChannelId || 'zev_notifications_v3').trim();
  const testSelf = body.testSelf === true;

  if (!recipientUserId || !title || !messageBody) {
    return NextResponse.json(
      { ok: false, error: 'recipientUserId, title, and body are required.' },
      { status: 400 }
    );
  }

  // Prevent regular users from spoofing another sender
  const senderId = isCron
    ? (typeof body.senderId === 'string' ? body.senderId.trim() : null)
    : callerUserId;

  if (senderId && senderId === recipientUserId && !testSelf) {
    return NextResponse.json({ ok: true, skipped: 'self_notification', sentCount: 0 });
  }

  const admin = getSupabaseAdmin();

  // Respect user_blocks cleanly (defensive try/catch before/after Phase 2)
  if (senderId && senderId !== recipientUserId) {
    try {
      const { data: blocks } = await admin
        .from('user_blocks')
        .select('id')
        .or(
          `and(blocker_id.eq.${recipientUserId},blocked_id.eq.${senderId}),and(blocker_id.eq.${senderId},blocked_id.eq.${recipientUserId})`
        )
        .limit(1);
      if (Array.isArray(blocks) && blocks.length > 0) {
        return NextResponse.json({ ok: true, skipped: 'blocked', sentCount: 0 });
      }
    } catch {
      // Ignore schema variation
    }
  }

  // Respect notification_preferences & quiet hours (Phase 2 & Phase 5)
  const normType = notificationType.toLowerCase();
  try {
    const { data: prefs } = await admin
      .from('notification_preferences')
      .select('*')
      .eq('user_id', recipientUserId)
      .maybeSingle();

    if (prefs) {
      const p = prefs as Record<string, unknown>;
      if (p.push_enabled === false || p.pause_all === true) {
        return NextResponse.json({ ok: true, skipped: 'preferences_paused', sentCount: 0 });
      }
      if (
        (normType === 'message' ||
          normType.includes('chat') ||
          normType === 'dm' ||
          normType === 'direct_message' ||
          normType === 'group_message' ||
          normType === 'group_invitation') &&
        p.messages_enabled === false
      ) {
        return NextResponse.json({ ok: true, skipped: 'preferences_messages', sentCount: 0 });
      }
      if (normType.includes('like') && p.likes_enabled === false) {
        return NextResponse.json({ ok: true, skipped: 'preferences_likes', sentCount: 0 });
      }
      if (
        (normType.includes('comment') || normType.includes('reply')) &&
        p.comments_enabled === false
      ) {
        return NextResponse.json({ ok: true, skipped: 'preferences_comments', sentCount: 0 });
      }
      if (normType.includes('follow') && p.follows_enabled === false) {
        return NextResponse.json({ ok: true, skipped: 'preferences_follows', sentCount: 0 });
      }
      if (
        (normType.includes('mention') || normType.includes('tag')) &&
        p.mentions_enabled === false
      ) {
        return NextResponse.json({ ok: true, skipped: 'preferences_mentions', sentCount: 0 });
      }
      if (normType.includes('story') && p.stories_enabled === false) {
        return NextResponse.json({ ok: true, skipped: 'preferences_stories', sentCount: 0 });
      }
      if (normType.includes('live') && p.live_enabled === false) {
        return NextResponse.json({ ok: true, skipped: 'preferences_live', sentCount: 0 });
      }
      if (
        (normType.includes('marketing') || normType.includes('promo')) &&
        p.marketing_enabled === false
      ) {
        return NextResponse.json({ ok: true, skipped: 'preferences_marketing', sentCount: 0 });
      }

      // Check optional UTC quiet hours window (HH:MM)
      const qStart = typeof p.quiet_hours_start === 'string' ? p.quiet_hours_start.trim() : '';
      const qEnd = typeof p.quiet_hours_end === 'string' ? p.quiet_hours_end.trim() : '';
      const parseMinutes = (hhmm: string): number | null => {
        const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
        if (!m) return null;
        const h = Number(m[1]);
        const min = Number(m[2]);
        if (h < 0 || h > 23 || min < 0 || min > 59) return null;
        return h * 60 + min;
      };
      const startMin = parseMinutes(qStart);
      const endMin = parseMinutes(qEnd);
      if (startMin !== null && endMin !== null && startMin !== endMin) {
        const now = new Date();
        const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes();
        const inQuiet =
          startMin < endMin
            ? nowMin >= startMin && nowMin < endMin
            : nowMin >= startMin || nowMin < endMin;
        if (inQuiet) {
          return NextResponse.json({ ok: true, skipped: 'quiet_hours', sentCount: 0 });
        }
      }
    }
  } catch {
    // notification_preferences fallback
  }

  // Collect deduplicated active FCM tokens
  const tokenSet = new Set<string>();

  try {
    const { data: deviceRows } = await admin
      .from('user_devices')
      .select('fcm_token')
      .eq('user_id', recipientUserId)
      .eq('is_active', true);

    if (Array.isArray(deviceRows)) {
      for (const row of deviceRows) {
        const tok = String((row as Record<string, unknown>).fcm_token || '').trim();
        if (tok.length > 20) tokenSet.add(tok);
      }
    }
  } catch {
    // user_devices added in Phase 2
  }

  try {
    const { data: pushRows } = await admin
      .from('push_subscriptions')
      .select('fcm_token')
      .eq('user_id', recipientUserId)
      .eq('is_active', true);

    if (Array.isArray(pushRows)) {
      for (const row of pushRows) {
        const tok = String((row as Record<string, unknown>).fcm_token || '').trim();
        if (tok.length > 20) tokenSet.add(tok);
      }
    }
  } catch {
    // Ignore
  }

  try {
    const { data: prof } = await admin
      .from('profiles')
      .select('fcm_token')
      .eq('id', recipientUserId)
      .maybeSingle();

    if (prof) {
      const p = prof as Record<string, unknown>;
      const tok = typeof p.fcm_token === 'string' ? p.fcm_token.trim() : '';
      if (tok.length > 20) tokenSet.add(tok);
    }
  } catch {
    // Ignore
  }

  const tokens = Array.from(tokenSet);
  if (tokens.length === 0) {
    return NextResponse.json({
      ok: true,
      sentCount: 0,
      reason: 'no_active_tokens',
    });
  }

  if (!getFirebaseServiceAccount()) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: 'FIREBASE_SERVICE_ACCOUNT_JSON is not configured on the server.',
      },
      { status: 503 }
    );
  }

  const dataMap: Record<string, string> = {
    type: notificationType,
    notification_type: notificationType,
    recipient_user_id: recipientUserId,
  };
  if (senderId) dataMap.sender_id = senderId;
  if (deepLink) {
    dataMap.deep_link = deepLink;
    dataMap.link_url = deepLink;
  }

  if (body.data && typeof body.data === 'object' && !Array.isArray(body.data)) {
    for (const [k, v] of Object.entries(body.data as Record<string, unknown>)) {
      if (v !== null && v !== undefined) {
        dataMap[String(k)] = String(v);
      }
    }
  }

  let badgeCount: number | undefined;
  try {
    const [{ count: unreadNotif }, { count: unreadDm }] = await Promise.all([
      admin
        .from('user_notifications')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', recipientUserId)
        .eq('is_read', false),
      admin
        .from('direct_messages')
        .select('id', { count: 'exact', head: true })
        .eq('receiver_id', recipientUserId)
        .eq('is_read', false)
        .is('deleted_at', null),
    ]);
    badgeCount = (unreadNotif ?? 0) + (unreadDm ?? 0);
  } catch {
    // Ignore badge lookup failure
  }

  const result = await sendFcmMulticast(admin, {
    tokens,
    title,
    body: messageBody,
    data: dataMap,
    androidChannelId,
    badgeCount,
    collapseTag: deepLink ? `${normType}:${deepLink}` : normType,
  });

  // Log notification delivery defensively
  try {
    await admin.from('notification_deliveries').insert({
      user_id: recipientUserId,
      notification_type: notificationType,
      status: result.sentCount > 0 ? 'sent' : 'failed',
      tokens_targeted: tokens.length,
      sent_count: result.sentCount,
      failed_count: result.failedCount,
      error_message: result.error || null,
    });
  } catch {
    // notification_deliveries added in Phase 2
  }

  return NextResponse.json({
    ok: result.sentCount > 0 || result.failedCount === 0,
    configured: result.configured,
    sentCount: result.sentCount,
    failedCount: result.failedCount,
    invalidTokensCount: result.invalidTokens.length,
  });
}

