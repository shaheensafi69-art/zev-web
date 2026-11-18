import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  Trash2,
  Fingerprint,
  Server,
  Mail,
  ArrowLeft,
  ArrowRight,
  Database,
  CheckCircle2,
  FileText,
  Key,
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
    ? 'سیاست حفظ حریم خصوصی زو (ZEV Privacy Policy) | امنیت داده‌ها و رمزگذاری'
    : 'ZEV Privacy Policy | Data Protection, TLS 1.3 & On-Device Biometrics';

  const description = isFa
    ? 'سیاست رسمی حفظ حریم خصوصی زو (ZEV): عدم فروش داده‌ها به اشخاص ثالث، رمزگذاری TLS 1.3، پردازش بیومتریک ۱۰۰٪ روی سخت‌افزار دستگاه و انطباق با استانداردهای GDPR و COPPA.'
    : 'Official ZEV Privacy Policy: Zero data brokering, TLS 1.3 encryption, on-device Secure Enclave biometrics, right to erasure, and strict GDPR / COPPA compliance.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/privacy`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Privacy Policy',
      'ZEV Data Protection',
      'ZEV Security Policy',
      'On-Device Biometrics',
      'GDPR Compliance ZEV',
      'No Data Brokering',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/privacy`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/privacy`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV Privacy Policy & Data Sovereignty',
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

