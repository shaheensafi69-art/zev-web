/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // Global CORS headers for all /api/:path* routes across zevapp.com, web.zevapp.com & localhost
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-cron-secret, Origin',
          },
        ],
      },
      {
        // Allow Google Play Console to verify the assetlinks.json without issues
        source: '/.well-known/assetlinks.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        // Also allow Apple App Site Association for future iOS deep links
        source: '/.well-known/apple-app-site-association',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        // Rewrite /.well-known/assetlinks.json -> static public file (primary)
        // If the public file is missing, Next.js serves 404, so we also keep the API fallback
        source: '/.well-known/assetlinks.json',
        destination: '/api/assetlinks',
        // Note: Next.js serves public/ files BEFORE rewrites, so the static file
        // in public/.well-known/assetlinks.json takes priority; this only fires
        // if the static file is missing.
      },
    ];
  },
};

export default nextConfig;
