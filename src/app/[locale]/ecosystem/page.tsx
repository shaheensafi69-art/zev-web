import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Database,
  ExternalLink,
  Layers,
  GraduationCap,
  CreditCard,
  Building2,
  Globe,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { getDictionary, isRtlLocale, locales } from '@/dictionaries';
import { EcosystemSection } from '@/components/EcosystemSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'اکوسیستم صفی | هماهنگی یکپارچه زو (ZEV) با اکادمی صفی و صافی‌پی'
    : 'Safi Ecosystem | Unified ZEV, Safi Academy & SafiPay Architecture';

  const description = isFa
    ? 'بررسی همگرایی فنی اکوسیستم صفی: پایگاه داده مشترک زو (ZEV) با اکادمی بین‌المللی صفی و زیرساخت پرداخت صافی‌پی، احراز هویت تک‌ورودی (SSO) و تایید مدارک علمی نخبگان.'
    : 'Explore the interconnected Safi Ecosystem: Unified single database and Single Sign-On (SSO) uniting ZEV Social Network, Safi Academy (100k+ students), and SafiPay global fintech.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/ecosystem`;
  }

  return {
    title,
    description,
    keywords: [
      'Safi Ecosystem',
      'ZEV Safi Academy',
      'ZEV SafiPay',
      'Shaheen Safi',
      'Sahib Group',
      'Shared Database SSO',
      'Afghan Tech Ecosystem',
      'Unified Social Fintech',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/ecosystem`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/ecosystem`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'Safi Ecosystem Architecture & SSO',
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

export default async function EcosystemPage({
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
        '@type': 'WebPage',
        '@id': `https://zevapp.com/${locale}/ecosystem#webpage`,
        url: `https://zevapp.com/${locale}/ecosystem`,
        name: isFa ? 'اکوسیستم بین‌المللی صفی' : 'Safi Global Ecosystem',
        description: isFa
          ? 'معماری فنی و همگرایی پایگاه داده میان زو، اکادمی صفی و صافی‌پی.'
          : 'Technical database interoperability uniting ZEV, Safi Academy, and SafiPay.',
      },
      {
        '@type': 'Organization',
        name: 'Safi Ecosystem (Sahib Group)',
        url: 'https://zevapp.com',
        founder: {
          '@type': 'Person',
          name: 'Shaheen Safi',
        },
        department: [
          {
            '@type': 'Organization',
            name: 'ZEV Social Network',
            url: 'https://zevapp.com',
          },
          {
            '@type': 'EducationalOrganization',
            name: 'Safi Academy',
            url: 'https://safiacademy.org',
          },
          {
            '@type': 'FinancialService',
            name: 'SafiPay',
            url: 'https://safipay.net',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does the shared database between ZEV and Safi Academy function?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV and Safi Academy share an encrypted identity repository via Single Sign-On (SSO). Registered students authenticate directly into ZEV with their academy credentials without creating a new account.',
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
            <Database size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'همگرایی فنی و یکپارچگی ابری' : 'Unified Cloud Infrastructure'}
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
            {isFa
              ? 'اکوسیستم بین‌المللی صفی؛ قدرت شبکه مشترک'
              : 'The Interconnected Power of the Safi Ecosystem'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'اتصال بدون مرز میان شبکه اجتماعی زو (ZEV)، بزرگترین پلتفرم آموزشی آنلاین اکادمی صفی و زیرساخت پرداخت جهانی صافی‌پی با یک حساب واحد.'
              : 'Seamless single sign-on linking ZEV Social Network, Safi Academy (100k+ students), and SafiPay global financial infrastructure.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 24 }}>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 16,
                background: '#00D4FF',
                color: '#07090E',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>{isFa ? 'دریافت برنامه از گوگل پلی' : 'Download on Google Play'}</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={webAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 22px',
                borderRadius: 16,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>{isFa ? 'ورود به وب' : 'Launch Web'}</span>
            </a>
          </div>
        </div>

        {/* Detailed Ecosystem Showcase */}
        <div style={{ marginBottom: 70 }}>
          <EcosystemSection locale={locale} dict={dict} />
        </div>

        {/* Architecture Synergy Card */}
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            borderRadius: 28,
            padding: '36px 32px',
            marginBottom: 60,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <Zap size={20} color="#00D4FF" />
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF' }}>
              {isFa ? 'مزایای دیتابیس مشترک برای کاربران و دانشجویان' : 'Unified SSO & Data Advantages'}
            </h3>
          </div>
          <p style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.7 }}>
            {isFa
              ? 'کاربران نیازی به ثبت‌نام‌های متعدد ندارند. ورود به اکادمی صفی، حضور در ریلزهای تخصصی زو و تسویه کیف پول در صافی‌پی همه با یک شناسه کاربری رمزگذاری‌شده امن هدایت می‌شود. دانشجویان ممتاز به صورت خودکار تیک تایید علمی و دسترسی اولویت‌دار به امکانات استریم زو را کسب می‌کنند.'
              : 'Learners and creators enjoy zero credential friction. Logging into Safi Academy, streaming specialized educational Reels on ZEV, and managing balances through SafiPay are unified via encrypted OAuth 2.0 / JWT claims with automatic verified badge synchronization.'}
          </p>
        </div>

        {/* Answer Engine Section (AEO) */}
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF' }}>
              {isFa ? 'پرسش‌های متداول اکوسیستم' : 'Ecosystem Architecture FAQ'}
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 20,
                padding: '22px 26px',
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                {isFa ? 'آیا دانشجویان اکادمی صفی نیاز به ثبت‌نام جداگانه در زو دارند؟' : 'Do Safi Academy students need a separate account?'}
              </h4>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                {isFa
                  ? 'خیر، دانشجویان اکادمی می‌توانند با همان ایمیل و کلمه عبور وارد برنامه زو و وب‌سایت شوند و هویت دانشجویی آن‌ها فوراً شناسایی می‌گردد.'
                  : 'No. Safi Academy members log into ZEV natively using their existing academy credentials via unified Single Sign-On (SSO).'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
