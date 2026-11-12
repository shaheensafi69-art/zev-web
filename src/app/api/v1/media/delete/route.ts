import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import {
  deleteZevR2Object,
  extractZevKeyFromUrlOrKey,
  getR2Config,
} from '@/lib/server/r2Signer';
import type { SupabaseClient, User } from '@supabase/supabase-js';

async function isAdminUser(admin: SupabaseClient, user: User): Promise<boolean> {
  if (user.app_metadata?.role === 'admin') return true;
  try {
    const { data } = await admin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    const role = (data as Record<string, unknown> | null)?.role;
    return role === 'admin' || role === 'superadmin';
  } catch {
    return false;
  }
}

async function userOwnsMediaKeyOrUrl(
  admin: SupabaseClient,
  user: User,
  objectKey: string,
  publicDomain: string
): Promise<boolean> {
  // Fast deterministic path ownership checks:
  // 1) zev/<folder>/<user_id>/...
  // 2) legacy zev/.../prefix_<user_id>_ts.ext
  if (objectKey.includes(`/${user.id}/`) || objectKey.includes(`_${user.id}_`)) {
    return true;
  }

  if (await isAdminUser(admin, user)) {
    return true;
  }

  const fullUrl = `${publicDomain}/${objectKey}`;
  const candidates = [fullUrl, objectKey];

  const checks: Array<() => Promise<boolean>> = [
    async () => {
      const { data } = await admin
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .or(`avatar_url.in.(${candidates.map((c) => `"${c}"`).join(',')}),cover_image_url.in.(${candidates.map((c) => `"${c}"`).join(',')})`)
        .limit(1);
      return Array.isArray(data) && data.length > 0;
    },
    async () => {
      const { data } = await admin
        .from('discussion_posts')
        .select('id')
        .eq('student_id', user.id)
        .in('image_url', candidates)
        .limit(1);
      return Array.isArray(data) && data.length > 0;
    },
    async () => {
      const { data } = await admin
        .from('reels')
        .select('id')
        .eq('user_id', user.id)
        .or(`video_url.in.(${candidates.map((c) => `"${c}"`).join(',')}),thumbnail_url.in.(${candidates.map((c) => `"${c}"`).join(',')})`)
        .limit(1);
      return Array.isArray(data) && data.length > 0;
    },
    async () => {
      const { data } = await admin
        .from('user_stories')
        .select('id')
        .eq('user_id', user.id)
        .in('media_url', candidates)
        .limit(1);
      return Array.isArray(data) && data.length > 0;
    },
    async () => {
      const { data } = await admin
        .from('direct_messages')
        .select('id')
        .eq('sender_id', user.id)
        .in('attachment_url', candidates)
        .limit(1);
      return Array.isArray(data) && data.length > 0;
    },
    async () => {
      const { data } = await admin
        .from('post_media')
        .select('id, discussion_posts!inner(student_id)')
        .eq('discussion_posts.student_id', user.id)
        .or(`media_url.in.(${candidates.map((c) => `"${c}"`).join(',')}),r2_key.in.(${candidates.map((c) => `"${c}"`).join(',')}),thumbnail_url.in.(${candidates.map((c) => `"${c}"`).join(',')})`)
        .limit(1);
      return Array.isArray(data) && data.length > 0;
    },
  ];

  for (const runCheck of checks) {
    try {
      if (await runCheck()) return true;
    } catch {
      // Ignore schema differences
    }
  }

  return false;
}

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`media-delete:${user.id}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many delete requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const rawInputs: string[] = [];
  if (typeof body.objectKey === 'string' && body.objectKey.trim()) {
    rawInputs.push(body.objectKey.trim());
  }
  if (typeof body.url === 'string' && body.url.trim()) {
    rawInputs.push(body.url.trim());
  }
  if (Array.isArray(body.objectKeys)) {
    for (const item of body.objectKeys) {
      if (typeof item === 'string' && item.trim()) rawInputs.push(item.trim());
    }
  }
  if (Array.isArray(body.urls)) {
    for (const item of body.urls) {
      if (typeof item === 'string' && item.trim()) rawInputs.push(item.trim());
    }
  }

  const uniqueInputs = Array.from(new Set(rawInputs)).slice(0, 20);
  if (uniqueInputs.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'Provide objectKey, url, objectKeys, or urls.' },
      { status: 400 }
    );
  }

  let publicDomain = 'https://media.zevapp.com';
  try {
    publicDomain = getR2Config().publicDomain;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'R2 storage credentials not configured on server.' },
      { status: 500 }
    );
  }

  const validatedKeys: string[] = [];
  for (const input of uniqueInputs) {
    let key: string;
    try {
      key = extractZevKeyFromUrlOrKey(input, publicDomain);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Forbidden object key.';
      return NextResponse.json({ ok: false, error: msg }, { status: 403 });
    }

    const owns = await userOwnsMediaKeyOrUrl(admin, user, key, publicDomain);
    if (!owns) {
      return NextResponse.json(
        { ok: false, error: `Forbidden: you do not own '${key}'.` },
        { status: 403 }
      );
    }
    validatedKeys.push(key);
  }

  const results: Array<{ key: string; deleted: boolean; status: number }> = [];
  for (const key of validatedKeys) {
    const res = await deleteZevR2Object(key);
    results.push(res);

    // Sync media_deletion_queue using exact Phase 2 schema columns
    try {
      if (res.deleted) {
        await admin
          .from('media_deletion_queue')
          .update({
            status: 'completed',
            updated_at: new Date().toISOString(),
          })
          .eq('r2_key', key);
      } else {
        const { data: existingQueue } = await admin
          .from('media_deletion_queue')
          .select('id, attempts')
          .eq('r2_key', key)
          .neq('status', 'completed')
          .limit(1)
          .maybeSingle();

        const nowIso = new Date().toISOString();
        const retryAtIso = new Date(Date.now() + 15 * 60_000).toISOString();
        if (existingQueue) {
          const attempts = Number((existingQueue as Record<string, unknown>).attempts || 0) + 1;
          await admin
            .from('media_deletion_queue')
            .update({
              status: 'pending',
              attempts,
              last_error: `HTTP ${res.status}`,
              next_retry_at: retryAtIso,
              updated_at: nowIso,
            })
            .eq('id', (existingQueue as Record<string, unknown>).id);
        } else {
          await admin.from('media_deletion_queue').insert({
            user_id: user.id,
            r2_key: key,
            media_url: `${publicDomain}/${key}`,
            reason: 'content_deleted',
            status: 'pending',
            attempts: 1,
            last_error: `HTTP ${res.status}`,
            next_retry_at: retryAtIso,
            updated_at: nowIso,
          });
        }
      }
    } catch {
      // Non-fatal queue sync
    }
  }

  return NextResponse.json({
    ok: results.every((r) => r.deleted),
    results,
  });
}

