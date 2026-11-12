import { NextResponse } from 'next/server';

export async function GET() {
  const appId = (process.env.AGORA_APP_ID || process.env.NEXT_PUBLIC_AGORA_APP_ID || '').trim();
  const appCertificate = (process.env.AGORA_APP_CERTIFICATE || '').trim();

  return NextResponse.json({
    ok: true,
    provider: 'agora',
    configured: Boolean(appId && appCertificate),
    appIdConfigured: Boolean(appId),
    certificateConfigured: Boolean(appCertificate),
    appIdLength: appId.length,
    capabilities: ['voice_call', 'video_call', 'interactive_live_streaming'],
  });
}
