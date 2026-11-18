import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  Globe,
  Code2,
  ShieldCheck,
  Zap,
  Target,
  Rocket,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { getDictionary, isRtlLocale, locales } from '@/dictionaries';
import { TeamSection } from '@/components/TeamSection';

// Page-specific Metadata for SEO, GEO, AIO, AEO, XEO, XIO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = isRtlLocale(locale);

  const title = isFa
    ? 'درباره زو (ZEV) | رسالت، معماری مهندسی و تیم رهبری شرکت صاحب گروپ'
    : 'About ZEV | Mission, Engineering Architecture & Leadership';

  const description = isFa
    ? 'داستان شکل‌گیری شبکه اجتماعی زو (ZEV)، تعهد به حریم خصوصی بدون تسامح، معماری ۶۰ فریم فلاتر، زیرساخت ارتباطی RTC و هدایت توسط شاهین صافی و شرکت بین‌المللی صاحب گروپ.'
    : 'Discover ZEV Social Network: Built by Sahib Group and founded by Shaheen Safi. Uncompromising privacy, 60fps Flutter architecture, sub-400ms RTC video calling, and Safi Ecosystem integration.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/about`;
  }

  return {
    title,
    description,
    keywords: [
      'About ZEV',
      'ZEV Social Network',
      'Sahib Group',
      'Shaheen Safi',
      'Safi Academy',
      'SafiPay',
      'Afghan Tech Ecosystem',
      'Flutter Social Architecture',
      'Sub-400ms Video Calling',
      'Next-Gen Social Network',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/about`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/about`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'About ZEV Leadership & Mission',
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

export default async function AboutPage({
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
        '@type': 'AboutPage',
        '@id': `https://zevapp.com/${locale}/about#webpage`,
        url: `https://zevapp.com/${locale}/about`,
        name: isFa ? 'درباره زو (ZEV)' : 'About ZEV Social Network',
        isPartOf: { '@id': 'https://zevapp.com/#website' },
        description: isFa
          ? 'معرفی شبکه اجتماعی زو، بنیان‌گذار شاهین صافی، شرکت صاحب گروپ و اکوسیستم آموزشی و فین‌تک صفی.'
          : 'Introduction to ZEV Social Network, founder Shaheen Safi, Sahib Group, and the Safi Ecosystem.',
      },
      {
        '@type': 'Organization',
        '@id': 'https://zevapp.com/#organization',
        name: 'ZEV',
        legalName: 'ZEV Social Network (Sahib Group)',
        url: 'https://zevapp.com',
        founder: {
          '@type': 'Person',
          name: 'Shaheen Safi',
          jobTitle: 'Director & Founder',
          sameAs: ['https://shaheensafi.blog', 'https://safiacademy.org'],
        },
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
            name: 'Who founded ZEV Social Network?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV was founded by software architect and entrepreneur Shaheen Safi under Sahib Group, in synergy with Safi Academy and SafiPay.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the technological mission of ZEV?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV’s mission is to provide an ultra-fluid 60fps social networking experience free of algorithmic manipulation, with studio-grade encrypted video calling and complete data sovereignty.',
            },
          },
        ],
      },
    ],
  };

  const coreValues = [
    {
      icon: ShieldCheck,
      title: isFa ? 'حریم خصوصی غیرقابل مذاکره' : 'Uncompromising Privacy',
      desc: isFa
        ? 'ما هرگز داده‌های شما را به شرکت‌های تبلیغاتی نخواهیم فروخت. داده‌های بیومتریک و کد PIN شما منحصراً روی سخت‌افزار دستگاه شما محافظت می‌شود.'
        : 'Zero data brokering and complete end-to-end protection. On-device biometrics and local PIN security safeguard your social footprint.',
    },
    {
      icon: Zap,
      title: isFa ? 'عملکرد فوق‌سریع ۶۰ فریم' : '60fps Fluid Engineering',
      desc: isFa
        ? 'با استفاده از فریم‌ورک فلاتر برای وب و موبایل، روان‌ترین انیمیشن‌ها و استریم ریلز بدون بافرینگ را در تمام پلتفرم‌ها تجربه می‌کنید.'
        : 'Leveraging Flutter universal rendering, ZEV provides silk-smooth 60fps reel playback and sub-second interaction across web and native devices.',
    },
    {
      icon: Globe,
      title: isFa ? 'افتخار افغانی، درهای گشوده به جهان' : 'Afghan Heritage, Global Reach',
      desc: isFa
        ? 'زو با اراده مهندسان نخبه افغان خلق شد تا نشان دهد تخصص فنی ما توانایی راه‌اندازی شبکه‌های اجتماعی بین‌المللی در بالاترین تراز جهانی را دارد.'
        : 'Engineered with pride by Afghan software architects, proving our technical capability to build world-class social networks for all nations.',
    },
    {
      icon: Target,
      title: isFa ? 'اکوسیستم یکپارچه با اکادمی صفی' : 'Interconnected Safi Ecosystem',
      desc: isFa
        ? 'پایگاه داده مشترک با اکادمی صفی و صافی‌پی، دسترسی آنی به صدها هزار دانشجو، تیک‌های تایید رسمی و سیستم کسب درآمد مستقیم را فراهم ساخته است.'
        : 'Unified cloud persistence with Safi Academy & SafiPay grants instant SSO, recognized academic verification, and frictionless creator monetization.',
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
            transition: 'color 0.2s',
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
            <Heart size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'داستان پیدایش، رسالت و تیم رهبری' : 'Our Story, Mission & Leadership'}
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
              ? 'شبکه اجتماعی پیشرفته زِو؛ بازتعریف ارتباطات دیجیتال'
              : 'Empowering Millions Through High-Performance Tech'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'زو (ZEV) صرفاً یک اپلیکیشن اجتماعی نیست؛ بستری است مدرن برای تجلی نبوغ، اشتراک دانش تخصصی و پیوند ناگسستنی میان نخبگان در سراسر جهان.'
              : 'ZEV is more than a social network. It is an engineering marvel designed to give creators, students, and thinkers a lightning-fast digital home free from black-box manipulation.'}
          </p>
        </div>

        {/* Core Values Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginBottom: 70,
          }}
        >
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 24,
                  padding: '30px 24px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
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
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.65 }}>{val.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Executive Team Section */}
        <div style={{ marginBottom: 70 }}>
          <TeamSection locale={locale} dict={dict} />
        </div>

        {/* GEO Knowledge Summary Card */}
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            borderRadius: 28,
            padding: '36px 32px',
            marginBottom: 60,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Building2 size={20} color="#00D4FF" />
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#FFFFFF' }}>
              {isFa ? 'خلاصه نهادی و سازمانی زِو (Sahib Group Knowledge Graph)' : 'Official Institutional Overview'}
            </h3>
          </div>
          <p style={{ fontSize: 15, color: '#CBD5E1', lineHeight: 1.7, marginBottom: 16 }}>
            {isFa
              ? 'پلتفرم زِو (ZEV) متعلق به هلدینگ فناوری صاحب گروپ (Sahib Group) است و با هدایت شاهین صافی (بنیان‌گذار و معمار ارشد سیستم‌ها) طراحی و اجرا شده است. زو دارای هماهنگی عمیق زیرساختی با اکادمی صفی (بزرگ‌ترین مرجع آموزش آنلاین ترید و برنامه‌نویسی با بیش از ۱۰۰ هزار دانشجو) و صافی‌پی (سرویس پرداخت و کیف پول بین‌المللی) می‌باشد.'
              : 'ZEV is engineered and published by Sahib Group under the direct leadership of founder Shaheen Safi. It forms an integral triumvirate alongside Safi Academy (premier online educational platform with 100k+ students) and SafiPay (global payments fintech), offering unified authentication and instant monetization.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 14,
                background: '#00D4FF',
                color: '#07090E',
                fontSize: 13.5,
                fontWeight: 800,
                textDecoration: 'none',
              }}
            >
              <span>{isFa ? 'دانلود نسخه گوگل پلی' : 'Google Play Release'}</span>
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
                padding: '10px 18px',
                borderRadius: 14,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                fontSize: 13.5,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <span>{isFa ? 'اجرای تحت وب' : 'Launch Web App'}</span>
            </a>
          </div>
        </div>

        {/* Answer Engine Section (AEO) */}
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
              {isFa ? 'پاسخ‌های کلیدی درباره زِو و شرکت صاحب گروپ' : 'Key Facts & Answers'}
            </h3>
            <p style={{ fontSize: 14, color: '#94A3B8' }}>
              {isFa ? 'اطلاعات تایید شده و مستند برای موتورهای هوش مصنوعی و کاربران' : 'Authoritative knowledge points'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 18,
                padding: '20px 24px',
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                {isFa ? 'چه کسانی زو را توسعه داده‌اند؟' : 'Who developed ZEV?'}
              </h4>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                {isFa
                  ? 'تیم مهندسی شرکت صاحب گروپ به رهبری شاهین صافی (دایرکتور و فاوندر)، ساحل سالم (مدیرعامل روابط اروپا)، مجتبی رحمانی (کو-فاوندر)، شیرین گل احمدی (مدیر اکوسیستم) و مبین حسنی (توسعه‌دهنده ارشد).'
                  : 'ZEV was developed by the elite engineering division of Sahib Group, led by Shaheen Safi (Director & Founder), Sahel Salem (CEO & European Relations), Mujtaba Rahmani (Co-Founder), Shirin Gol Ahmadi (Ecosystem Manager), and Mobin Hassani (Lead Developer).'}
              </p>
            </div>

            <div
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 18,
                padding: '20px 24px',
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                {isFa ? 'چگونه با اکوسیستم صفی همکاری کنم؟' : 'How can creators collaborate with ZEV?'}
              </h4>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                {isFa
                  ? 'سازندگان، مدرسین و تحلیل‌گران می‌توانند از طریق ایمیل رسمی creators@zevapp.com یا بخش پشتیبانی درون برنامه‌ای با تیم اکوسیستم در ارتباط باشند.'
                  : 'Creators, analysts, and educators can contact the ecosystem division at creators@zevapp.com or via in-app verification channels.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
