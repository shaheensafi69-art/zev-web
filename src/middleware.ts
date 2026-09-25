import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from './dictionaries';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
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
