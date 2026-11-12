import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, requireAuthUser } from '@/lib/server/supabaseAdmin';
import { createPresignedR2PutUrl } from '@/lib/server/r2Signer';

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
  'temp',
]);

const DOCUMENT_MIMES = new Set([
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/json',
  'application/zip',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
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
  'application/msword': { extensions: ['doc'], maxBytes: 50 * 1024 * 1024 },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    extensions: ['docx'],
    maxBytes: 50 * 1024 * 1024,
  },
  'application/vnd.ms-excel': { extensions: ['xls'], maxBytes: 50 * 1024 * 1024 },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    extensions: ['xlsx'],
    maxBytes: 50 * 1024 * 1024,
  },
  'application/vnd.ms-powerpoint': { extensions: ['ppt'], maxBytes: 50 * 1024 * 1024 },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
    extensions: ['pptx'],
    maxBytes: 50 * 1024 * 1024,
  },
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

  const rl = checkRateLimit(`presign:${user.id}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many upload requests. Please wait shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const rawFolder = String(body.folder || 'temp')
    .trim()
    .toLowerCase();
  const folder = rawFolder === 'posts' ? 'feed' : rawFolder;

  if (!ALLOWED_FOLDERS.has(folder)) {
    return NextResponse.json(
      { ok: false, error: `Unsupported media folder '${rawFolder}'.` },
      { status: 400 }
    );
  }

  const contentType = String(body.contentType || '')
    .trim()
    .toLowerCase();
  const mimeRule = MIME_LIMITS[contentType];
  if (!mimeRule) {
    return NextResponse.json(
      { ok: false, error: `Unsupported contentType '${contentType || 'empty'}'.` },
      { status: 400 }
    );
  }

  if (DOCUMENT_MIMES.has(contentType) && folder !== 'direct_messages') {
    return NextResponse.json(
      { ok: false, error: 'Document uploads are only allowed inside direct_messages.' },
      { status: 400 }
    );
  }

  const fileSize = Number(body.fileSize);
  if (!Number.isFinite(fileSize) || fileSize <= 0) {
    return NextResponse.json(
      { ok: false, error: 'A valid positive fileSize in bytes is required.' },
      { status: 400 }
    );
  }

  if (fileSize > mimeRule.maxBytes) {
    return NextResponse.json(
      {
        ok: false,
        error: `File exceeds maximum allowed limit (${Math.round(mimeRule.maxBytes / (1024 * 1024))} MB).`,
      },
      { status: 413 }
    );
  }

  const rawFileName = String(body.fileName || `upload.${mimeRule.extensions[0]}`);
  const safeName = sanitizeFileName(rawFileName, mimeRule.extensions[0]);
  const ext = safeName.split('.').pop()?.toLowerCase() || '';
  if (!mimeRule.extensions.includes(ext)) {
    return NextResponse.json(
      {
        ok: false,
        error: `File extension '.${ext}' does not match contentType '${contentType}'.`,
      },
      { status: 400 }
    );
  }

  const subPathRaw = String(body.subPath || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '');

  const uniquePrefix = `${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const objectKey = subPathRaw
    ? `zev/${folder}/${user.id}/${subPathRaw}/${uniquePrefix}_${safeName}`
    : `zev/${folder}/${user.id}/${uniquePrefix}_${safeName}`;

  try {
    const presigned = createPresignedR2PutUrl({
      objectKey,
      contentType,
      cacheControl: 'public, max-age=31536000, immutable',
      expiresInSeconds: 900,
    });

    return NextResponse.json({
      ok: true,
      ...presigned,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to generate upload URL.';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

