import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import { getR2Config, signedR2ObjectRequest } from '@/lib/server/r2Signer';

const ALLOWED_FOLDERS = new Set([
  'avatars',
  'covers',
  'feed',
  'posts',
  'reels',
  'stories',
  'direct_messages',
  'highlights',
  'ads',
  'verification',
  'temp',
]);

const MIME_LIMITS: Record<string, { extensions: string[]; maxBytes: number }> = {
  'image/jpeg': { extensions: ['jpg', 'jpeg'], maxBytes: 25 * 1024 * 1024 },
  'image/png': { extensions: ['png'], maxBytes: 25 * 1024 * 1024 },
  'image/webp': { extensions: ['webp'], maxBytes: 25 * 1024 * 1024 },
  'image/gif': { extensions: ['gif'], maxBytes: 25 * 1024 * 1024 },
  'image/heic': { extensions: ['heic', 'heif'], maxBytes: 25 * 1024 * 1024 },
  'image/heif': { extensions: ['heif', 'heic'], maxBytes: 25 * 1024 * 1024 },
  'video/mp4': { extensions: ['mp4', 'm4v'], maxBytes: 250 * 1024 * 1024 },
  'video/quicktime': { extensions: ['mov'], maxBytes: 250 * 1024 * 1024 },
  'video/webm': { extensions: ['webm'], maxBytes: 250 * 1024 * 1024 },
  'video/x-m4v': { extensions: ['m4v', 'mp4'], maxBytes: 250 * 1024 * 1024 },
  'audio/m4a': { extensions: ['m4a'], maxBytes: 50 * 1024 * 1024 },
  'audio/x-m4a': { extensions: ['m4a'], maxBytes: 50 * 1024 * 1024 },
  'audio/mp4': { extensions: ['m4a', 'mp4'], maxBytes: 50 * 1024 * 1024 },
  'audio/aac': { extensions: ['aac'], maxBytes: 50 * 1024 * 1024 },
  'audio/mpeg': { extensions: ['mp3'], maxBytes: 50 * 1024 * 1024 },
  'audio/wav': { extensions: ['wav'], maxBytes: 50 * 1024 * 1024 },
  'audio/ogg': { extensions: ['ogg'], maxBytes: 50 * 1024 * 1024 },
  'audio/webm': { extensions: ['weba', 'webm'], maxBytes: 50 * 1024 * 1024 },
  'application/pdf': { extensions: ['pdf'], maxBytes: 50 * 1024 * 1024 },
  'text/plain': { extensions: ['txt'], maxBytes: 50 * 1024 * 1024 },
  'text/csv': { extensions: ['csv'], maxBytes: 50 * 1024 * 1024 },
  'application/json': { extensions: ['json'], maxBytes: 50 * 1024 * 1024 },
  'application/zip': { extensions: ['zip'], maxBytes: 50 * 1024 * 1024 },
};

function sanitizeFileName(raw: string, fallbackExt: string): string {
  const base = raw.split('/').pop()?.split('\\').pop() || '';
  const cleaned = base
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.+/g, '.')
    .replace(/^_+/, '')
    .slice(0, 96);

  if (!cleaned || !cleaned.includes('.')) {
    return `file.${fallbackExt}`;
  }
  return cleaned;
}

export async function POST(req: NextRequest) {
  const auth = await requireAuthUser(req);
  if (!auth.ok) return auth.response;
  const { user } = auth.ctx;

  const rl = checkRateLimit(`upload:${user.id}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many upload requests. Please wait shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let fileBuffer: Buffer | null = null;
  let rawFolder = 'temp';
  let rawFileName = 'file.jpg';
  let contentType = 'image/jpeg';
  let subPathRaw = '';

  const reqContentType = req.headers.get('content-type') || '';
  if (reqContentType.includes('multipart/form-data')) {
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      if (!file) {
        return NextResponse.json({ ok: false, error: 'No file found in form data.' }, { status: 400 });
      }
      fileBuffer = Buffer.from(await file.arrayBuffer());
      rawFileName = file.name || 'file.jpg';
      contentType = file.type || 'image/jpeg';
      rawFolder = String(formData.get('folder') || 'temp');
      subPathRaw = String(formData.get('subPath') || '');
    } catch {
      return NextResponse.json({ ok: false, error: 'Failed to parse multipart data.' }, { status: 400 });
    }
  } else {
    try {
      const body = (await req.json()) as Record<string, unknown>;
      rawFolder = String(body.folder || 'temp');
      rawFileName = String(body.fileName || 'file.jpg');
      contentType = String(body.contentType || 'image/jpeg');
      subPathRaw = String(body.subPath || '');
      const base64Data = String(body.data || body.base64 || '');
      if (!base64Data) {
        return NextResponse.json({ ok: false, error: 'No base64 data provided.' }, { status: 400 });
      }
      const cleanedBase64 = base64Data.includes('base64,') ? base64Data.split('base64,')[1] : base64Data;
      fileBuffer = Buffer.from(cleanedBase64, 'base64');
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
    }
  }

  if (!fileBuffer || fileBuffer.length === 0) {
    return NextResponse.json({ ok: false, error: 'Empty file payload.' }, { status: 400 });
  }

  const folder = rawFolder === 'posts' ? 'feed' : rawFolder.toLowerCase().trim();
  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json({ ok: false, error: `Unsupported folder '${rawFolder}'.` }, { status: 400 });
  }

  const mimeRule = MIME_LIMITS[contentType.toLowerCase().trim()];
  if (!mimeRule) {
    return NextResponse.json({ ok: false, error: `Unsupported contentType '${contentType}'.` }, { status: 400 });
  }

  if (fileBuffer.length > mimeRule.maxBytes) {
    return NextResponse.json(
      { ok: false, error: `File exceeds maximum allowed limit (${Math.round(mimeRule.maxBytes / (1024 * 1024))} MB).` },
      { status: 413 }
    );
  }

  const safeName = sanitizeFileName(rawFileName, mimeRule.extensions[0]);
  const cleanSubPath = subPathRaw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const uniquePrefix = `${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const objectKey = cleanSubPath
    ? `zev/${folder}/${user.id}/${cleanSubPath}/${uniquePrefix}_${safeName}`
    : `zev/${folder}/${user.id}/${uniquePrefix}_${safeName}`;

  try {
    const cfg = getR2Config();
    const r2Res = await signedR2ObjectRequest({
      method: 'PUT',
      objectKey,
      body: fileBuffer,
      extraHeaders: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

    if (r2Res.status < 200 || r2Res.status >= 300) {
      const errText = await r2Res.text().catch(() => '');
      return NextResponse.json(
        { ok: false, error: `Cloudflare R2 returned HTTP ${r2Res.status}: ${errText.slice(0, 160)}` },
        { status: 502 }
      );
    }

    const publicUrl = `${cfg.publicDomain}/${objectKey}`;
    return NextResponse.json({
      ok: true,
      publicUrl,
      objectKey,
      fileSize: fileBuffer.length,
      contentType,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server upload failed.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin',
    },
  });
}
