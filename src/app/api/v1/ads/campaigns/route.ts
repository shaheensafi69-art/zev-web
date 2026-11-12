import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getSupabaseUserClient,
  requireAuthUser,
} from '@/lib/server/supabaseAdmin';

export async function GET(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, token } = auth.ctx;

  const rl = checkRateLimit(`ads-dash:${user.id}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  try {
    const client = getSupabaseUserClient(token);
    const { data, error } = await client.rpc('get_my_advertiser_dashboard');
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    const payload = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>;
    return NextResponse.json({ ok: true, ...payload });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to load advertiser dashboard.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, token } = auth.ctx;

  const rl = checkRateLimit(`ads-write:${user.id}`, 30, 5 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many write requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const action = String(body.action || 'create_campaign').trim();
  const client = getSupabaseUserClient(token);

  try {
    if (action === 'register_advertiser') {
      const { data, error } = await client.rpc('register_or_update_advertiser', {
        p_business_name: String(body.businessName || ''),
        p_website: body.website ? String(body.website) : null,
        p_contact_email: body.contactEmail ? String(body.contactEmail) : null,
      });
      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      }
      return NextResponse.json({ ok: true, ...(data as Record<string, unknown>) });
    }

    if (action === 'generate_invoice') {
      const { data, error } = await client.rpc('generate_advertiser_invoice', {
        p_campaign_id: body.campaignId ? String(body.campaignId) : null,
      });
      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
      }
      return NextResponse.json({ ok: true, ...(data as Record<string, unknown>) });
    }

    // Default: create_campaign
    const toStringArray = (val: unknown): string[] =>
      Array.isArray(val) ? val.map((x) => String(x).trim()).filter(Boolean) : [];

    const rawSourcePostId = body.sourcePostId ? String(body.sourcePostId).trim() : '';
    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const sourcePostId = uuidRe.test(rawSourcePostId) ? rawSourcePostId : null;

    const { data, error } = await client.rpc('create_ad_campaign_with_creative', {
      p_name: String(body.name || ''),
      p_objective: String(body.objective || 'awareness'),
      p_placement: String(body.placement || 'feed'),
      p_pricing_model: String(body.pricingModel || 'CPM'),
      p_bid_amount: Number(body.bidAmount || 2.5),
      p_daily_budget: Number(body.dailyBudget || 10),
      p_total_budget: Number(body.totalBudget || 50),
      p_title: String(body.title || ''),
      p_body: String(body.body || ''),
      p_media_url: body.mediaUrl ? String(body.mediaUrl) : null,
      p_media_type: String(body.mediaType || 'image'),
      p_cta_label: String(body.ctaLabel || 'Learn More'),
      p_destination_url: String(body.destinationUrl || ''),
      p_countries: toStringArray(body.countries),
      p_languages: toStringArray(body.languages),
      p_interests: toStringArray(body.interests),
      p_min_age: Number(body.minAge || 13),
      p_max_age: Number(body.maxAge || 99),
      p_gender: String(body.gender || 'all'),
      p_starts_at: body.startsAt ? String(body.startsAt) : new Date().toISOString(),
      p_ends_at: body.endsAt ? String(body.endsAt) : null,
      p_daily_frequency_cap: Number(body.dailyFrequencyCap || 3),
      p_min_cooldown_seconds: Number(body.minCooldownSeconds ?? 300),
      p_source_post_id: sourcePostId,
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true, ...(data as Record<string, unknown>) }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to process advertiser request.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user, token } = auth.ctx;

  const rl = checkRateLimit(`ads-patch:${user.id}`, 40, 5 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const campaignId = String(body.campaignId || '').trim();
  if (!campaignId) {
    return NextResponse.json({ ok: false, error: 'campaignId is required.' }, { status: 400 });
  }

  try {
    const client = getSupabaseUserClient(token);
    const { data, error } = await client.rpc('toggle_own_ad_campaign_status', {
      p_campaign_id: campaignId,
      p_pause: Boolean(body.pause),
    });
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true, ...(data as Record<string, unknown>) });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update campaign status.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