export default async function PrivacyPage({
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
        '@type': 'PrivacyPolicy',
        name: isFa ? 'سیاست حفظ حریم خصوصی زو' : 'ZEV Privacy Policy',
        url: `https://zevapp.com/${locale}/privacy`,
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
            name: 'Does ZEV sell user data to advertising companies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. ZEV has an uncompromising zero-data-brokering policy. We never sell, lease, or monetize user personal data, behavioral telemetry, or chat messages.',
            },
          },
          {
            '@type': 'Question',
            name: 'Where are my biometric credentials stored?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Biometric information (Fingerprint and Face ID) never leaves your device. It is processed strictly inside your smartphone Secure Enclave hardware.',
            },
          },
        ],
      },
    ],
  };

  const sections = [
    {
      icon: Eye,
      id: 'data-collection',
      title: isFa ? '۱. اطلاعاتی که جمع‌آوری می‌کنیم' : '1. Information We Collect',
      content: isFa
        ? 'ما صرفاً داده‌های ضروری برای عملکرد پلتفرم را جمع‌آوری می‌نماییم: اطلاعات پروفایل (نام کاربری، نام، بیو، عکس پروفایل)، اطلاعات تماس (ایمیل)، داده‌های رسانه‌ای بارگذاری شده (عکس، ویدیو، ریلز) و اطلاعات فنی دستگاه (مدل دستگاه، نسخه سیستم‌عامل، زبان جهت تنظیم خودکار اپلیکیشن). زو هرگز بدون اجازه شما به میکروفون یا موقعیت مکانی دسترسی نخواهد داشت.'
        : 'We strictly gather essential operational metadata: profile identifiers (username, bio, avatar), contact info (verified email), user-generated media (photos, reels, comments), and standard device telemetry (hardware model, OS build, locale preferences). We never access location or hardware peripherals without explicit, granular runtime consent.',
    },
    {
      icon: Database,
      id: 'unified-database',
      title: isFa ? '۲. معماری دیتابیس مشترک با اکادمی صفی' : '2. Shared Database Architecture with Safi Academy',
      content: isFa
        ? 'پلتفرم زو و اکادمی صفی بر روی یک زیرساخت دیتابیس ابری واحد (با رمزنگاری سرتاسری AES-256) میزبانی می‌شوند. این به کاربران اجازه می‌دهد با یک نام کاربری و رمز عبور وارد هر دو پلتفرم شوند. اطلاعات دانشجویی و کیف پول صافی‌پی شما در محیطی کاملاً ایزوله و امن نگهداری شده و هرگز در فید عمومی افشا نمی‌گردد.'
        : 'ZEV and Safi Academy operate over an enterprise-grade unified cloud database cluster with AES-256 at-rest encryption. This enables single sign-on across the Safi Ecosystem. Student records and SafiPay balance tokens remain strictly isolated from public social feeds.',
    },
    {
      icon: Lock,
      id: 'encryption-security',
      title: isFa ? '۳. امنیت و رمزنگاری پیشرفته داده‌ها' : '3. Bank-Grade Encryption & Data Storage',
      content: isFa
        ? 'تمامی تبادلات داده بین دستگاه کاربر و سرورهای زو با استفاده از پروتکل‌های رمزنگاری پیشرفته TLS 1.3 و HTTPS محافظت می‌شوند. رمزهای عبور کاربران به صورت هش‌شده غیرقابل بازگشت با الگوریتم Argon2/Bcrypt ذخیره می‌شوند و حتی مدیران سیستم نیز به رمز عبور خام شما دسترسی ندارند.'
        : 'All transport channels utilize TLS 1.3 with rigorous forward secrecy. User credentials and authorization hashes are stored using salted cryptographic one-way hashing algorithms (Argon2 / Bcrypt). Plaintext credentials never exist on our persistence tiers.',
    },
    {
      icon: Fingerprint,
      id: 'biometrics',
      title: isFa ? '۴. حفاظت بیومتریک و کد PIN محلی' : '4. On-Device Biometrics & Local PIN',
      content: isFa
        ? 'در صورت فعال‌سازی قفل بیومتریک (اثر انگشت یا Face ID) در اپلیکیشن زو، داده‌های بیومتریک صرفاً روی سخت‌افزار دستگاه شما (Secure Enclave) پردازش شده و به هیچ عنوان به سرورهای زو ارسال یا مخابره نمی‌گردند.'
        : 'Biometric verification (Face ID / Fingerprint sensor) and App-Lock PIN codes reside entirely within your local device Secure Enclave. Biometric tokens are never transmitted to ZEV servers or stored remotely.',
    },
    {
      icon: Server,
      id: 'third-parties',
      title: isFa ? '۵. عدم فروش داده‌ها به اشخاص ثالث' : '5. Zero Data Brokering & No Third-Party Sales',
      content: isFa
        ? 'زو هرگز اطلاعات شخصی، رفتار کاربری، یا تاریخچه پیام‌ها و فعالیت‌های شما را به شرکت‌های تبلیغاتی یا واسطه‌های داده (Data Brokers) نخواهد فروخت. پلتفرم ما متعهد به اصول استقلال داده و حریم خصوصی مطلق است.'
        : 'ZEV will never sell, lease, or broker your personal behavioral telemetry or communication records to third-party ad networks or marketing intermediaries. Privacy is our foundational architectural promise.',
    },
    {
      icon: Trash2,
      id: 'deletion',
      title: isFa ? '۶. حق فراموشی و حذف آنی حساب' : '6. Right to Erasure & Immediate Account Deletion',
      content: isFa
        ? 'شما در هر زمان حق دارید حساب کاربری خود و تمامی داده‌های مربوطه (پست‌ها، ریلزها، پیام‌ها و فایل‌ها) را به طور خودکار و بدون نیاز به تایید دستی از طریق بخش تنظیمات یا صفحه حذف حساب پاک کنید. حذف داده‌ها قطعی و غیرقابل بازگشت است.'
        : 'You maintain absolute sovereignty over your account data. You may trigger an immediate, automated, irreversible deletion of your profile, media, comments, and messages directly from inside the app or via our dedicated account deletion tool.',
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
            <ShieldCheck size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'شفافیت، امنیت و استقلال داده‌ها' : 'PRIVACY & DATA SOVEREIGNTY'}
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
            {isFa ? 'سیاست حفظ حریم خصوصی زِو' : 'ZEV Global Privacy Policy'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'تعهد رسمی شرکت صاحب گروپ به حفاظت از اطلاعات شخصی، عدم فروش داده‌ها و رمزگذاری بانکی.'
              : 'Our legally binding commitment to personal data protection, zero data brokering, and cryptographic security.'}
          </p>
        </div>

        {/* Policy Sections */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                id={sec.id}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 24,
                  padding: '30px 28px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00D4FF',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>{sec.title}</h2>
                </div>
                <p style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.75 }}>{sec.content}</p>
              </div>
            );
          })}
        </div>

        {/* Privacy Contact */}
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
          <Mail size={32} color="#00D4FF" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
            {isFa ? 'افسر حفاظت از داده‌ها (DPO)' : 'Data Protection Officer (DPO)'}
          </h3>
          <p style={{ fontSize: 14.5, color: '#94A3B8', marginBottom: 18 }}>
            {isFa
              ? 'جهت هرگونه استعلام، اعمال حق حذف یا گزارش امنیتی با ایمیل رسمی حریم خصوصی مکاتبه فرمایید.'
              : 'Direct all GDPR, CCPA, or personal data sovereignty inquiries to privacy@zevapp.com.'}
          </p>
          <a
            href="mailto:privacy@zevapp.com"
            style={{
              color: '#00D4FF',
              fontWeight: 800,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            privacy@zevapp.com
          </a>
        </div>
      </div>
    </div>
  );
}
