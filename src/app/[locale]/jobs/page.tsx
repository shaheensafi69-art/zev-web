import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Globe,
  Heart,
  Laptop,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
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
    ? 'فرصت‌های شغلی و استخدام در زو (ZEV Careers) | شرکت صاحب گروپ'
    : 'Careers at ZEV | Join Sahib Group Engineering & Design';

  const description = isFa
    ? 'فرصت‌های شغلی فعال در تیم مهندسی زو (ZEV): استخدام معمار ارشد فلاتر، مهندس زیرساخت RTC ویدیو، توسعه‌دهنده بک‌اند ابری و لید دیزاین سیستم. کار بر روی فناوری‌های نوین در محیطی بین‌المللی.'
    : 'Join the engineering and design elite behind ZEV Social Network. Open roles in Flutter architecture, WebRTC video calling, cloud backend, and product design at Sahib Group.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/jobs`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Careers',
      'ZEV Jobs',
      'Sahib Group Hiring',
      'Flutter Developer Job',
      'WebRTC Engineer Job',
      'Shaheen Safi Careers',
      'Remote Tech Jobs',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/jobs`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/jobs`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'Careers at ZEV & Sahib Group',
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

export default async function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const openPositions = [
    {
      title: isFa ? 'معمار ارشد فلاتر (Senior Flutter Architect)' : 'Senior Flutter Universal Architect',
      type: isFa ? 'تمام وقت • دورکاری / هیبرید' : 'Full-time • Remote / Hybrid',
      location: isFa ? 'کابل / دبی / ریموت' : 'Kabul / Dubai / Remote',
      desc: isFa
        ? 'رهبری پایگاه کد یکپارچه فلاتر برای موبایل و وب، بهینه‌سازی رندرینگ سخت‌افزاری ۶۰ فریم و خطوط لوله کش ویدیو.'
        : 'Lead our unified Flutter engine across mobile and web. Optimize GPU shaders and zero-stutter 60fps video caching.',
    },
    {
      title: isFa ? 'مهندس ارشد زیرساخت RTC و ویدیو (WebRTC / Agora RTC)' : 'Senior RTC Video Infrastructure Engineer',
      type: isFa ? 'تمام وقت • ریموت بین‌المللی' : 'Full-time • Global Remote',
      location: isFa ? 'جهانی (ریموت)' : 'Global Remote',
      desc: isFa
        ? 'توسعه و بهینه‌سازی تماس‌های ویدیویی استودیویی، کاهش تاخیر به زیر ۴۰۰ میلی‌ثانیه و فشرده‌سازی تطبیقی.'
        : 'Build and tune sub-400ms low-latency Agora RTC video and voice mesh pipelines with AI noise reduction.',
    },
    {
      title: isFa ? 'توسعه‌دهنده ارشد بک‌اند ابری (Cloud Backend & Security)' : 'Senior Cloud Backend & Security Engineer',
      type: isFa ? 'تمام وقت • ریموت' : 'Full-time • Remote',
      location: isFa ? 'دبی / فرانکفورت / ریموت' : 'Dubai / Frankfurt / Remote',
      desc: isFa
        ? 'معماری مایکروسرویس‌های توزیع‌شده با Go و Node.js، رمزگذاری TLS 1.3 و هماهنگی دیتابیس با اکوسیستم صفی.'
        : 'Architect high-throughput Go microservices, TLS 1.3 cryptographic layers, and shared Safi Ecosystem persistence.',
    },
    {
      title: isFa ? 'لید موشن و دیزاین سیستم (Lead UI/UX & Motion)' : 'Lead UI/UX & Motion Design Specialist',
      type: isFa ? 'تمام وقت • ریموت' : 'Full-time • Remote',
      location: isFa ? 'جهانی (ریموت)' : 'Global Remote',
      desc: isFa
        ? 'خلق تجربیات کاربری لوکس، انیمیشن‌های روان و استانداردهای بصری مدرن برای اپلیکیشن و وب‌سایت زو.'
        : 'Craft luxury dark-tech mobile and desktop interfaces, micro-interactions, and consistent cross-platform guidelines.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemPage',
        name: isFa ? 'فرصت‌های شغلی زو' : 'ZEV Careers',
        url: `https://zevapp.com/${locale}/jobs`,
      },
      ...openPositions.map((pos) => ({
        '@type': 'JobPosting',
        title: pos.title,
        description: pos.desc,
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'Sahib Group (ZEV)',
          url: 'https://zevapp.com',
        },
        jobLocationType: 'TELECOMMUTE',
      })),
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I apply for a software engineering job at ZEV?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Send your CV, GitHub portfolio, and cover note directly to careers@zevapp.com with the position title in the subject line.',
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
            <Briefcase size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'فرصت‌های همکاری و استخدام' : 'CAREERS AT ZEV'}
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
            {isFa ? 'در ساخت آینده فناوری با ما همراه شوید' : 'Build the Future of Social Technology'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'تیم مهندسی صاحب گروپ همواره در جستجوی نخبگان برنامه‌نویسی و معماران بااستعداد برای خلق ارزش‌های ماندگار است.'
              : 'Join an agile, mission-driven team engineering high-throughput social systems, sub-400ms RTC pipelines, and universal Flutter applications.'}
          </p>
        </div>

        {/* Job Listings */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {openPositions.map((job, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 24,
                padding: '30px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, color: '#FFFFFF' }}>{job.title}</h3>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      background: 'rgba(0, 212, 255, 0.1)',
                      color: '#00D4FF',
                      border: '1px solid rgba(0, 212, 255, 0.25)',
                      padding: '4px 10px',
                      borderRadius: 10,
                    }}
                  >
                    {job.type}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#94A3B8',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '4px 10px',
                      borderRadius: 10,
                    }}
                  >
                    {job.location}
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.65 }}>{job.desc}</p>

              <div style={{ paddingTop: 8 }}>
                <a
                  href={`mailto:careers@zevapp.com?subject=Application:%20${encodeURIComponent(job.title)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13.5,
                    fontWeight: 800,
                    color: '#00D4FF',
                    textDecoration: 'none',
                  }}
                >
                  <span>{isFa ? 'ارسال رزومه برای این موقعیت' : 'Apply for this role'}</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Apply General Box */}
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
            {isFa ? 'رزومه آزاد و همکاری عمومی' : 'General Engineering Inquiries'}
          </h3>
          <p style={{ fontSize: 14.5, color: '#94A3B8', marginBottom: 20 }}>
            {isFa
              ? 'اگر مهارتی دارید که فکر می‌کنید می‌تواند زو را قدرتمندتر کند، رزومه و نمونه‌کارهای خود را به آدرس زیر بفرستید.'
              : 'Passionate about high-concurrency systems? Send your CV and GitHub links to careers@zevapp.com.'}
          </p>
          <a
            href="mailto:careers@zevapp.com"
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
            <span>careers@zevapp.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
