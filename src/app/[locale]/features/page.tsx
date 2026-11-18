import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Video,
  Flame,
  Lock,
  Monitor,
  Star,
  ShieldCheck,
  Zap,
  Globe,
  MessageCircle,
  Fingerprint,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  ExternalLink,
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
    ? 'ویژگی‌ها و معماری فنی زو (ZEV) | ریلز ۶۰ فریم، تماس تصویری RTC و رمزگذاری'
    : 'ZEV Core Features & Architecture | 60fps Reels, Sub-400ms RTC & E2EE';

  const description = isFa
    ? 'بررسی کامل معماری فنی شبکه اجتماعی زو (ZEV): پخش ریلز ۶۰ فریم، تماس ویدیویی HD با تاخیر زیر ۴۰۰ میلی‌ثانیه بر بستر Agora، رمزگذاری TLS 1.3، قفل بیومتریک و موتور فلاتر.'
    : 'Explore ZEV technical architecture: 60fps hardware-accelerated Reels, sub-400ms Agora RTC video calling, TLS 1.3 encryption, on-device biometric security, and universal Flutter engine.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/features`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Features',
      'ZEV 60fps Reels',
      'ZEV Video Call Agora RTC',
      'Sub-400ms Calling',
      'Encrypted Messaging ZEV',
      'Flutter Web App',
      'Biometric App Lock',
      'Safi Ecosystem SSO',
      'Next-Gen Social Network',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/features`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/features`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/6.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV 60fps Reels and Sub-400ms RTC Video Calling',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/app-shots/6.jpeg'],
      creator: '@shaheensafi09',
      site: '@zevapp',
    },
  };
}

