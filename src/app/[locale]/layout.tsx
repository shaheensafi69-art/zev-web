import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getDictionary, isRtlLocale, locales } from '@/dictionaries';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#080D1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'زو (ZEV) - نسل جدید شبکه اجتماعی پیشرفته | zevapp.com'
    : 'ZEV - The Next-Gen High-Performance Social Network | zevapp.com';

  const description = isFa
    ? 'شبکه اجتماعی پیشرفته زو (ZEV) با معماری ۶۰ فریم فلاتر، ریلز پرسرعت، تماس صوتی و تصویری HD، حریم خصوصی حداکثری و پایگاه داده مشترک با اکادمی صفی و صافی‌پی.'
    : 'Real People. Real Connections. Discover creators, stream 60fps Reels, enjoy studio HD video calling, and connect globally with bank-grade AES-256 privacy.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}`;
  }

  return {
    metadataBase: new URL('https://zevapp.com'),
    title: {
      default: title,
      template: '%s | ZEV Social Network',
    },
    description,
    applicationName: 'ZEV',
    authors: [{ name: 'Sahib Group & Shaheen Safi', url: 'https://zevapp.com' }],
    creator: 'Sahib Group',
    publisher: 'Sahib Group',
    category: 'Social Networking',
    keywords: [
      'ZEV',
      'ZEV Social',
      'zevapp.com',
      'Sahib Group',
      'Shaheen Safi',
      'Safi Academy',
      'SafiPay',
      'Afghan social network',
      'Flutter Web App',
      'Reels 60fps',
      'Encrypted Messaging',
      'Video Calling',
      'Live Streaming RTC',
      'Next-Gen Social Network',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}`,
      languages: languageAlternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1600,
          height: 800,
          alt: 'ZEV Social Network Showcase',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/app-shots/8.jpeg'],
      creator: '@shaheensafi09',
      site: '@zevapp',
    },
    icons: {
      icon: [
        { url: '/assets/icon-clean.png', sizes: 'any' },
        { url: '/favicon.ico' },
      ],
      apple: [{ url: '/assets/icon-clean.png' }],
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

  // Global Structured Data for SEO, GEO, AIO, AEO, XEO, XIO
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://zevapp.com/#organization',
        name: 'ZEV',
        legalName: 'ZEV Social Network (Sahib Group)',
        url: 'https://zevapp.com',
        logo: 'https://zevapp.com/assets/icon-clean.png',
        sameAs: [
          'https://shaheensafi.blog',
          'https://safiacademy.org',
          'https://safipay.net',
        ],
        founder: {
          '@type': 'Person',
          name: 'Shaheen Safi',
        },
        parentOrganization: {
          '@type': 'Organization',
          name: 'Sahib Group',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://zevapp.com/#website',
        url: 'https://zevapp.com',
        name: 'ZEV',
        publisher: { '@id': 'https://zevapp.com/#organization' },
        inLanguage: locale,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ZEV Social App',
        operatingSystem: 'Android, iOS, Web',
        applicationCategory: 'SocialNetworkingApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '12800',
        },
      },
    ],
  };

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
      {/* 6-Tier System Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
