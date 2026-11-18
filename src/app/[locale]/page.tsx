import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  Globe,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Video,
  Users,
  Lock,
  Monitor,
  Heart,
  ChevronDown,
  CheckCircle2,
  Smartphone,
  Flame,
  Star,
  Layers,
  Database,
  PhoneCall,
  Zap,
  TrendingUp,
  Cpu,
  ExternalLink,
  HelpCircle,
  Award,
} from 'lucide-react';
import { getDictionary, isRtlLocale, locales } from '@/dictionaries';
import { AppShowcase } from '@/components/AppShowcase';
import { EcosystemSection } from '@/components/EcosystemSection';
import { TeamSection } from '@/components/TeamSection';

// Official Google Play 4-color vector icon
const GooglePlayIcon: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325.3 234.3L104.6 13.6C99.2 8.2 92.4 5.2 85 5.2c-5.5 0-10.8 1.6-15.4 4.7L325.3 234.3z"
      fill="#00D4FF"
    />
    <path
      d="M421.2 216.7l-95.9 55.4-85.7-85.7 85.7-85.7 96 55.4c16.3 9.4 26.7 26.8 26.7 45.3s-10.4 35.9-26.8 45.3z"
      fill="#FFD043"
    />
    <path
      d="M69.6 10C64.9 13.1 62 18.5 62 24.3v463.4c0 5.8 2.9 11.2 7.6 14.3l255.7-224.2L69.6 10z"
      fill="#00C3FF"
    />
    <path
      d="M325.3 277.7L69.6 502c4.6 3.1 9.9 4.7 15.4 4.7 7.4 0 14.2-3 19.6-8.4l220.7-220.6z"
      fill="#FF3A44"
    />
    <path
      d="M325.3 277.7l95.9-55.4-95.9-55.4-85.7 85.7 85.7 25.1z"
      fill="#536DFE"
      fillOpacity="0.8"
    />
  </svg>
);

