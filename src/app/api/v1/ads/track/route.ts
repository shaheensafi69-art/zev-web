import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  extractBearerToken,
  getClientIp,
  getSupabaseAdmin,
} from '@/lib/server/supabaseAdmin';

const VALID_EVENTS = new Set(['impression', 'click', 'conversion']);
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const eventType = String(body.eventType || '').trim().toLowerCase();
  const campaignId = String(body.campaignId || '').trim();
  const creativeIdRaw = body.creativeId ? String(body.creativeId).trim() : null;
  const placement = String(body.placement || 'feed').trim().toLowerCase();
  const idempotencyKey = body.idempotencyKey ? String(body.idempotencyKey).trim().slice(0, 128) : null;
  const eventName = body.eventName ? String(body.eventName).trim().slice(0, 64) : 'conversion';
  const conversionValue = Number(body.conversionValue || 0) || 0;

  if (!VALID_EVENTS.has(eventType)) {
    return NextResponse.json(
      { ok: false, error: "eventType must be 'impression', 'click', or 'conversion'." },
      { status: 400 }
    );
  }

  if (!UUID_REGEX.test(campaignId)) {
    return NextResponse.json(
      { ok: false, error: 'A valid campaignId UUID is required.' },
      { status: 400 }
    );
  }

  if (creativeIdRaw && !UUID_REGEX.test(creativeIdRaw)) {
    return NextResponse.json(
      { ok: false, error: 'creativeId must be a valid UUID when provided.' },
      { status: 400 }
    );
  }

  const ip = getClientIp(req);
  let viewerId: string | null = null;
  const token = extractBearerToken(req);
  if (token) {
    try {
      const admin = getSupabaseAdmin();
      const { data } = await admin.auth.getUser(token);
      viewerId = data?.user?.id || null;
    } catch {
      viewerId = null;
    }
  }

  const rl = checkRateLimit(`ad-track:${viewerId || ip}:${eventType}`, 90, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Rate limit exceeded for ad tracking.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.rpc('record_ad_event', {
      p_event_type: eventType,
      p_campaign_id: campaignId,
      p_creative_id: creativeIdRaw,
      p_placement: placement,
      p_idempotency_key: idempotencyKey,
      p_event_name: eventName,
      p_conversion_value: conversionValue,
      p_viewer_id: viewerId,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    const result = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>;
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to record ad event.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
