import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { RtcRole, RtcTokenBuilder } from 'agora-token';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SAFE_CHANNEL_RE = /^[a-zA-Z0-9_-]{3,63}$/;

function buildCorsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get('origin') || '';
  const allowed =
    origin === 'https://web.zevapp.com' ||
    origin === 'https://www.zevapp.com' ||
    origin === 'https://adminportal.zevapp.com' ||
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:')
      ? origin
      : 'https://web.zevapp.com';

  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function deriveAgoraUid(userId: string): number {
  const hash = crypto.createHash('sha256').update(userId, 'utf8').digest();
  const raw = hash.readUInt32BE(0) & 0x7fffffff;
  return raw === 0 ? 1 : raw;
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const cors = buildCorsHeaders(req);

  const auth = await requireAuthUser(req);
  if (!auth.ok) {
    return new NextResponse(auth.response.body, {
      status: auth.response.status,
      headers: {
        'Content-Type': 'application/json',
        ...cors,
      },
    });
  }

  const { user, admin } = auth.ctx;
  const rl = checkRateLimit(`agora_token:${user.id}`, 40, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many RTC token requests. Please retry shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds), ...cors } }
    );
  }

  const appId = (process.env.AGORA_APP_ID || process.env.NEXT_PUBLIC_AGORA_APP_ID || '').trim();
  const appCertificate = (process.env.AGORA_APP_CERTIFICATE || '').trim();
  if (!appId || !appCertificate) {
    return NextResponse.json(
      { ok: false, error: 'Agora RTC credentials are not configured on the server.' },
      { status: 503, headers: cors }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400, headers: cors });
  }

  const mode = String(body.mode || 'live').trim().toLowerCase();
  if (mode !== 'call' && mode !== 'live') {
    return NextResponse.json(
      { ok: false, error: 'mode must be "call" or "live".' },
      { status: 400, headers: cors }
    );
  }

  const requestedUid =
    typeof body.uid === 'number' && Number.isInteger(body.uid) && body.uid > 0 && body.uid <= 2147483647
      ? body.uid
      : deriveAgoraUid(user.id);

  let channelName = typeof body.channelName === 'string' ? body.channelName.trim() : '';
  let rtcRole: number = RtcRole.SUBSCRIBER;
  let resourceId: string | null = null;

  if (mode === 'call') {
    const callSessionId = typeof body.callSessionId === 'string' ? body.callSessionId.trim() : '';
    if (!callSessionId || !UUID_RE.test(callSessionId)) {
      return NextResponse.json(
        { ok: false, error: 'Valid callSessionId is required for mode="call".' },
        { status: 400, headers: cors }
      );
    }

    const { data: callRow, error: callErr } = await admin
      .from('call_sessions')
      .select('id, caller_id, callee_id, status, agora_channel, call_type')
      .eq('id', callSessionId)
      .maybeSingle();

    if (callErr || !callRow) {
      return NextResponse.json(
        { ok: false, error: 'Call session not found.' },
        { status: 404, headers: cors }
      );
    }

    const callerId = String(callRow.caller_id || '');
    const calleeId = String(callRow.callee_id || '');
    if (user.id !== callerId && user.id !== calleeId) {
      return NextResponse.json(
        { ok: false, error: 'You are not a participant of this call session.' },
        { status: 403, headers: cors }
      );
    }

    const status = String(callRow.status || '');
    if (status !== 'ringing' && status !== 'accepted') {
      return NextResponse.json(
        { ok: false, error: `Call session is already ${status}.` },
        { status: 409, headers: cors }
      );
    }

    channelName = String(callRow.agora_channel || `zev_call_${callSessionId.replace(/-/g, '')}`).trim();
    rtcRole = RtcRole.PUBLISHER;
    resourceId = callSessionId;
  } else {
    const streamId = typeof body.streamId === 'string' ? body.streamId.trim() : '';
    if (!streamId || !UUID_RE.test(streamId)) {
      return NextResponse.json(
        { ok: false, error: 'Valid streamId is required for mode="live".' },
        { status: 400, headers: cors }
      );
    }

    const { data: streamRow, error: streamErr } = await admin
      .from('live_streams')
      .select('id, host_id, status, agora_channel')
      .eq('id', streamId)
      .maybeSingle();

    if (streamErr || !streamRow) {
      return NextResponse.json(
        { ok: false, error: 'Live stream not found.' },
        { status: 404, headers: cors }
      );
    }

    if (String(streamRow.status || '') !== 'live') {
      return NextResponse.json(
        { ok: false, error: 'This live stream has ended.' },
        { status: 409, headers: cors }
      );
    }

    const hostId = String(streamRow.host_id || '');
    if (hostId !== user.id) {
      // Respect user blocks
      const { data: blockRows } = await admin
        .from('user_blocks')
        .select('id')
        .or(`and(blocker_id.eq.${hostId},blocked_id.eq.${user.id}),and(blocker_id.eq.${user.id},blocked_id.eq.${hostId})`)
        .limit(1);
      if (Array.isArray(blockRows) && blockRows.length > 0) {
        return NextResponse.json(
          { ok: false, error: 'You cannot join this live stream.' },
          { status: 403, headers: cors }
        );
      }
    }

    channelName = String(streamRow.agora_channel || `zev_live_${streamId.replace(/-/g, '')}`).trim();
    // Strictly only the host publishes media; all viewers are subscribers
    rtcRole = hostId === user.id ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
    resourceId = streamId;
  }

  if (!SAFE_CHANNEL_RE.test(channelName)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid RTC channel name.' },
      { status: 400, headers: cors }
    );
  }

  const ttlSeconds = 3600;
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    requestedUid,
    rtcRole,
    ttlSeconds,
    ttlSeconds
  );

  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

  return NextResponse.json(
    {
      ok: true,
      mode,
      resourceId,
      appId,
      channelName,
      token,
      uid: requestedUid,
      role: rtcRole === RtcRole.PUBLISHER ? 'publisher' : 'subscriber',
      expiresInSeconds: ttlSeconds,
      expiresAt,
    },
    { headers: cors }
  );
}