// Page Metadata for SEO, GEO, AIO, AEO, XEO, XIO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'زو (ZEV) - نسل جدید شبکه اجتماعی پیشرفته | دانلود رسمی از گوگل پلی'
    : 'ZEV - Next-Gen High-Performance Social Network | Official Google Play';

  const description = isFa
    ? 'شبکه اجتماعی بین‌المللی زو (ZEV): تجربه ریلز ۶۰ فریم، تماس ویدیویی استودیویی با تاخیر زیر ۴۰۰ میلی‌ثانیه، رمزگذاری TLS 1.3 و اکوسیستم مشترک با اکادمی صفی و صافی‌پی. دانلود مستقیم از گوگل پلی.'
    : 'ZEV Social Network: Ultra-fluid 60fps Reels, sub-400ms Agora RTC video calls, end-to-end encrypted messaging, and unified creator monetization. Download on Google Play or launch web app.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV',
      'ZEV App',
      'ZEV Google Play',
      'Download ZEV',
      'ZEV Social Network',
      'Shaheen Safi',
      'Sahib Group',
      'Safi Academy',
      'SafiPay',
      '60fps Reels',
      'Sub-400ms Video Calling',
      'Encrypted Messaging',
      'Flutter Social App',
      'Next-Gen Social Network',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/1.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV 60fps Reels & HD Video Calls Showcase',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/app-shots/1.jpeg'],
      creator: '@shaheensafi09',
      site: '@zevapp',
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.zevapp.app&hl=en';
  const webAppUrl = 'https://zevapp.com';
  const directApkUrl = '/downloads/zev-android.apk';

  // 6-Engine Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'ZEV Social Network',
        applicationCategory: 'SocialNetworkingApplication',
        operatingSystem: 'Android, iOS, Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl: googlePlayUrl,
        installUrl: googlePlayUrl,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '12800',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Organization',
          name: 'Sahib Group',
          url: 'https://zevapp.com',
          founder: {
            '@type': 'Person',
            name: 'Shaheen Safi',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where can I download the official ZEV app for Android?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The official verified ZEV Android application is available on the Google Play Store at https://play.google.com/store/apps/details?id=com.zevapp.app&hl=en and as a direct APK on zevapp.com.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes ZEV Reels different from other platforms?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV Reels run on a dedicated 60fps Flutter rendering pipeline with GPU hardware acceleration, intelligent chunk pre-fetching, and smart topic tags for Coding, Trading, and Education.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does ZEV HD Video Calling achieve sub-400ms latency?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV uses a custom Agora RTC mesh routing network across 200+ global edge locations, adaptive bandwidth scaling, and AI noise suppression for crystal-clear real-time communication.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does ZEV integrate with Safi Academy and SafiPay?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV shares a unified authentication database and Single Sign-On (SSO) with Safi Academy (100k+ students) and SafiPay global fintech, granting instant access and verified creator status.',
            },
          },
        ],
      },
    ],
  };

  const bentoFeatures = [
    {
      icon: Video,
      tag: isFa ? 'معماری ریلز' : '60FPS REELS ENGINE',
      title: isFa ? 'استودیو ریلز فوق‌روان ۶۰ فریم' : '60fps Hardware-Accelerated Reels',
      desc: isFa
        ? 'پخش ویدیوهای عمودی بدون افت فریم و بدون بافرینگ با دسته‌بندی‌های تخصصی کدنویسی، تریدینگ، انگیزه و آموزش.'
        : 'Zero-stutter vertical creator video engine with background pre-fetching, instant sound synchronization, and dedicated topic categorization.',
      accent: '#00D4FF',
      image: '/app-shots/1.jpeg',
    },
    {
      icon: PhoneCall,
      tag: isFa ? 'ارتباط همزمان' : 'SUB-400MS RTC CALLING',
      title: isFa ? 'تماس تصویری و صوتی HD استودیویی' : 'Studio Voice & HD Video Calls',
      desc: isFa
        ? 'تاخیر فوق‌العاده پایین زیر ۴۰۰ میلی‌ثانیه بر بستر Agora RTC، همراه با هوش مصنوعی حذف نویز محیط و سازگاری با اینترنت‌های ضعیف.'
        : 'Sub-400ms real-time audio and video communication powered by Agora RTC mesh routing with deep AI noise suppression.',
      accent: '#536DFE',
      image: '/app-shots/6.jpeg',
    },
    {
      icon: Lock,
      tag: isFa ? 'امنیت بانکی' : 'BANK-GRADE PRIVACY',
      title: isFa ? 'رمزگذاری سرتاسری و امنیت بیومتریک' : 'TLS 1.3 Encryption & Biometrics',
      desc: isFa
        ? 'پردازش اثر انگشت و فیس‌آیدی ۱۰۰٪ روی سخت‌افزار دستگاه شما با انکلو امن و قفل اختصاصی ۴ رقمی برای ورود.'
        : 'On-device biometrics and local PIN code keep your account sealed. Complete cryptographic forward secrecy on all in-flight packets.',
      accent: '#00D4FF',
      image: '/app-shots/5.jpeg',
    },
    {
      icon: Monitor,
      tag: isFa ? 'موتور چندپلتفرمه' : 'UNIVERSAL FLUTTER ENGINE',
      title: isFa ? 'یک پلتفرم در موبایل، وب و دسکتاپ' : 'Unified Native & Web Experience',
      desc: isFa
        ? 'یک پایگاه کد مدرن فلاتر برای اندروید، آیفون، نسخه وب zevapp.com و ویندوز/مک بدون افت کیفیت.'
        : 'Single Flutter codebase rendering identical 60fps fluid UI across Android, iOS, desktop web browsers, and native OS clients.',
      accent: '#536DFE',
      image: '/app-shots/3.jpeg',
    },
    {
      icon: Award,
      tag: isFa ? 'هویت حرفه‌ای' : 'VERIFIED CREATORS',
      title: isFa ? 'تیک آبی و درآمدزایی مستقیم سازندگان' : 'Verified Badges & Monetization',
      desc: isFa
        ? 'نشان‌های تایید رسمی برای نخبگان و مدرسین، ابزارهای تخصصی تحلیل مخاطب و پلتفرم تبلیغات هوشمند.'
        : 'Official verified badges for recognized creators, instructors, and analysts with audience analytics and native ad tools.',
      accent: '#00D4FF',
      image: '/app-shots/4.jpeg',
    },
    {
      icon: Database,
      tag: isFa ? 'اکوسیستم صفی' : 'SAFI ECOSYSTEM SSO',
      title: isFa ? 'دیتابیس مشترک با اکادمی صفی و صافی‌پی' : 'Single Sign-On with Safi Ecosystem',
      desc: isFa
        ? 'ورود فوری با اطلاعات اکادمی صفی برای صدها هزار دانشجو، تایید مدارک علمی و تسویه مالی آنی با کارت‌های صافی‌پی.'
        : 'Unified Single Sign-On and database sharing with Safi Academy (100k+ students) and SafiPay fintech infrastructure.',
      accent: '#536DFE',
      image: '/app-shots/8.jpeg',
    },
  ];

  const faqs = [
    {
      q: isFa ? 'چگونه می‌توانم برنامه زو (ZEV) را در اندروید دانلود کنم؟' : 'Where can I download the official ZEV app for Android?',
      a: isFa
        ? 'برنامه زو به صورت رسمی در فروشگاه گوگل پلی (Google Play Store) منتشر شده است. همچنین می‌توانید فایل مستقیم APK را برای دستگاه‌های بدون خدمات گوگل مستقیماً از zevapp.com دریافت کنید.'
        : 'ZEV is officially published on the Google Play Store (ID: com.zevapp.app). Direct APK downloads are also available for Huawei and devices without Google Play Services.',
    },
    {
      q: isFa ? 'تماس ویدیویی زو چگونه تاخیر زیر ۴۰۰ میلی‌ثانیه دارد؟' : 'How does ZEV achieve sub-400ms video call latency?',
      a: isFa
        ? 'زو از معماری Agora RTC با بیش از ۲۰۰ گره رله جهانی در کابل، دبی و فرانکفورت استفاده می‌کند که ترافیک صدا و تصویر را با بهینه‌ترین مسیر و رمزگذاری انتقال می‌دهد.'
        : 'ZEV utilizes Agora Real-Time Communication (RTC) mesh relays across 200+ edge points worldwide with adaptive bitrate scaling and AI-assisted noise reduction.',
    },
    {
      q: isFa ? 'آیا استفاده از زو رایگان است؟' : 'Is ZEV free to use?',
      a: isFa
        ? 'بله، تمامی بخش‌های اصلی زو از جمله استودیو ریلز، تماس‌های تصویری و صوتی HD نامحدود، چت رمزگذاری‌شده و وب اپلیکیشن ۱۰۰٪ رایگان و بدون هزینه پنهان است.'
        : 'Yes, ZEV is 100% free with unlimited 60fps Reels, high-definition video and voice calling, encrypted messaging, and desktop web access.',
    },
    {
      q: isFa ? 'ارتباط زو با اکادمی صفی و صافی‌پی چیست؟' : 'What is ZEV’s integration with Safi Academy and SafiPay?',
      a: isFa
        ? 'زو توسط صاحب گروپ و شاهین صافی توسعه یافته و پایگاه داده مشترک با اکادمی صفی دارد. دانشجویان اکادمی می‌توانند بدون نیاز به ثبت‌نام مجدد وارد زو شوند.'
        : 'ZEV is built by Sahib Group and shares a unified database with Safi Academy and SafiPay, allowing hundreds of thousands of learners to authenticate instantly via SSO.',
    },
    {
      q: isFa ? 'حریم خصوصی و داده‌های کاربران چگونه محافظت می‌شود؟' : 'How does ZEV protect user privacy and personal data?',
      a: isFa
        ? 'زو اطلاعات کاربران را به هیچ شرکت واسطه‌ای نمی‌فروشد. ارتباطات با TLS 1.3 رمزگذاری می‌شوند و اثر انگشت یا فیس‌آیدی صرفاً روی تراشه امنیتی گوشی شما پردازش می‌شود.'
        : 'ZEV has a strict zero-data-brokering policy. All communications use TLS 1.3 in transit, and biometric authentication remains isolated inside the device Secure Enclave.',
    },
    {
      q: isFa ? 'چگونه تیک آبی و تایید هویت رسمی دریافت کنم؟' : 'How can I get the official verified blue badge?',
      a: isFa
        ? 'تولیدکنندگان محتوا، اساتید، تریدرها و چهره‌های فعال می‌توانند از بخش پروفایل درخواست تایید هویت دهند. فارغ‌التحصیلان برتر اکادمی صفی تیک را به صورت خودکار دریافت می‌کنند.'
        : 'Active creators, instructors, analysts, and public figures can apply for verification directly within their profile settings. Top Safi Academy graduates receive priority verification.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#07090E', color: '#CBD5E1', overflow: 'hidden' }}>
      {/* 6-Engine Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ======================================================== */}
      {/* 1. HERO SECTION (REDESIGNED LUXURY DARK TECH)            */}
      {/* ======================================================== */}
      <section
        style={{
          position: 'relative',
          padding: '40px 0 90px',
          overflow: 'hidden',
        }}
      >
        {/* Glow ambient backdrops */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(83, 109, 254, 0.08) 50%, transparent 80%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 50,
              alignItems: 'center',
            }}
          >
            {/* Left Hero Content */}
            <div>
              {/* Live Google Play Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 16px',
                  borderRadius: 24,
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1.5px solid rgba(0, 212, 255, 0.35)',
                  boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)',
                  marginBottom: 24,
                }}
              >
                <GooglePlayIcon size={18} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#00D4FF',
                    letterSpacing: 0.5,
                  }}
                >
                  {isFa ? 'نسخه ۲.۴ رسمی در گوگل پلی استور منتشر شد' : 'ZEV 2.4 IS LIVE ON GOOGLE PLAY'}
                </span>
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontSize: 'clamp(34px, 5vw, 58px)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  marginBottom: 20,
                }}
              >
                {isFa ? (
                  <>
                    نسل جدید شبکه اجتماعی پیشرفته با{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      نهایت سرعت
                    </span>{' '}
                    و آزادی ارتباط
                  </>
                ) : (
                  <>
                    The Next-Gen Social Network Engineered for{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Pure Performance
                    </span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 17.5,
                  color: '#94A3B8',
                  lineHeight: 1.65,
                  marginBottom: 36,
                  maxWidth: 580,
                }}
              >
                {isFa
                  ? 'ریلزهای فوق‌روان ۶۰ فریم، تماس‌های صوتی و تصویری HD استودیویی با تاخیر زیر ۴۰۰ میلی‌ثانیه، امنیت بانکی و دیتابیس یکپارچه با اکادمی صفی و صافی‌پی.'
                  : 'Experience silk-smooth 60fps Reels, studio HD voice and video calling powered by sub-400ms Agora RTC, and bank-grade privacy — all within a single unified Flutter engine.'}
              </p>

              {/* Hero Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 16,
                  alignItems: 'center',
                  marginBottom: 38,
                }}
              >
                {/* 1. Official Google Play Store Button */}
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 26px',
                    borderRadius: 18,
                    background: '#00D4FF',
                    color: '#07090E',
                    fontSize: 15,
                    fontWeight: 900,
                    textDecoration: 'none',
                    boxShadow: '0 8px 28px rgba(0, 212, 255, 0.4), 0 0 20px rgba(0, 212, 255, 0.2)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <GooglePlayIcon size={22} />
                  <span>{isFa ? 'نصب از گوگل پلی استور' : 'Get on Google Play'}</span>
                </a>

                {/* 2. Launch Instant Web App */}
                <a
                  href={webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 24px',
                    borderRadius: 18,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Globe size={18} color="#00D4FF" />
                  <span>{isFa ? 'اجرای وب اپلیکیشن' : 'Launch Web App'}</span>
                </a>

                {/* 3. Direct APK fallback */}
                <a
                  href={directApkUrl}
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    color: '#64748B',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    borderRadius: 12,
                    transition: 'color 0.2s',
                  }}
                >
                  <Smartphone size={15} />
                  <span>{isFa ? 'دانلود مستقیم APK' : 'Direct APK (v2.4)'}</span>
                </a>
              </div>

              {/* Social Proof Stats Bar */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 24,
                  paddingTop: 24,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>12,800+</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{isFa ? 'سازندگان فعال' : 'Active Creators'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#00D4FF' }}>4.9 ★</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{isFa ? 'امتیاز گوگل پلی' : 'Play Store Rating'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#536DFE' }}>&lt;400ms</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{isFa ? 'تاخیر تماس RTC' : 'RTC Call Latency'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>200+</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{isFa ? 'گره‌های جهانی Edge' : 'Global Edge Nodes'}</div>
                </div>
              </div>
            </div>

            {/* Right Hero Phone Showcase with Shot 1 (Reels) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Outer phone shell */}
              <div
                style={{
                  position: 'relative',
                  width: 310,
                  height: 630,
                  borderRadius: 48,
                  background: '#000000',
                  border: '10px solid #141C2B',
                  boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 212, 255, 0.25)',
                  overflow: 'hidden',
                }}
              >
                {/* Dynamic speaker pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 96,
                    height: 20,
                    background: '#0B0F19',
                    borderRadius: 12,
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#1E293B',
                      marginRight: 8,
                    }}
                  />
                  <div
                    style={{
                      width: 36,
                      height: 4,
                      borderRadius: 2,
                      background: '#1E293B',
                    }}
                  />
                </div>

                {/* Screenshot 1 (Reels) */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src="/app-shots/1.jpeg"
                    alt="ZEV Reels 60fps Experience"
                    fill
                    sizes="310px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>

              {/* Floating Pill 1 (Top Left) */}
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  left: isFa ? 'auto' : -24,
                  right: isFa ? -24 : 'auto',
                  background: 'rgba(8, 13, 26, 0.92)',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                  backdropFilter: 'blur(14px)',
                  padding: '10px 16px',
                  borderRadius: 18,
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  zIndex: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'rgba(0, 212, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00D4FF',
                  }}
                >
                  <Video size={17} />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: '#FFFFFF' }}>60fps Ultra Fluid</div>
                  <div style={{ fontSize: 10.5, color: '#94A3B8' }}>Hardware Accelerated</div>
                </div>
              </div>

              {/* Floating Pill 2 (Bottom Right) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 60,
                  right: isFa ? 'auto' : -20,
                  left: isFa ? -20 : 'auto',
                  background: 'rgba(8, 13, 26, 0.92)',
                  border: '1px solid rgba(83, 109, 254, 0.4)',
                  backdropFilter: 'blur(14px)',
                  padding: '10px 16px',
                  borderRadius: 18,
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  zIndex: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: 'rgba(83, 109, 254, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#536DFE',
                  }}
                >
                  <PhoneCall size={17} />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: '#FFFFFF' }}>Sub-400ms RTC Call</div>
                  <div style={{ fontSize: 10.5, color: '#94A3B8' }}>Studio HD Voice & Video</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LIVE INTERFACE SHOWCASE (REAL APP SHOTS 1 TO 6)       */}
      {/* ======================================================== */}
      <AppShowcase locale={locale} />

      {/* ======================================================== */}
      {/* 3. BENTO GRID ARCHITECTURE (6 CORE TECH PILLARS)         */}
      {/* ======================================================== */}
      <section
        id="features"
        style={{
          padding: '100px 0',
          backgroundColor: '#090D15',
          position: 'relative',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
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
              <Zap size={14} color="#00D4FF" />
              <span style={{ fontSize: 12.5, fontWeight: 800, color: '#00D4FF' }}>
                {isFa ? 'معماری فنی و مهندسی سیستم' : 'TECHNICAL ARCHITECTURE'}
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: 14,
              }}
            >
              {isFa
                ? 'شش ستون قدرت پلتفرم زِو برای میلیون‌ها کاربر'
                : 'Six Pillars of Next-Gen Social Engineering'}
            </h2>

            <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6 }}>
              {isFa
                ? 'ترکیب پردازش سخت‌افزاری فلاتر با شبکه لحظه‌ای Agora RTC و رمزگذاری بدون تسامح برای محافظت از آزادی کاربران.'
                : 'Combining GPU-accelerated Flutter rendering with Agora RTC global edge routing and uncompromising cryptographic privacy.'}
            </p>
          </div>

          {/* Bento Grid layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 24,
            }}
          >
            {bentoFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 28,
                    padding: '36px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: `rgba(0, 212, 255, 0.1)`,
                          border: `1px solid rgba(0, 212, 255, 0.3)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: feat.accent,
                        }}
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#64748B',
                          letterSpacing: 0.5,
                        }}
                      >
                        {feat.tag}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: '#FFFFFF',
                        marginBottom: 10,
                        lineHeight: 1.3,
                      }}
                    >
                      {feat.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 14.5,
                        color: '#94A3B8',
                        lineHeight: 1.65,
                        marginBottom: 20,
                      }}
                    >
                      {feat.desc}
                    </p>
                  </div>

                  {/* Thumbnail snippet */}
                  <div
                    style={{
                      position: 'relative',
                      height: 140,
                      borderRadius: 16,
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      sizes="340px"
                      style={{ objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(7, 9, 14, 0.95) 100%)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SAFI ECOSYSTEM INTEGRATION                            */}
      {/* ======================================================== */}
      <EcosystemSection locale={locale} dict={dict} />

      {/* ======================================================== */}
      {/* 5. TEAM & LEADERSHIP HIERARCHY                           */}
      {/* ======================================================== */}
      <TeamSection locale={locale} dict={dict} />

      {/* ======================================================== */}
      {/* 6. GLOBAL EDGE NETWORK STATS                             */}
      {/* ======================================================== */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, #07090E 0%, #090D15 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 32,
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#00D4FF', marginBottom: 4 }}>
                &lt;50ms
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
                {isFa ? 'تاخیر لایه لبه (Edge Latency)' : 'Edge Routing Latency'}
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>
                {isFa ? 'کابل، دبی، فرانکفورت و سنگاپور' : 'Direct POPs in Kabul, Dubai & Frankfurt'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#536DFE', marginBottom: 4 }}>
                99.99%
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
                {isFa ? 'پایداری شبکه (SLA Uptime)' : 'Cluster Availability'}
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>
                {isFa ? 'معماری چندناحیه‌ای ضد اختلال' : 'Multi-zone failure tolerance'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#00D4FF', marginBottom: 4 }}>
                100%
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
                {isFa ? 'پردازش امنیتی محلی' : 'On-Device Biometrics'}
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>
                {isFa ? 'عدم ارسال اثر انگشت به سرور' : 'Zero biometric cloud storage'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#536DFE', marginBottom: 4 }}>
                0$
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
                {isFa ? 'رایگان برای همیشه' : 'Free Forever'}
              </div>
              <div style={{ fontSize: 13, color: '#64748B' }}>
                {isFa ? 'بدون اشتراک پنهان یا تبلیغات آزاردهنده' : 'No subscription fees or paywalls'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ANSWER ENGINE OPTIMIZATION (AEO) FAQ ACCORDION        */}
      {/* ======================================================== */}
      <section
        id="faq"
        style={{
          padding: '100px 0',
          backgroundColor: '#07090E',
        }}
      >
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 20,
                background: 'rgba(0, 212, 255, 0.08)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                marginBottom: 14,
              }}
            >
              <HelpCircle size={14} color="#00D4FF" />
              <span style={{ fontSize: 12.5, fontWeight: 800, color: '#00D4FF' }}>
                {isFa ? 'پرسش‌های متداول و موتور پاسخ' : 'ANSWER ENGINE OPTIMIZATION (AEO)'}
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              {isFa ? 'پاسخ مستقیم به مهم‌ترین سوالات کاربران' : 'Frequently Asked Questions'}
            </h2>
            <p style={{ fontSize: 16, color: '#94A3B8' }}>
              {isFa
                ? 'پاسخ‌های دقیق، شفاف و مستند درباره دانلود، امنیت و امکانات شبکه زِو.'
                : 'Direct, authoritative answers formatted for search engines and user clarity.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 20,
                  padding: '24px 28px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ color: '#00D4FF' }}>Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: '#94A3B8',
                    lineHeight: 1.65,
                    paddingLeft: isFa ? 0 : 26,
                    paddingRight: isFa ? 26 : 0,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. GRAND DOWNLOAD CTA (GOOGLE PLAY + WEB APP)            */}
      {/* ======================================================== */}
      <section
        id="download"
        style={{
          padding: '80px 0 120px',
          backgroundColor: '#07090E',
          position: 'relative',
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.14) 0%, rgba(83, 109, 254, 0.14) 100%)',
              border: '1.5px solid #00D4FF',
              borderRadius: 36,
              padding: '60px clamp(24px, 5vw, 64px)',
              textAlign: 'center',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 212, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 20,
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(0, 212, 255, 0.4)',
                marginBottom: 20,
              }}
            >
              <GooglePlayIcon size={20} />
              <span style={{ fontSize: 13.5, fontWeight: 800, color: '#00D4FF' }}>
                {isFa ? 'دانلود نسخه رسمی ۲.۴' : 'OFFICIAL RELEASE 2.4 ON GOOGLE PLAY'}
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(30px, 4.5vw, 48px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              {isFa
                ? 'همین حالا به جمع سازندگان نسل آینده زِو بپیوندید'
                : 'Join the Next Generation of Global Social Networking'}
            </h2>

            <p
              style={{
                fontSize: 17,
                color: '#CBD5E1',
                lineHeight: 1.6,
                maxWidth: 620,
                margin: '0 auto 36px',
              }}
            >
              {isFa
                ? 'اپلیکیشن زو را مستقیماً از گوگل پلی استور دانلود کنید یا نسخه وب را بلافاصله بدون نیاز به نصب در مرورگر کامپیوتر خود اجرا نمایید.'
                : 'Install ZEV directly from the Google Play Store on Android, or launch the lightning-fast web client in your desktop browser.'}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 16,
                marginBottom: 30,
              }}
            >
              {/* Primary Google Play Download Button */}
              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 32px',
                  borderRadius: 20,
                  background: '#00D4FF',
                  color: '#07090E',
                  fontSize: 16,
                  fontWeight: 900,
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0, 212, 255, 0.45)',
                  transition: 'all 0.25s ease',
                }}
              >
                <GooglePlayIcon size={24} />
                <span>{isFa ? 'دریافت از گوگل پلی' : 'Get on Google Play'}</span>
              </a>

              {/* Web App Launch Button */}
              <a
                href={webAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '16px 28px',
                  borderRadius: 20,
                  background: 'rgba(13, 18, 30, 0.85)',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <Globe size={20} color="#00D4FF" />
                <span>{isFa ? 'ورود به وب اپلیکیشن' : 'Launch Web App'}</span>
              </a>

              {/* Direct APK Download Button */}
              <a
                href={directApkUrl}
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 24px',
                  borderRadius: 20,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94A3B8',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <Smartphone size={18} />
                <span>{isFa ? 'دانلود مستقیم APK' : 'Direct APK'}</span>
              </a>
            </div>

            {/* Cryptographic Security Note */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#94A3B8',
              }}
            >
              <ShieldCheck size={16} color="#00D4FF" />
              <span>
                {isFa
                  ? 'بسته‌های دانلودی با امضای امنیتی SHA-256 و تاییدیه Google Play Protect ارائه می‌شوند.'
                  : 'Packages are cryptographically signed and verified by Google Play Protect.'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
