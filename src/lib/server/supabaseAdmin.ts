import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

let cachedAdminClient: SupabaseClient | null = null;

export function getSupabaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'https://zjwmioalrhkyfbzhdnnw.supabase.co'
  ).trim();
}

export function getSupabaseAnonKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ''
  ).trim();
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedAdminClient) return cachedAdminClient;

  const url = getSupabaseUrl();
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  if (!url || !serviceKey) {
    throw new Error('Server Supabase configuration missing (SUPABASE_SERVICE_ROLE_KEY).');
  }

  cachedAdminClient = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cachedAdminClient;
}

export function getSupabaseUserClient(accessToken: string): SupabaseClient {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    throw new Error('Server Supabase configuration missing (NEXT_PUBLIC_SUPABASE_ANON_KEY).');
  }
  return createClient(url, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export interface AuthContext {
  user: User;
  token: string;
  admin: SupabaseClient;
}

export function extractBearerToken(req: NextRequest): string | null {
  const header = req.headers.get('authorization') || req.headers.get('Authorization') || '';
  if (!header.toLowerCase().startsWith('bearer ')) return null;
  const token = header.slice(7).trim();
  return token.length > 0 ? token : null;
}

/**
 * Verifies the Supabase access token from Authorization header, checks that the
 * account exists and is not banned, and returns { user, token, admin }.
 */
export async function requireAuthUser(
  req: NextRequest
): Promise<{ ok: true; ctx: AuthContext } | { ok: false; response: NextResponse }> {
  const token = extractBearerToken(req);
  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { ok: false, error: 'Missing Authorization Bearer token.' },
        { status: 401 }
      ),
    };
  }

  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.auth.getUser(token);
    if (error || !data?.user) {
      return {
        ok: false,
        response: NextResponse.json(
          { ok: false, error: 'Invalid or expired authentication session.' },
          { status: 401 }
        ),
      };
    }

    // Check account ban/restriction state defensively (columns may expand in Phase 2)
    const { data: profile } = await admin
      .from('profiles')
      .select('id, is_restricted')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profile && (profile as Record<string, unknown>).is_banned === true) {
      return {
        ok: false,
        response: NextResponse.json(
          { ok: false, error: 'Account is suspended or banned.' },
          { status: 403 }
        ),
      };
    }

    return {
      ok: true,
      ctx: {
        user: data.user,
        token,
        admin,
      },
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Authentication verification failed.';
    return {
      ok: false,
      response: NextResponse.json({ ok: false, error: msg }, { status: 500 }),
    };
  }
}

// Simple per-instance sliding-window rate limiter for API routes
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const current = rateBuckets.get(key);
  if (!current || now >= current.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) {
    return fwd.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown';
}

