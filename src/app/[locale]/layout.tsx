import type { Metadata } from 'next';
import '../globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getDictionary, isRtlLocale, locales } from '@/dictionaries';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  return {
    metadataBase: new URL('https://zevapp.com'),
    title: isFa
      ? 'زو (ZEV) - نسل جدید شبکه اجتماعی | zevapp.com'
      : 'ZEV - The Next-Gen Social Network | zevapp.com',
    description: isFa
      ? 'شبکه اجتماعی پیشرفته ساخته شده توسط مهندسان افغان برای جهان. اشتراک‌گذاری ریلز، استوری و فید هوشمند با دیتابیس مشترک با اکادمی صفی.'
      : 'Real People. Real Connections. Discover creators, watch 60fps reels, and connect across Afghanistan and worldwide. Built on Flutter with bank-grade privacy.',
    keywords: [
      'ZEV',
      'ZEV Social',
      'zevapp.com',
      'Safi Academy',
      'SafiPay',
      'Afghan social network',
      'Flutter Web App',
      'Reels Afghanistan',
    ],
    openGraph: {
      title: 'ZEV - Real People. Real Connections.',
      description: 'The Next Generation Social Network. Share your moments, inspire the world.',
      url: `https://zevapp.com/${locale}`,
      siteName: 'ZEV',
      images: [
        {
          url: '/screenshots/banner-1024x500.jpg',
          width: 1024,
          height: 500,
          alt: 'ZEV Social Network',
        },
      ],
      type: 'website',
    },
    icons: {
      icon: '/assets/icon-clean.png',
      apple: '/assets/icon-clean.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isRtl = isRtlLocale(locale);

  return (
    <div
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#07090E',
        color: '#CBD5E1',
      }}
    >
      {/* Floating Header */}
      <Navbar locale={locale} dict={dict} />

      {/* Main Content with top margin to accommodate floating header */}
      <main
        style={{
          flex: 1,
          width: '100%',
          paddingTop: 100, // Space for floating header
          backgroundColor: '#07090E',
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
