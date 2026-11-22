import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from './dictionaries';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── ALWAYS PASS THROUGH: Android / iOS Deep Link verification files ───────
  // Google Play Console needs /.well-known/assetlinks.json to be publicly
  // accessible with no redirects. Apple requires /.well-known/apple-app-site-association.
  if (pathname.startsWith('/.well-known/')) {
    return NextResponse.next();
  }

  // Special Guard for /join: Middleware strictly enforces a referral code
  if (pathname === '/join' || pathname.startsWith('/join/')) {
    const ref = request.nextUrl.searchParams.get('ref')?.trim();
    if (!ref) {
      // Disallow direct access without referral code -> redirect to localized home
      const cookieLocale = request.cookies.get('zev_locale')?.value;
      const targetLocale = (cookieLocale && locales.includes(cookieLocale as any)) ? cookieLocale : defaultLocale;
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = `/${targetLocale}`;
      homeUrl.search = '';
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  // Special redirect for /api to /api-info status page
  if (pathname === '/api' || pathname === '/api/') {
    const cookieLocale = request.cookies.get('zev_locale')?.value;
    const targetLocale = (cookieLocale && locales.includes(cookieLocale as any)) ? cookieLocale : defaultLocale;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${targetLocale}/api-info`;
    return NextResponse.redirect(redirectUrl);
  }

  // ─── STRICT CORS FOR API ENDPOINTS (/api/:path*) ───────────────────────────
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://zevapp.com',
      'https://www.zevapp.com',
      'https://web.zevapp.com',
      'https://adminportal.zevapp.com',
    ];
    const isAllowed =
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:');

    // Handle OPTIONS Preflight immediately
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 });
      if (isAllowed && origin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', 'true');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        response.headers.set(
          'Access-Control-Allow-Headers',
          'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-cron-secret, Origin'
        );
        response.headers.set('Access-Control-Max-Age', '86400');
        response.headers.set('Vary', 'Origin');
      }
      return response;
    }

    const response = NextResponse.next();
    if (isAllowed && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      response.headers.set(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-cron-secret, Origin'
      );
      response.headers.set('Vary', 'Origin');
    }
    return response;
  }

  // Ignore static assets, APIs, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/app-shots') ||
    pathname.startsWith('/screenshots') ||
    pathname.startsWith('/flags') ||
    pathname.startsWith('/team') ||
    pathname.startsWith('/company') ||
    pathname.includes('.') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/update-password') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/verify-email') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/coins') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/app-ads.txt'
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect preferred language from cookie or accept-language
  const cookieLocale = request.cookies.get('zev_locale')?.value;
  let targetLocale = defaultLocale;

  if (cookieLocale && locales.includes(cookieLocale as any)) {
    targetLocale = cookieLocale as any;
  }

  // Redirect to localized URL
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Explicitly exclude static assets and .well-known paths from middleware processing
  matcher: ['/((?!_next/static|_next/image|favicon.ico|\\.well-known).*)'],
};
