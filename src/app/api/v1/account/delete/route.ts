import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import { deleteZevR2Object } from '@/lib/server/r2Signer';
import { dispatchTelegramHtml, escapeTelegramHtml } from '@/lib/server/telegram';

function isManagedZevMediaUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  return (
    trimmed.startsWith('https://media.zevapp.com/zev/') ||
    trimmed.startsWith('zev/')
  );
}

async function handleDelete(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`account-delete:${user.id}`, 3, 60 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many account deletion requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const confirmed = body.confirm === true || String(body.confirmation || '').toUpperCase() === 'DELETE';
  if (!confirmed) {
    return NextResponse.json(
      { ok: false, error: 'Account deletion requires explicit confirmation.' },
      { status: 400 }
    );
  }

  const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 500) : 'User requested in-app deletion';
  const uid = user.id;

  const [profileRes, postsRes, reelsRes, storiesRes, highlightsRes, dmRes] = await Promise.all([
    admin.from('profiles').select('username, email, avatar_url, cover_image_url').eq('id', uid).maybeSingle(),
    admin.from('discussion_posts').select('id, image_url').eq('student_id', uid),
    admin.from('reels').select('video_url, thumbnail_url').eq('user_id', uid),
    admin.from('user_stories').select('media_url').eq('user_id', uid),
    admin.from('user_highlights').select('cover_url').eq('user_id', uid),
    admin.from('direct_messages').select('attachment_url').eq('sender_id', uid).not('attachment_url', 'is', null),
  ]);

  const mediaUrls = new Set<string>();
  const profile = profileRes.data as Record<string, unknown> | null;
  if (profile) {
    if (isManagedZevMediaUrl(profile.avatar_url)) mediaUrls.add(profile.avatar_url);
    if (isManagedZevMediaUrl(profile.cover_image_url)) mediaUrls.add(profile.cover_image_url);
  }

  const postIds: string[] = [];
  for (const p of (postsRes.data as Array<Record<string, unknown>> | null) || []) {
    if (typeof p.id === 'string') postIds.push(p.id);
    if (isManagedZevMediaUrl(p.image_url)) mediaUrls.add(p.image_url);
  }

  if (postIds.length > 0) {
    try {
      const { data: pm } = await admin.from('post_media').select('media_url, thumbnail_url').in('post_id', postIds);
      for (const row of (pm as Array<Record<string, unknown>> | null) || []) {
        if (isManagedZevMediaUrl(row.media_url)) mediaUrls.add(row.media_url);
        if (isManagedZevMediaUrl(row.thumbnail_url)) mediaUrls.add(row.thumbnail_url);
      }
    } catch {
      // Ignore optional child lookup failures
    }
  }

  for (const r of (reelsRes.data as Array<Record<string, unknown>> | null) || []) {
    if (isManagedZevMediaUrl(r.video_url)) mediaUrls.add(r.video_url);
    if (isManagedZevMediaUrl(r.thumbnail_url)) mediaUrls.add(r.thumbnail_url);
  }
  for (const s of (storiesRes.data as Array<Record<string, unknown>> | null) || []) {
    if (isManagedZevMediaUrl(s.media_url)) mediaUrls.add(s.media_url);
  }
  for (const h of (highlightsRes.data as Array<Record<string, unknown>> | null) || []) {
    if (isManagedZevMediaUrl(h.cover_url)) mediaUrls.add(h.cover_url);
  }
  for (const d of (dmRes.data as Array<Record<string, unknown>> | null) || []) {
    if (isManagedZevMediaUrl(d.attachment_url)) mediaUrls.add(d.attachment_url);
  }

  // Delete R2 objects strictly inside zev/ prefix
  if (mediaUrls.size > 0) {
    await Promise.allSettled(Array.from(mediaUrls).map((url) => deleteZevR2Object(url)));
  }

  const username = typeof profile?.username === 'string' ? profile.username : 'unknown';

  try {
    await admin.from('user_support_tickets').insert({
      user_id: null,
      username: username.slice(0, 64),
      email: user.email || null,
      category: 'account_deletion',
      subject: `In-App Account Deleted (@${username})`,
      description: `Deleted User UUID: ${uid}\nReason: ${reason}\nMedia cleaned: ${mediaUrls.size}`,
      status: 'resolved',
      priority: 'normal',
    });
  } catch {
    // Non-fatal audit insert
  }

  const { error: deleteAuthErr } = await admin.auth.admin.deleteUser(uid);
  if (deleteAuthErr) {
    return NextResponse.json(
      { ok: false, error: deleteAuthErr.message || 'Could not delete user account.' },
      { status: 500 }
    );
  }

  await dispatchTelegramHtml(
    [
      '🗑️ <b>حذف حساب کاربری از داخل اپلیکیشن ZEV</b>',
      `👤 <b>یوزرنیم:</b> @${escapeTelegramHtml(username)}`,
      `🆔 <b>UUID:</b> <code>${escapeTelegramHtml(uid)}</code>`,
      `🧹 <b>فایل‌های پاک‌شده R2:</b> ${mediaUrls.size}`,
      `📋 <b>علت:</b> ${escapeTelegramHtml(reason)}`,
    ].join('\n')
  ).catch(() => {});

  return NextResponse.json({
    ok: true,
    deleted: true,
    cleanedMediaCount: mediaUrls.size,
  });
}

export async function DELETE(req: NextRequest) {
  return handleDelete(req);
}

export async function POST(req: NextRequest) {
  return handleDelete(req);
}

