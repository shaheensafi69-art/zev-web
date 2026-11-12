import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  extractBearerToken,
  getClientIp,
  getSupabaseAdmin,
} from '@/lib/server/supabaseAdmin';

const VALID_PLACEMENTS = new Set(['feed', 'story', 'reel', 'explore']);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function parseExcludeIds(raw: unknown): string[] {
  const list = Array.isArray(raw)
    ? raw.map((x) => String(x || '').trim())
    : typeof raw === 'string'
      ? raw.split(',').map((x) => x.trim())
      : [];
  return Array.from(new Set(list.filter((id) => UUID_RE.test(id)))).slice(0, 50);
}

async function resolveOptionalUserId(req: NextRequest): Promise<string | null> {
  const token = extractBearerToken(req);
  if (!token) return null;
  try {
    const admin = getSupabaseAdmin();
    const { data } = await admin.auth.getUser(token);
    return data?.user?.id || null;
  } catch {
    return null;
  }
}

async function handleServe(
  req: NextRequest,
  rawPlacement: string,
  country?: string | null,
  interest?: string | null,
  excludeCampaignIds: string[] = []
) {
  const placement = VALID_PLACEMENTS.has(rawPlacement.toLowerCase().trim())
    ? rawPlacement.toLowerCase().trim()
    : 'feed';

  const ip = getClientIp(req);
  const viewerId = await resolveOptionalUserId(req);

  const rl = checkRateLimit(`ad-serve:${viewerId || ip}`, 120, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many ad requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.rpc('serve_eligible_ad', {
      p_placement: placement,
      p_user_id: viewerId,
      p_country: country || null,
      p_interest: interest || null,
      p_exclude_campaign_ids: excludeCampaignIds,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const payload = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>;
    const ad = payload.ad ?? null;

    return NextResponse.json(
      { ok: true, ad },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to serve ad.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  return handleServe(
    req,
    searchParams.get('placement') || 'feed',
    searchParams.get('country'),
    searchParams.get('interest'),
    parseExcludeIds(searchParams.get('excludeCampaignIds'))
  );
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  return handleServe(
    req,
    String(body.placement || 'feed'),
    body.country ? String(body.country) : null,
    body.interest ? String(body.interest) : null,
    parseExcludeIds(body.excludeCampaignIds)
  );
}
