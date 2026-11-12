import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, admin } = auth.ctx;

  const rl = checkRateLimit(`deactivate:${user.id}`, 5, 60 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many deactivation requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const reason = typeof body.reason === 'string' ? body.reason.trim().slice(0, 500) : '';
  const nowIso = new Date().toISOString();

  await admin
    .from('profiles')
    .update({
      account_status: 'deactivated',
      is_online: false,
      last_seen: nowIso,
      fcm_token: null,
      updated_at: nowIso,
    })
    .eq('id', user.id);

  // Deactivate device push tokens
  try {
    await admin
      .from('push_subscriptions')
      .update({ is_active: false, updated_at: nowIso })
      .eq('user_id', user.id);
  } catch {
    // Ignore
  }

  try {
    await admin
      .from('user_devices')
      .update({ is_active: false, updated_at: nowIso })
      .eq('user_id', user.id);
  } catch {
    // Table added in Phase 2
  }

  try {
    await admin.from('user_security_logs').insert({
      user_id: user.id,
      event_type: 'account_deactivated',
      status: 'success',
      metadata: reason ? { reason } : {},
    });
  } catch {
    // Table added in Phase 2
  }

  return NextResponse.json({
    ok: true,
    deactivated: true,
    deactivatedAt: nowIso,
  });
}

