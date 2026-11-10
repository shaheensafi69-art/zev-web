import { NextResponse } from 'next/server';

const ASSETLINKS = [
  {
    relation: [
      'delegate_permission/common.handle_all_urls',
      'delegate_permission/common.get_login_creds',
    ],
    target: {
      namespace: 'android_app',
      package_name: 'com.zevapp.app',
      sha256_cert_fingerprints: [
        '4A:04:56:00:0E:A5:9B:1B:54:D7:F7:A0:C5:A5:7A:26:9E:EF:21:77:5E:F5:46:80:22:D4:29:06:61:C0:19',
        '89:98:82:9B:1F:76:85:F2:3B:30:13:98:59:E2:04:1E:96:DB:4D:19:45:29:41:F5:E2:6A:F7:A4:63:A1:2D',
        '72:69:49:88:9F:35:8A:56:A8:13:D4:BF:85:59:82:A5:4D:C3:57:1D:C2:08:92:42:C2:3C:6B:D1:51:78:92',
      ],
    },
  },
];

export async function GET() {
  return new NextResponse(JSON.stringify(ASSETLINKS, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

