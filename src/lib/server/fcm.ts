import crypto from 'node:crypto';
import type { SupabaseClient } from '@supabase/supabase-js';

interface ServiceAccountJson {
  project_id: string;
  client_email: string;
  private_key: string;
}

let cachedAccessToken: { token: string; expiresAt: number; projectId: string } | null = null;

function base64UrlEncode(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function getFirebaseServiceAccount(): ServiceAccountJson | null {
  const raw = (process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '').trim();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ServiceAccountJson;
    if (!parsed.project_id || !parsed.client_email || !parsed.private_key) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function getFirebaseAccessToken(sa: ServiceAccountJson): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && cachedAccessToken.expiresAt - 60 > nowSec) {
    return cachedAccessToken.token;
  }

  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: nowSec,
      exp: nowSec + 3600,
    })
  );

  const unsignedJwt = `${header}.${payload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  const signature = base64UrlEncode(signer.sign(sa.private_key));
  const assertion = `${unsignedJwt}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Google OAuth token exchange failed (${tokenRes.status}): ${text}`);
  }

  const tokenData = (await tokenRes.json()) as { access_token: string; expires_in?: number };
  cachedAccessToken = {
    token: tokenData.access_token,
    expiresAt: nowSec + (tokenData.expires_in ?? 3500),
    projectId: sa.project_id,
  };
  return tokenData.access_token;
}

export interface FcmSendPayload {
  tokens: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
  androidChannelId?: string;
  badgeCount?: number;
  collapseTag?: string;
}

export async function sendFcmMulticast(
  admin: SupabaseClient,
  payload: FcmSendPayload
): Promise<{
  configured: boolean;
  sentCount: number;
  failedCount: number;
  invalidTokens: string[];
  error?: string;
}> {
  const sa = getFirebaseServiceAccount();
  if (!sa) {
    return {
      configured: false,
      sentCount: 0,
      failedCount: payload.tokens.length,
      invalidTokens: [],
      error: 'FIREBASE_SERVICE_ACCOUNT_JSON is not configured on the server.',
    };
  }

  const accessToken = await getFirebaseAccessToken(sa);
  const endpoint = `https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`;

  let sentCount = 0;
  let failedCount = 0;
  const invalidTokens: string[] = [];

  for (const token of payload.tokens) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            token,
            notification: {
              title: payload.title,
              body: payload.body,
            },
            data: payload.data || {},
            android: {
              priority: 'HIGH',
              notification: {
                channel_id: payload.androidChannelId || 'zev_notifications_channel',
                icon: 'ic_notification',
                color: '#00D4FF',
                sound: 'default',
                ...(payload.collapseTag ? { tag: payload.collapseTag } : {}),
              },
            },
            apns: {
              headers: { 'apns-priority': '10' },
              payload: {
                aps: {
                  sound: 'default',
                  'mutable-content': 1,
                  ...(typeof payload.badgeCount === 'number'
                    ? { badge: payload.badgeCount }
                    : {}),
                },
              },
            },
          },
        }),
      });

      if (res.ok) {
        sentCount += 1;
      } else {
        failedCount += 1;
        const bodyText = await res.text();
        if (
          bodyText.includes('UNREGISTERED') ||
          bodyText.includes('INVALID_ARGUMENT') ||
          res.status === 404
        ) {
          invalidTokens.push(token);
        }
      }
    } catch {
      failedCount += 1;
    }
  }

  // Deactivate stale tokens across push_subscriptions & user_devices (if table exists)
  if (invalidTokens.length > 0) {
    try {
      await admin
        .from('push_subscriptions')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .in('fcm_token', invalidTokens);
    } catch {
      // Ignore table state mismatch
    }
    try {
      await admin
        .from('user_devices')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .in('fcm_token', invalidTokens);
    } catch {
      // Table added in Phase 2
    }
  }

  return {
    configured: true,
    sentCount,
    failedCount,
    invalidTokens,
  };
}

