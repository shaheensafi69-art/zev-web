import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import type { SupabaseClient } from '@supabase/supabase-js';

async function safeQuery(
  fn: () => PromiseLike<{ data: unknown; error: unknown }>
): Promise<unknown> {
  try {
    const { data, error } = await fn();
    if (error) return null;
    return data ?? [];
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`account-export:${user.id}`, 5, 60 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Export rate limit exceeded. Try again in an hour.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  const uid = user.id;
  const client: SupabaseClient = admin;

  const [
    profileRaw,
    userSettings,
    privacySettings,
    notificationPrefs,
    devicesRaw,
    securityLogs,
    userLinks,
    posts,
    postComments,
    postLikes,
    bookmarks,
    reels,
    reelComments,
    reelLikes,
    stories,
    highlights,
    follows,
    followRequests,
    blocks,
    mutes,
    directMessages,
    notifications,
    subscriptions,
    verifications,
    referrals,
    supportTickets,
  ] = await Promise.all([
    safeQuery(() => client.from('profiles').select('*').eq('id', uid).maybeSingle()),
    safeQuery(() => client.from('user_settings').select('*').eq('user_id', uid).maybeSingle()),
    safeQuery(() => client.from('user_privacy_settings').select('*').eq('user_id', uid).maybeSingle()),
    safeQuery(() => client.from('notification_preferences').select('*').eq('user_id', uid).maybeSingle()),
    safeQuery(() =>
      client
        .from('user_devices')
        .select('id, device_id, platform, device_name, app_version, is_active, last_seen_at, created_at')
        .eq('user_id', uid)
    ),
    safeQuery(() =>
      client
        .from('user_security_logs')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(200)
    ),
    safeQuery(() => client.from('user_links').select('*').eq('user_id', uid)),
    safeQuery(() => client.from('discussion_posts').select('*').eq('student_id', uid).order('created_at', { ascending: false })),
    safeQuery(() => client.from('discussion_comments').select('*').eq('student_id', uid).order('created_at', { ascending: false })),
    safeQuery(() => client.from('discussion_likes').select('*').eq('student_id', uid)),
    safeQuery(() => client.from('discussion_bookmarks').select('*').eq('user_id', uid)),
    safeQuery(() => client.from('reels').select('*').eq('user_id', uid).order('created_at', { ascending: false })),
    safeQuery(() => client.from('reel_comments').select('*').eq('user_id', uid).order('created_at', { ascending: false })),
    safeQuery(() => client.from('reel_likes').select('*').eq('user_id', uid)),
    safeQuery(() => client.from('user_stories').select('*').eq('user_id', uid).order('created_at', { ascending: false })),
    safeQuery(() => client.from('user_highlights').select('*').eq('user_id', uid)),
    safeQuery(() =>
      client
        .from('user_follows')
        .select('*')
        .or(`follower_id.eq.${uid},following_id.eq.${uid}`)
    ),
    safeQuery(() =>
      client
        .from('follow_requests')
        .select('*')
        .or(`requester_id.eq.${uid},target_id.eq.${uid}`)
    ),
    safeQuery(() => client.from('user_blocks').select('*').eq('blocker_id', uid)),
    safeQuery(() => client.from('user_mutes').select('*').eq('muter_id', uid)),
    safeQuery(() =>
      client
        .from('direct_messages')
        .select('id, conversation_id, sender_id, receiver_id, message_text, message_type, attachment_url, attachment_type, is_read, created_at')
        .or(`sender_id.eq.${uid},receiver_id.eq.${uid}`)
        .order('created_at', { ascending: false })
        .limit(2000)
    ),
    safeQuery(() =>
      client
        .from('user_notifications')
        .select('*')
        .eq('user_id', uid)
        .order('created_at', { ascending: false })
        .limit(500)
    ),
    safeQuery(() => client.from('subscriptions').select('*').eq('user_id', uid)),
    safeQuery(() => client.from('user_verifications').select('*').eq('user_id', uid)),
    safeQuery(() =>
      client
        .from('referrals')
        .select('id, referrer_id, referee_id, status, created_at')
        .or(`referrer_id.eq.${uid},referee_id.eq.${uid}`)
    ),
    safeQuery(() =>
      client
        .from('user_support_tickets')
        .select('id, category, subject, description, status, created_at')
        .eq('user_id', uid)
    ),
  ]);

  // Strip push/device tokens before returning profile JSON
  let sanitizedProfile: Record<string, unknown> | null = null;
  if (profileRaw && typeof profileRaw === 'object' && !Array.isArray(profileRaw)) {
    const copy = { ...(profileRaw as Record<string, unknown>) };
    delete copy.fcm_token;
    sanitizedProfile = copy;
  }

  try {
    await client.from('user_security_logs').insert({
      user_id: uid,
      event_type: 'data_export',
      status: 'success',
      metadata: { exported_at: new Date().toISOString() },
    });
  } catch {
    // Table added in Phase 2
  }

  const exportPayload = {
    schemaVersion: '1.0',
    exportedAt: new Date().toISOString(),
    account: {
      id: uid,
      email: user.email,
      createdAt: user.created_at,
      lastSignInAt: user.last_sign_in_at,
      providers: user.app_metadata?.providers || [],
    },
    profile: sanitizedProfile,
    settings: {
      userSettings,
      privacySettings,
      notificationPrefs,
    },
    devices: devicesRaw,
    securityLogs,
    links: userLinks,
    content: {
      posts,
      postComments,
      postLikes,
      bookmarks,
      reels,
      reelComments,
      reelLikes,
      stories,
      highlights,
    },
    social: {
      follows,
      followRequests,
      blocks,
      mutes,
    },
    directMessages,
    notifications,
    billingAndVerification: {
      subscriptions,
      verifications,
      referrals,
      supportTickets,
    },
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);
  const filename = `zev-data-export-${uid.slice(0, 8)}.json`;

  return new NextResponse(jsonString, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}

