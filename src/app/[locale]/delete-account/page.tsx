import type { Metadata } from 'next';
import { isRtlLocale, locales } from '@/dictionaries';
import { DeleteAccountClient } from './DeleteAccountClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'درخواست حذف دائم حساب کاربری زو (ZEV Account Deletion) | استاندارد گوگل پلی'
    : 'ZEV Account Deletion & Right to Erasure | Google Play Compliance';

  const description = isFa
    ? 'درخواست رسمی و خودکار حذف دائمی حساب کاربری زو (ZEV): پاکسازی کامل و فوری تمام داده‌ها، پست‌ها، ریلزها، پیام‌ها و اطلاعات هویتی منطبق با استانداردهای گوگل پلی و GDPR.'
    : 'Official ZEV account erasure portal. In compliance with Google Play Developer Policy and GDPR, submit an automated request to permanently delete your account, reels, chats, and telemetry.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/delete-account`;
  }

  return {
    title,
    description,
    keywords: [
      'Delete ZEV Account',
      'ZEV Account Erasure',
      'Google Play Account Deletion',
      'Right to Erasure GDPR',
      'Permanently Delete ZEV Data',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/delete-account`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/delete-account`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV Account Deletion & Data Privacy',
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

export default async function DeleteAccountPage({
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
        name: isFa ? 'درخواست حذف دائمی حساب زو' : 'ZEV Account Deletion Portal',
        url: `https://zevapp.com/${locale}/delete-account`,
        publisher: {
          '@type': 'Organization',
          name: 'Sahib Group (ZEV)',
          url: 'https://zevapp.com',
        },
      },
      {
        '@type': 'HowTo',
        name: isFa ? 'نحوه حذف حساب کاربری زو' : 'How to Delete Your ZEV Account',
        step: [
          {
            '@type': 'HowToStep',
            text: isFa
              ? 'نام کاربری یا ایمیل ثبت‌نامی خود را وارد نمایید.'
              : 'Enter your registered ZEV username or email address.',
          },
          {
            '@type': 'HowToStep',
            text: isFa
              ? 'دلیل خروج و تاییدیه حذف قطعی اطلاعات را علامت بزنید.'
              : 'Confirm permanent loss of data and select your reason for leaving.',
          },
          {
            '@type': 'HowToStep',
            text: isFa
              ? 'دکمه ارسال درخواست حذف را بزنید تا حساب وارد صف پاکسازی آنی شود.'
              : 'Submit the deletion ticket for automated erasure across all persistence clusters.',
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
      <DeleteAccountClient locale={locale} />
    </>
  );
}