export default async function FeaturesPage({
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
        '@type': 'SoftwareApplication',
        name: 'ZEV Social Network',
        applicationCategory: 'SocialNetworkingApplication',
        operatingSystem: 'Android, iOS, Web Browser',
        featureList: [
          '60fps Hardware-Accelerated Reels Player',
          'Sub-400ms Agora RTC Video and Voice Calling',
          'End-to-End Cryptographic Direct Messaging',
          'On-Device Secure Enclave Biometrics & PIN Lock',
          'Universal Cross-Platform Flutter Architecture',
          'Unified Single Sign-On with Safi Academy & SafiPay',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does ZEV deliver steady 60fps Reels?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV employs GPU-accelerated video decoders, optimized Impeller shaders in Flutter, and predictive chunk caching so reels play instantly with zero stutter.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does ZEV HD Video Calling function in low-bandwidth regions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Using Agora RTC mesh relays and adaptive video bitrates, ZEV dynamically adjusts resolution between 720p and 1080p while preserving audio clarity even on 3G networks.',
            },
          },
        ],
      },
    ],
  };

  const detailedFeatures = [
    {
      title: isFa ? 'استودیو پیشرفته ریلز ۶۰ فریم' : '60fps Hardware-Accelerated Reels Studio',
      badge: isFa ? 'قابلیت پرچمدار' : 'Flagship Engine',
      icon: Video,
      accent: '#00D4FF',
      image: '/app-shots/1.jpeg',
      desc: isFa
        ? 'سیستم فشرده‌سازی و پخش فوق‌سریع برای ویدیوهای عمودی با کیفیت فول اچ‌دی بدون افت فریم حتی روی سرعت‌های معمولی اینترنت.'
        : 'Smooth 60fps vertical short-form video streaming engine with optimized hardware decoders, real-time audio sync, and zero buffering.',
      bullets: [
        isFa ? 'دسته‌بندی موضوعی هوشمند (ترید، برنامه‌نویسی، آموزش، انگیزه)' : 'Smart topic categorization (Trading, Coding, Education, Motivation)',
        isFa ? 'کتابخانه کامل آهنگ‌ها و صداهای ترند جهانی' : 'Vibrant library of trending sounds and local cultural audio',
        isFa ? 'ابزارهای برش دقیق، زیرنویس خودکار و برچسب‌های تعاملی' : 'Precision trim tools, captions, and interactive stickers',
      ],
    },
    {
      title: isFa ? 'تماس صوتی و تصویری HD با تاخیر زیر ۴۰۰ میلی‌ثانیه' : 'Sub-400ms Studio RTC Video Calling',
      badge: isFa ? 'ارتباط زنده' : 'Real-Time RTC',
      icon: PhoneCall,
      accent: '#536DFE',
      image: '/app-shots/6.jpeg',
      desc: isFa
        ? 'برقراری تماس تصویری و صوتی همزمان با بالاترین پایداری بر بستر بیش از ۲۰۰ گره Agora RTC با فناوری هوشمند حذف نویز محیطی.'
        : 'Crystal-clear 1080p video and studio voice calls with sub-400ms latency across 200+ global edge relay nodes, complete with background AI noise cancellation.',
      bullets: [
        isFa ? 'تاخیر فوق‌العاده پایین زیر ۴۰۰ میلی‌ثانیه در سطح جهان' : 'Ultra-low sub-400ms worldwide latency',
        isFa ? 'سازگاری هوشمند با نوسانات سرعت اینترنت و ۳G' : 'Adaptive bitrate scaling preventing dropouts on weak networks',
        isFa ? 'رمزگذاری کامل جریان صدا و تصویر بدون شنود واسط' : 'End-to-end encrypted audio and video payloads',
      ],
    },
    {
      title: isFa ? 'فید هوشمند، اکسپلور و استوری ۲۴ ساعته' : 'Dynamic Feed, Explore & Ephemeral Stories',
      badge: isFa ? 'تعامل روزمره' : 'Daily Social Hub',
      icon: Flame,
      accent: '#00D4FF',
      image: '/app-shots/3.jpeg',
      desc: isFa
        ? 'الگوریتم شفاف و بدون سانسور کاذب که محتوای دوستان و سازندگان مورد علاقه شما را به صورت دقیق و زمانی نمایش می‌دهد.'
        : 'Chronological and interest-driven feed architecture connecting creators, friends, and active members without opaque black-box shadowbans.',
      bullets: [
        isFa ? 'استوری‌های ۲۴ ساعته با قابلیت ریپلای خصوصی' : '24-hour disappearing stories with private DM replies',
        isFa ? 'صفحه اکسپلور با فیلترهای ترند، کاربران و ریلزها' : 'Unified search and explore for users, hashtags, and posts',
        isFa ? 'تعامل آنی، لایک، کامنت و بازنشر لحظه‌ای' : 'Sub-second real-time likes, threaded comments, and reposts',
      ],
    },
    {
      title: isFa ? 'معماری چندپلتفرمه فلاتر (Flutter Universal Engine)' : 'Cross-Platform Flutter Universal Engine',
      badge: isFa ? 'فناوری مدرن' : 'Modern Tech Stack',
      icon: Monitor,
      accent: '#536DFE',
      image: '/app-shots/2.jpeg',
      desc: isFa
        ? 'یک پایگاه کد مدرن که همزمان تجربه روان نیتیو را روی اندروید، آیفون، نسخه وب zevapp.com و ویندوز/مک ارائه می‌کند.'
        : 'Single unified Flutter codebase delivering identical 60fps fluid interfaces across Android, iOS, Web browsers at zevapp.com, and desktop PCs.',
      bullets: [
        isFa ? 'ورود مستقیم از طریق وب در کامپیوتر بدون نیاز به شبیه‌ساز' : 'Instant browser access at zevapp.com with zero installation',
        isFa ? 'همگام‌سازی لحظه‌ای نشست‌ها و پیام‌ها در تمام پلتفرم‌ها' : 'Instant cross-device message and feed state synchronization',
        isFa ? 'مصرف بهینه باتری و رم دستگاه با رندرینگ سخت‌افزاری' : 'Optimized GPU-accelerated rendering and low memory footprint',
      ],
    },
    {
      title: isFa ? 'امنیت بانکی، رمزگذاری TLS 1.3 و قفل بیومتریک' : 'Bank-Grade Security & On-Device Biometrics',
      badge: isFa ? 'حریم خصوصی مطلق' : 'Privacy First',
      icon: Lock,
      accent: '#00D4FF',
      image: '/app-shots/5.jpeg',
      desc: isFa
        ? 'پایبندی به استانداردهای بین‌المللی حفظ حریم خصوصی؛ پردازش اثر انگشت و فیس‌آیدی ۱۰۰٪ روی سخت‌افزار دستگاه شما.'
        : 'Enterprise cryptography with TLS 1.3 in transit and AES-256 at rest. Biometrics remain sealed within your device Secure Enclave.',
      bullets: [
        isFa ? 'قفل ورود درون‌برنامه‌ای با پین‌کد ۴ رقمی اختصاصی' : 'Optional 4-digit in-app security PIN code',
        isFa ? 'عدم ارسال یا ذخیره هیچ‌گونه داده بیومتریک روی سرور' : 'Zero biometric data transmitted or stored in the cloud',
        isFa ? 'امکان حذف کامل و آنی حساب کاربری و تمام فایل‌ها' : 'Self-serve instantaneous permanent account erasure',
      ],
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
            <Sparkles size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'قابلیت‌ها و توانمندی‌های سیستم' : 'Architectural Excellence'}
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
              ? 'امکانات نسل بعدی زِو؛ فراتر از یک شبکه اجتماعی ساده'
              : 'Built for High Throughput, Privacy & Global Scale'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'طراحی شده با برترین فناوری‌های روز دنیا؛ از ریلزهای ۶۰ فریم بدون توقف تا ارتباط ویدیویی استودیویی و امنیت بیومتریک.'
              : 'Engineered from scratch using Flutter universal graphics, Agora RTC mesh relays, and bank-grade cryptographic standards.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 28 }}>
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
              <span>{isFa ? 'دانلود نسخه گوگل پلی' : 'Get on Google Play'}</span>
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
              <span>{isFa ? 'اجرای وب اپلیکیشن' : 'Launch Web App'}</span>
            </a>
          </div>
        </div>

        {/* Features Vertical Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginBottom: 80 }}>
          {detailedFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 32,
                  padding: '40px clamp(20px, 4vw, 48px)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 40,
                  alignItems: 'center',
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Content Side */}
                <div style={{ order: isEven ? 1 : 2 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 14px',
                      borderRadius: 12,
                      background: 'rgba(0, 212, 255, 0.1)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      marginBottom: 16,
                      fontSize: 12.5,
                      fontWeight: 800,
                      color: feat.accent,
                    }}
                  >
                    <Icon size={16} />
                    <span>{feat.badge}</span>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(24px, 3.5vw, 34px)',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      marginBottom: 12,
                      lineHeight: 1.25,
                    }}
                  >
                    {feat.title}
                  </h2>

                  <p
                    style={{
                      fontSize: 15.5,
                      color: '#94A3B8',
                      lineHeight: 1.7,
                      marginBottom: 24,
                    }}
                  >
                    {feat.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {feat.bullets.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          fontSize: 14,
                          color: '#E2E8F0',
                        }}
                      >
                        <CheckCircle2 size={17} color="#00D4FF" style={{ flexShrink: 0 }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screenshot Frame Side */}
                <div
                  style={{
                    order: isEven ? 2 : 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: 265,
                      height: 565,
                      borderRadius: 36,
                      overflow: 'hidden',
                      background: '#020408',
                      border: '6px solid #141C2B',
                      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 212, 255, 0.15)',
                    }}
                  >
                    {/* Top Speaker Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 70,
                        height: 14,
                        background: '#0B0F19',
                        borderRadius: 8,
                        zIndex: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#1E293B',
                          marginRight: 6,
                        }}
                      />
                      <div
                        style={{
                          width: 26,
                          height: 3,
                          borderRadius: 2,
                          background: '#1E293B',
                        }}
                      />
                    </div>

                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image
                        src={feat.image}
                        alt={feat.title}
                        fill
                        sizes="265px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Answer Engine Section (AEO) */}
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 16,
                background: 'rgba(0, 212, 255, 0.08)',
                marginBottom: 10,
              }}
            >
              <HelpCircle size={15} color="#00D4FF" />
              <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
                {isFa ? 'پرسش‌های متداول فنی' : 'Technical Specifications FAQ'}
              </span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF' }}>
              {isFa ? 'اطلاعات تخصصی موتور و رندرینگ زِو' : 'Architecture & Performance Insights'}
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
                {isFa ? 'آیا ریلز زو با سرعت‌های پایین اینترنت کار می‌کند؟' : 'Does ZEV Reels buffer on low internet speeds?'}
              </h4>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                {isFa
                  ? 'بله، زو از الگوریتم فشرده‌سازی تطبیقی H.264/H.265 و بارگذاری هوشمند تکه‌ای استفاده می‌کند تا ویدیوها حتی با اینترنت‌های نسل سوم (3G) بدون توقف پخش شوند.'
                  : 'Yes. ZEV integrates adaptive H.264/H.265 compression and multi-segment progressive chunk pre-fetching, allowing uninterrupted video streaming even on 3G cellular connections.'}
              </p>
            </div>

            <div
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 20,
                padding: '22px 26px',
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                {isFa ? 'چگونه داده‌های پیام‌رسان محافظت می‌شوند؟' : 'How are messages safeguarded against interception?'}
              </h4>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                {isFa
                  ? 'تمامی پیام‌ها، تصاویر و ویس‌ها با پروتکل TLS 1.3 و کلیدهای رمزنگاری پیشرفته در حال انتقال محافظت می‌شوند و هیچ شخص ثالثی امکان استراق سمع محتوا را نخواهد داشت.'
                  : 'All chat packets, voice memos, and media are encrypted in transit via TLS 1.3 with forward secrecy, preventing ISP or man-in-the-middle eavesdropping.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
