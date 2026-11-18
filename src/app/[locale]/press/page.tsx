import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Newspaper,
  ArrowRight,
  ArrowLeft,
  Download,
  Mail,
  ShieldCheck,
  Globe,
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  FileText,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { getDictionary, isRtlLocale, locales } from '@/dictionaries';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'اتاق خبر و رسانه زو (ZEV Press & Newsroom) | بیانیه‌ها و کیت رسانه‌ای'
    : 'ZEV Newsroom & Press Kit | Official Announcements & Media Assets';

  const description = isFa
    ? 'اتاق خبر رسمی زو (ZEV): دسترسی به آخرین بیانیه‌های مطبوعاتی، دانلود کیت رسانه‌ای شامل لوگو و عکس‌های باکیفیت اپ، پالت رنگی رسمی و راه‌های ارتباطی با بخش رسانه صاحب گروپ.'
    : 'Official ZEV Press Room: Download media kit assets, vector brand logos, high-resolution screenshots, executive press releases, and media inquiry guidelines.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/press`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Press',
      'ZEV Newsroom',
      'ZEV Media Kit',
      'ZEV Brand Assets',
      'Sahib Group Press',
      'Shaheen Safi Press Release',
      'ZEV Logo Vector',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/press`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/press`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV Official Press Room & Media Assets',
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

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.zevapp.app&hl=en';
  const webAppUrl = 'https://zevapp.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsMediaOrganization',
        name: 'ZEV Press & Media Division',
        url: 'https://zevapp.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Sahib Group',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How can journalists contact the ZEV media team?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Journalists and news outlets can submit official inquiries directly to press@zevapp.com or media@sahibgroup.com.',
            },
          },
        ],
      },
    ],
  };

  const pressReleases = [
    {
      date: '2026-11-15',
      tag: isFa ? 'نسخه رسمی' : 'Major Release',
      title: isFa
        ? 'انتشار نسخه ۲.۴ زو در گوگل پلی با پشتیبانی از ریلز ۶۰ فریم و تماس ویدیویی RTC'
        : 'ZEV 2.4 Launches on Google Play Store with 60fps Reels & Sub-400ms Video Calling',
      summary: isFa
        ? 'شرکت صاحب گروپ نسخه جدید زو را با بازطراحی کامل موتور رندرینگ فلاتر، کاهش تاخیر تماس به زیر ۴۰۰ میلی‌ثانیه و انتشار رسمی در گوگل پلی معرفی کرد.'
        : 'Sahib Group announces the official worldwide release of ZEV 2.4 on Google Play, featuring sub-400ms Agora RTC video calling and hardware-accelerated 60fps Reels.',
    },
    {
      date: '2026-10-01',
      tag: isFa ? 'همگرایی ابری' : 'Infrastructure',
      title: isFa
        ? 'یکپارچه‌سازی پایگاه داده زو با اکادمی صفی و صافی‌پی تکمیل شد'
        : 'Seamless Single Sign-On Unifies ZEV with Safi Academy (100k+ Learners) and SafiPay',
      summary: isFa
        ? 'با ارتقای لایه احراز هویت، دانشجویان اکادمی صفی اکنون بدون نیاز به ثبت‌نام مجدد به شبکه زو دسترسی داشته و از تیک تایید بهره‌مند می‌شوند.'
        : 'The complete rollout of unified identity across the Safi Ecosystem grants instantaneous access and verified status to students and content creators.',
    },
  ];

  const brandColors = [
    { name: 'Electric Blue', hex: '#00D4FF', desc: isFa ? 'رنگ اصلی و شاخص برند' : 'Primary Brand Accent' },
    { name: 'Royal Blue', hex: '#536DFE', desc: isFa ? 'رنگ ثانویه و گرادیانت' : 'Secondary Vibrant Accent' },
    { name: 'Deep Space Navy', hex: '#07090E', desc: isFa ? 'پس‌زمینه اصلی دارک' : 'Deep Dark Background' },
    { name: 'Surface Slate', hex: '#0C101A', desc: isFa ? 'کارت‌ها و پنل‌های شیشه‌ای' : 'Glassmorphic Surface' },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#07090E' }}>
      {/* 6-Engine Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container">
        {/* Back Link */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: '#94A3B8',
            marginBottom: 28,
            textDecoration: 'none',
          }}
        >
          {isFa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isFa ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
        </Link>

        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 20,
              background: 'rgba(0, 212, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              marginBottom: 16,
            }}
          >
            <Newspaper size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'اتاق خبر، بیانیه‌ها و کیت رسانه‌ای' : 'Official Press Room & Assets'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 50px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 18,
              color: '#FFFFFF',
            }}
          >
            {isFa ? 'اتاق خبر رسمی زِو (ZEV Newsroom)' : 'ZEV Press Releases & Media Kit'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'اطلاعیه‌های مطبوعاتی، دسترسی به نشان‌های بصری و کیت برند رسمی برای خبرنگاران، رسانه‌ها و همکاران تجاری.'
              : 'Direct access to official announcements, downloadable vector brand assets, product imagery, and executive contacts.'}
          </p>
        </div>

        {/* Press Releases */}
        <div style={{ maxWidth: 860, margin: '0 auto 70px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 20 }}>
            {isFa ? 'آخرین بیانیه‌های رسمی' : 'Latest Announcements'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {pressReleases.map((pr, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 22,
                  padding: '28px 30px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: 'rgba(0, 212, 255, 0.12)',
                      color: '#00D4FF',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      padding: '3px 10px',
                      borderRadius: 10,
                    }}
                  >
                    {pr.tag}
                  </span>
                  <span style={{ fontSize: 13, color: '#64748B' }}>{pr.date}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
                  {pr.title}
                </h3>
                <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.65 }}>{pr.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Palette */}
        <div style={{ maxWidth: 860, margin: '0 auto 70px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 18 }}>
            {isFa ? 'پالت رنگی رسمی برند زِو' : 'Official Brand Color Palette'}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16,
            }}
          >
            {brandColors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 18,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: color.hex,
                    marginBottom: 12,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                />
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>{color.name}</div>
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#00D4FF' }}>{color.hex}</div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>{color.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact Card */}
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            borderRadius: 26,
            padding: '36px 32px',
            textAlign: 'center',
          }}
        >
          <Mail size={32} color="#00D4FF" style={{ margin: '0 auto 14px' }} />
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
            {isFa ? 'ارتباط با بخش رسانه و روابط عمومی' : 'Media Inquiries & Executive Contact'}
          </h3>
          <p style={{ fontSize: 14.5, color: '#94A3B8', marginBottom: 20 }}>
            {isFa
              ? 'خبرنگاران و اصحاب رسانه جهت مصاحبه با شاهین صافی یا دریافت بیانیه‌ها با ایمیل رسمی در تماس باشند.'
              : 'Direct all official press inquiries, executive interviews, and media credential requests to press@zevapp.com.'}
          </p>
          <a
            href="mailto:press@zevapp.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              borderRadius: 14,
              background: '#00D4FF',
              color: '#07090E',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
            }}
          >
            <span>press@zevapp.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
