// Cloudflare Worker: serve assetlinks.json directly for zevapp.com
// This bypasses the www redirect so Google Play Console can verify the domain.
// Deploy at: https://dash.cloudflare.com -> Workers & Pages -> Create Worker
// Then add a Route: zevapp.com/.well-known/assetlinks.json

const ASSETLINKS = JSON.stringify([
  {
    relation: [
      "delegate_permission/common.handle_all_urls",
      "delegate_permission/common.get_login_creds"
    ],
    target: {
      namespace: "android_app",
      package_name: "com.zevapp.app",
      sha256_cert_fingerprints: [
        "9D:13:B2:EF:71:8B:F1:00:6F:14:C2:33:51:85:9B:F6:BA:29:9B:23:F2:13:F8:58:05:5A:95:2D:30:01:89:CC",
        "7F:7F:47:75:EF:CF:F7:29:60:3B:22:5A:FE:10:08:25:AF:C0:FD:83:A4:8F:98:5C:08:20:10:0C:5D:9D:0F:F3"
      ]
    }
  }
], null, 2);

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/.well-known/assetlinks.json") {
      return new Response(ASSETLINKS, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // For all other paths, fetch normally (pass through)
    return fetch(request);
  },
};
