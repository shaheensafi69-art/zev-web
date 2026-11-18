import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  Server,
  Globe,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  HelpCircle,
  ExternalLink,
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
    ? 'موقعیت‌های زیرساخت و مراکز داده زو (ZEV Edge Data Centers & Global POPs)'
    : 'ZEV Global Edge Locations & Infrastructure | Data Centers';

  const description = isFa
    ? 'بررسی شبکه جهانی سرورهای لبه و مراکز داده زو: کابل، دبی، فرانکفورت، سنگاپور و ویرجینیا با بیش از ۲۰۰ گره توزیع محتوا، تاخیر زیر ۵۰ میلی‌ثانیه و استاندارد ISO 27001.'
    : 'Explore ZEV’s multi-region edge infrastructure: Data center hubs in Kabul, Dubai, Frankfurt, Singapore, and Virginia powering sub-400ms RTC video calling and 99.99% uptime.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/locations`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Locations',
      'ZEV Data Centers',
      'ZEV Edge Network',
      'Sahib Group Infrastructure',
      'Kabul Edge Node',
      'Dubai Data Center',
      'Frankfurt Server',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/locations`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/locations`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV Global Edge Data Centers & Nodes',
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

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const hubs = [
    {
      city: isFa ? 'کابل (هاب مرکزی افغانستان)' : 'Kabul (Afghanistan Primary Edge Hub)',
      region: isFa ? 'آسیای مرکزی و جنوب آسیا' : 'Central & South Asia POP',
      latency: '<20ms',
      role: isFa ? 'پایگاه رله مستقیم کاربران داخلی، سرورهای حافظه موقت محلی' : 'Direct domestic user relay & high-speed localized media caching',
    },
    {
      city: isFa ? 'دبی (هاب خاورمیانه)' : 'Dubai (Middle East & GCC Gateway)',
      region: isFa ? 'امارات متحده عربی' : 'United Arab Emirates Tier-4',
      latency: '<35ms',
      role: isFa ? 'اتصال مستقیم با کابل‌های دریایی بین‌المللی و مراکز شتاب‌دهنده RTC' : 'Subsea cable termination & Agora RTC regional acceleration mesh',
    },
    {
      city: isFa ? 'فرانکفورت (هاب اروپا)' : 'Frankfurt (European Core)',
      region: isFa ? 'آلمان / اتحادیه اروپا' : 'Germany / European Union',
      latency: '<45ms',
      role: isFa ? 'مرکز داده پشتیبان ابری با انطباق کامل استاندارد GDPR و ISO 27001' : 'GDPR-compliant primary disaster recovery & global state replication',
    },
    {
      city: isFa ? 'سنگاپور و ویرجینیا' : 'Singapore & N. Virginia (Global Edge Mesh)',
      region: isFa ? 'آسیا-پاسیفیک و آمریکای شمالی' : 'Asia-Pacific & North America',
      latency: '<60ms',
      role: isFa ? 'پوشش کاربران دوردست، پردازش ابری داده‌های ناشناس و هوش مصنوعی' : 'Global CDN distribution and AI safety moderation ingestion',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        name: 'ZEV Kabul Primary Edge Data Center',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kabul',
          addressCountry: 'AF',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where are ZEV server nodes located?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV maintains high-availability server hubs in Kabul, Dubai, Frankfurt, Singapore, and Virginia with over 200 edge relay points worldwide.',
            },
          },
        ],
      },
    ],
  };

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
            <MapPin size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'شبکه جهانی لبه و مراکز داده' : 'GLOBAL EDGE TOPOLOGY'}
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
            {isFa ? 'موقعیت‌های سرور و زیرساخت جهانی زِو' : 'ZEV Global Edge Locations & Data Centers'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'بیش از ۲۰۰ گره لبه و ۴ هاب داده‌ای در سراسر جهان برای تضمین دسترسی پایدار، اتصال فوری تماس‌ها و حفاظت از اطلاعات کاربران.'
              : 'Over 200 distributed edge nodes across Kabul, Dubai, Frankfurt, and beyond ensuring sub-400ms RTC calls and zero downtime.'}
          </p>
        </div>

        {/* Hubs Grid */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 24,
                padding: '28px 24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Server size={20} color="#00D4FF" />
                  <span style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF' }}>{hub.city}</span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    background: 'rgba(0, 212, 255, 0.12)',
                    color: '#00D4FF',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    padding: '3px 10px',
                    borderRadius: 10,
                  }}
                >
                  {hub.latency}
                </span>
              </div>
              <div style={{ fontSize: 12.5, color: '#64748B', marginBottom: 10 }}>{hub.region}</div>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{hub.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
