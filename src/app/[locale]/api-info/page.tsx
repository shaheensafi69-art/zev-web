import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Lock,
  Cpu,
  Clock,
  Sparkles,
  Mail,
  CheckCircle2,
  Terminal,
  Layers,
  HelpCircle,
  AlertTriangle,
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
    ? 'وضعیت API و پروتکل‌های زیرساخت زو (ZEV API & MCP Architecture Status)'
    : 'ZEV API & MCP Infrastructure Status | Developer Architecture';

  const description = isFa
    ? 'وضعیت رسمی دسترسی به API و پروتکل‌های MCP زو: معماری بسته داخلی جهت تضمین تاخیر زیر ۴۰۰ میلی‌ثانیه، حفظ حریم خصوصی کاربران، جلوگیری از بات‌های مخرب و نقشه راه همکاری‌های تجاری.'
    : 'Official status of ZEV APIs and Model Context Protocol (MCP) integrations: Explaining our internal-only closed microservice architecture for sub-400ms RTC stability and privacy.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/api-info`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV API',
      'ZEV MCP Protocol',
      'ZEV Developer API',
      'ZEV Social API Status',
      'Shaheen Safi API Architecture',
      'Closed API Policy',
      'RTC Microservices',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/api-info`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/api-info`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV API & MCP Infrastructure Status',
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

export default async function ApiInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: isFa ? 'معماری و سیاست دسترسی به API زو' : 'ZEV API & Protocol Access Policy',
        url: `https://zevapp.com/${locale}/api-info`,
        description: isFa
          ? 'توضیحات فنی درباره عدم ارائه API عمومی و دلایل امنیتی حفظ ثبات شبکه.'
          : 'Technical notice detailing internal API architecture, bot prevention, and RTC preservation.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does ZEV offer a public REST or GraphQL API?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. At this stage, ZEV does not offer public third-party REST, GraphQL, or Model Context Protocol (MCP) endpoints to protect user privacy, prevent unauthorized AI scraping, and ensure sub-400ms RTC stability.',
            },
          },
        ],
      },
    ],
  };

  const coreReasons = [
    {
      icon: Lock,
      title: isFa ? 'حفاظت حداکثری از داده‌ها و ضد اسکرپینگ' : 'Zero Scraping & Data Sovereignty',
      desc: isFa
        ? 'بستن دسترسی عمومی مانع از خزش خودکار اطلاعات کاربران توسط بات‌های هوش مصنوعی و شرکت‌های جمع‌آوری دیتا می‌گردد.'
        : 'Restricting external endpoint access prevents commercial AI crawlers and data brokers from harvesting user posts, videos, or profiles.',
    },
    {
      icon: Cpu,
      title: isFa ? 'تضمین پایداری ۶۰ فریم و تاخیر زیر ۴۰۰ میلی‌ثانیه' : 'Preserving 60fps & Sub-400ms RTC',
      desc: isFa
        ? 'ظرفیت پردازشی کلاسترها و گره‌های لبه تماماً به ترافیک زنده کاربران اپلیکیشن و وب اختصاص دارد.'
        : 'Our global compute mesh is dedicated 100% to live in-app media decoders and real-time Agora RTC call pipelines.',
    },
    {
      icon: ShieldAlert,
      title: isFa ? 'امنیت تراکنش‌ها و پایگاه داده مشترک' : 'Safi Ecosystem Security Perimeter',
      desc: isFa
        ? 'همبستگی پایگاه داده با اکادمی صفی و صافی‌پی نیازمند بالاترین سطح ایزولاسیون شبکه در برابر حملات تزریق و نفوذ است.'
        : 'Interoperability with Safi Academy student credentials and SafiPay fintech wallets requires an enterprise perimeter isolated from untrusted callers.',
    },
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
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 50px' }}>
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
            <Code2 size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'معماری فنی و وضعیت دسترسی به API' : 'API & DEVELOPER ARCHITECTURE'}
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
            {isFa ? 'وضعیت API و پروتکل‌های زیرساخت زِو' : 'ZEV API & Developer Services Status'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'توضیحات شفاف درباره سیاست امنیتی دسترسی به سرویس‌های شبکه و محافظت از کارایی سیستم.'
              : 'Official declaration regarding external API and Model Context Protocol (MCP) access policies.'}
          </p>
        </div>

        {/* Official Architecture Notice Box */}
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto 60px',
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1.5px solid rgba(0, 212, 255, 0.35)',
            borderRadius: 28,
            padding: '36px 32px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Terminal size={24} color="#00D4FF" />
            <span
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: '#07090E',
                background: '#00D4FF',
                padding: '4px 10px',
                borderRadius: 8,
              }}
            >
              {isFa ? 'سیاست جاری' : 'CURRENT STATUS: INTERNAL ONLY'}
            </span>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 14 }}>
            {isFa
              ? 'در حال حاضر هیچ‌گونه API عمومی یا پروتکل MCP ارائه نمی‌شود'
              : 'ZEV Does Not Currently Offer Public Third-Party APIs or MCP Endpoints'}
          </h2>

          <p style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.75, marginBottom: 20 }}>
            {isFa
              ? 'به منظور تضمین امنیت داده‌های کاربران، جلوگیری از استخراج غیرمجاز محتوا توسط بات‌های جمع‌آوری اطلاعات و متمرکز ساختن تمام پهنای باند و توان پردازشی سرورها بر ارائه تماس‌های ویدیویی فوق‌پایدار و ریلزهای روان ۶۰ فریم، تمامی APIها و وب‌سرویس‌های زِو به صورت کاملاً بسته (Internal Private Microservices) مدیریت می‌شوند.'
              : 'To protect creator copyrights, block unauthorized scrapers, and guarantee uncompromised 60fps feed and sub-400ms RTC video calling performance, ZEV microservices remain strictly internal and inaccessible to generic external scripts.'}
          </p>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: 16,
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: 13.5,
              color: '#94A3B8',
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: '#FFFFFF' }}>{isFa ? 'نکته برای توسعه‌دهندگان:' : 'Note for Developers:'}</strong>{' '}
            {isFa
              ? 'جهت ارتباط و تعامل با زِو، لطفاً از نسخه رسمی اندروید در گوگل پلی استور یا وب اپلیکیشن web.zevapp.com استفاده فرمایید.'
              : 'To interact with ZEV, please use the official Google Play application or the desktop web app at zevapp.com.'}
          </div>
        </div>

        {/* Reasons Grid */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 20, textAlign: 'center' }}>
            {isFa ? 'دلایل معماری بسته در این فاز' : 'Pillars of Our Closed Architecture'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {coreReasons.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 22,
                    padding: '28px 24px',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00D4FF',
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                    {reason.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.65 }}>{reason.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commercial Inquiry */}
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            background: 'rgba(13, 18, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 24,
            padding: '30px 28px',
            textAlign: 'center',
          }}
        >
          <Mail size={28} color="#00D4FF" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
            {isFa ? 'پیشنهادات تجاری و شرکای استراتژیک' : 'Enterprise Partnership Inquiries'}
          </h3>
          <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 16 }}>
            {isFa
              ? 'سازمان‌ها و ارائه‌دهندگان سرویس جهت بررسی اتصال اختصاصی B2B با ایمیل فنی در ارتباط باشند.'
              : 'Institutions seeking custom B2B edge federation can direct proposals to dev@zevapp.com.'}
          </p>
          <a
            href="mailto:dev@zevapp.com"
            style={{
              color: '#00D4FF',
              fontWeight: 800,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            dev@zevapp.com
          </a>
        </div>
      </div>
    </div>
  );
}
