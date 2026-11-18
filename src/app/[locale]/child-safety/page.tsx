import type { Metadata } from 'next';
import { isRtlLocale, locales } from '@/dictionaries';
import { ChildSafetyClient } from './ChildSafetyClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'استانداردهای حفاظت از کودکان و نوجوانان در زو (ZEV Child Safety Standards)'
    : 'ZEV Child Safety & Minor Protection Standards | Zero Tolerance';

  const description = isFa
    ? 'خط‌مشی بدون تسامح زو در حفاظت از کودکان و نوجوانان: پایش خودکار رسانه‌ها، محدودسازی پیام‌های ناشناس برای نوجوانان، رسیدگی زیر یک ساعت به گزارش‌ها و هماهنگی با مراجع قانونی.'
    : 'ZEV child safety commitments: Strict zero tolerance for CSAM/CSAE, automated media hash filtering, age gating, rapid 60-minute triage, and full NCMEC cooperation.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/child-safety`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Child Safety',
      'Child Sexual Abuse Prevention',
      'CSAM Policy ZEV',
      'Minor Safety Social Media',
      'Safe Environment for Teens',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/child-safety`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/child-safety`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV Child Safety & Protection Guidelines',
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

export default async function ChildSafetyPage({
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
        '@type': 'WebPage',
        name: isFa ? 'استانداردهای حفاظت از کودکان در زو' : 'ZEV Child Safety Standards',
        url: `https://zevapp.com/${locale}/child-safety`,
        publisher: {
          '@type': 'Organization',
          name: 'Sahib Group (ZEV)',
          url: 'https://zevapp.com',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is ZEV’s policy regarding child safety and CSAM?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV maintains strict zero tolerance for child sexual abuse material (CSAM). Any detected or reported materials are automatically blocked, accounts permanently terminated, and incidents escalated to international law enforcement.',
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
      <ChildSafetyClient locale={locale} />
    </>
  );
}
