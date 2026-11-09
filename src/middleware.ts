import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from './dictionaries';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Ignore static assets, APIs, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/screenshots') ||
    pathname.startsWith('/flags') ||
    pathname.startsWith('/team') ||
    pathname.startsWith('/company') ||
    pathname.includes('.') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/login') ||
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
