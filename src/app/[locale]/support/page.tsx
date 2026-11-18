import type { Metadata } from 'next';
import { isRtlLocale, locales } from '@/dictionaries';
import { SupportClient } from './SupportClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'مرکز راهنمایی و پشتیبانی زو (ZEV 24/7 Help Desk) | تیکت و سوالات متداول'
    : 'ZEV Help Desk & Support Center | 24/7 Official Assistance & FAQ';

  const description = isFa
    ? 'مرکز پشتیبانی رسمی ۲۴ ساعته زو (ZEV): راهنمای لاگین با حساب اکادمی صفی، حل مشکل بارگذاری ریلز، پیگیری کیف پول صافی‌پی، گزارش باگ‌های فنی و ارسال تیکت.'
    : 'Official ZEV 24/7 Help Desk: Get instant answers on Safi Academy SSO login, 60fps Reels troubleshooting, SafiPay creator payouts, and technical support ticketing.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/support`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Support',
      'ZEV Help Center',
      'ZEV Customer Service',
      'Safi Academy Login Help',
      'ZEV Bug Report',
      'support@zevapp.com',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/support`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/support`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV 24/7 Support Center & Help Desk',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/app-shots/8.jpeg'],
      creator: '@shaheensafi09',
      site: '@zevapp',
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: isFa ? 'مرکز پشتیبانی ۲۴ ساعته زو' : 'ZEV 24/7 Support Center',
        url: `https://zevapp.com/${locale}/support`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I log into ZEV using my Safi Academy account?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Because ZEV shares a unified cloud database with Safi Academy, simply use your existing Safi Academy credentials (email and password) to log in directly.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SupportClient locale={locale} />
    </>
  );
}
