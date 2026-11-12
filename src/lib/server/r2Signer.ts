import crypto from 'node:crypto';

export interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicDomain: string;
}

export function getR2Config(): R2Config {
  const accountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const accessKeyId = (process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '').trim();
  const secretAccessKey = (process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '').trim();
  const bucketName = (process.env.CLOUDFLARE_R2_BUCKET_NAME || 'safiacademy-media').trim();
  const publicDomain = (process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || 'https://media.zevapp.com')
    .trim()
    .replace(/\/+$/, '');

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Cloudflare R2 credentials are not configured on server.');
  }

  return { accountId, accessKeyId, secretAccessKey, bucketName, publicDomain };
}

/**
 * Strictly enforces that ZEV NEVER reads/mutates/deletes any object outside the `zev/` prefix
 * inside the shared `safiacademy-media` R2 bucket.
 */
export function assertZevObjectKey(rawKey: string): string {
  const normalized = rawKey.trim().replace(/^\/+/, '');
  if (!normalized || normalized.includes('..') || !normalized.startsWith('zev/')) {
    throw new Error('Forbidden object key: ZEV media keys must stay strictly within zev/.');
  }
  return normalized;
}

export function extractZevKeyFromUrlOrKey(input: string, publicDomain = 'https://media.zevapp.com'): string {
  const trimmed = input.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    const url = new URL(trimmed);
    return assertZevObjectKey(url.pathname.replace(/^\/+/, ''));
  }
  if (trimmed.startsWith(publicDomain)) {
    return assertZevObjectKey(trimmed.slice(publicDomain.length));
  }
  return assertZevObjectKey(trimmed);
}

function sha256Hex(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function hmacSha256(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function getSignatureKey(secretKey: string, dateStamp: string, region = 'auto', service = 's3'): Buffer {
  const kDate = hmacSha256(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmacSha256(kDate, region);
  const kService = hmacSha256(kRegion, service);
  return hmacSha256(kService, 'aws4_request');
}

function formatAmzDates(date = new Date()): { amzDate: string; dateStamp: string } {
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return {
    dateStamp: `${y}${m}${d}`,
    amzDate: `${y}${m}${d}T${hh}${mm}${ss}Z`,
  };
}

function encodeRfc3986(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) =>
    `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function encodeS3Path(pathWithBucket: string): string {
  return pathWithBucket
    .split('/')
    .map((seg) => encodeRfc3986(seg))
    .join('/');
}

export interface PresignedUploadResult {
  uploadUrl: string;
  objectKey: string;
  publicUrl: string;
  requiredHeaders: Record<string, string>;
  expiresInSeconds: number;
}

/**
 * Generates an AWS S3 SigV4 presigned PUT URL for Cloudflare R2 with Cache-Control
 * and Content-Type enforced in signed headers.
 */
export function createPresignedR2PutUrl(params: {
  objectKey: string;
  contentType: string;
  cacheControl?: string;
  expiresInSeconds?: number;
}): PresignedUploadResult {
  const cfg = getR2Config();
  const safeKey = assertZevObjectKey(params.objectKey);
  const expiresIn = Math.min(Math.max(params.expiresInSeconds ?? 900, 60), 3600);
  const cacheControl = params.cacheControl || 'public, max-age=31536000, immutable';
  const contentType = params.contentType.trim() || 'application/octet-stream';

  const host = `${cfg.accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${encodeS3Path(`${cfg.bucketName}/${safeKey}`)}`;
  const { amzDate, dateStamp } = formatAmzDates();
  const region = 'auto';
  const service = 's3';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const signedHeaders = 'cache-control;content-type;host';
  const canonicalHeaders =
    `cache-control:${cacheControl}\n` +
    `content-type:${contentType}\n` +
    `host:${host}\n`;

  const queryParams: Record<string, string> = {
    'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
    'X-Amz-Credential': `${cfg.accessKeyId}/${credentialScope}`,
    'X-Amz-Date': amzDate,
    'X-Amz-Expires': String(expiresIn),
    'X-Amz-SignedHeaders': signedHeaders,
  };

  const canonicalQuery = Object.keys(queryParams)
    .sort()
    .map((k) => `${encodeRfc3986(k)}=${encodeRfc3986(queryParams[k])}`)
    .join('&');

  const canonicalRequest = [
    'PUT',
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    'UNSIGNED-PAYLOAD',
  ].join('\n');

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');

  const signingKey = getSignatureKey(cfg.secretAccessKey, dateStamp, region, service);
  const signature = hmacSha256(signingKey, stringToSign).toString('hex');

  const uploadUrl = `https://${host}${canonicalUri}?${canonicalQuery}&X-Amz-Signature=${signature}`;
  const publicUrl = `${cfg.publicDomain}/${safeKey}`;

  return {
    uploadUrl,
    objectKey: safeKey,
    publicUrl,
    requiredHeaders: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    },
    expiresInSeconds: expiresIn,
  };
}

/**
 * Signed S3 REST call for DELETE / HEAD on Cloudflare R2 (`zev/` keys ONLY).
 */
export async function signedR2ObjectRequest(params: {
  method: 'DELETE' | 'HEAD' | 'PUT';
  objectKey: string;
  extraHeaders?: Record<string, string>;
  body?: Buffer;
}): Promise<Response> {
  const cfg = getR2Config();
  const safeKey = assertZevObjectKey(params.objectKey);
  const host = `${cfg.accountId}.r2.cloudflarestorage.com`;
  const canonicalUri = `/${encodeS3Path(`${cfg.bucketName}/${safeKey}`)}`;
  const { amzDate, dateStamp } = formatAmzDates();
  const region = 'auto';
  const service = 's3';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const payloadHash = sha256Hex(params.body ?? Buffer.alloc(0));

  const headerMap: Record<string, string> = {
    host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };

  if (params.extraHeaders) {
    for (const [k, v] of Object.entries(params.extraHeaders)) {
      headerMap[k.toLowerCase()] = v.trim();
    }
  }

  const sortedHeaderKeys = Object.keys(headerMap).sort();
  const canonicalHeaders = sortedHeaderKeys.map((k) => `${k}:${headerMap[k]}\n`).join('');
  const signedHeaders = sortedHeaderKeys.join(';');

  const canonicalRequest = [
    params.method,
    canonicalUri,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');

  const signingKey = getSignatureKey(cfg.secretAccessKey, dateStamp, region, service);
  const signature = hmacSha256(signingKey, stringToSign).toString('hex');

  const authHeader = `AWS4-HMAC-SHA256 Credential=${cfg.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const fetchHeaders: Record<string, string> = {
    Authorization: authHeader,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    ...(params.extraHeaders || {}),
  };

  return fetch(`https://${host}${canonicalUri}`, {
    method: params.method,
    headers: fetchHeaders,
    body: params.body ? new Uint8Array(params.body) : undefined,
  });
}

export async function deleteZevR2Object(objectKeyOrUrl: string): Promise<{ deleted: boolean; key: string; status: number }> {
  const key = extractZevKeyFromUrlOrKey(objectKeyOrUrl);
  const res = await signedR2ObjectRequest({ method: 'DELETE', objectKey: key });
  return {
    deleted: res.status === 204 || res.status === 200 || res.status === 404,
    key,
    status: res.status,
  };
}

