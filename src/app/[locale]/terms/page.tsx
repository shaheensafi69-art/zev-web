import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Gavel,
  CheckSquare,
  Scale,
  ShieldAlert,
  AlertTriangle,
  Mail,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  UserCheck,
  Ban,
  Sparkles,
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
    ? 'شرایط و قوانین استفاده از زو (ZEV Terms of Service) | تعهدات و حقوق کاربران'
    : 'ZEV Terms of Service | Acceptable Use Policy & Community Standards';

  const description = isFa
    ? 'شرایط و ضوابط رسمی استفاده از شبکه اجتماعی زو (ZEV): استانداردهای پذیرش محتوا، حقوق مالکیت معنوی، عدم تحمل هرزنامه و آزار، حساب‌های کاربری مشترک و قوانین بین‌المللی صاحب گروپ.'
    : 'Official ZEV Terms of Service: Acceptable use guidelines, intellectual property protection, zero tolerance for harassment, and user rights governed by Sahib Group.';

  const languageAlternates: Record<string, string> = {};
  for (const l of locales) {
    languageAlternates[l] = `https://zevapp.com/${l}/terms`;
  }

  return {
    title,
    description,
    keywords: [
      'ZEV Terms of Service',
      'ZEV Acceptable Use',
      'ZEV Community Guidelines',
      'Sahib Group Legal',
      'User Agreement ZEV',
    ],
    alternates: {
      canonical: `https://zevapp.com/${locale}/terms`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `https://zevapp.com/${locale}/terms`,
      siteName: 'ZEV',
      locale,
      images: [
        {
          url: '/app-shots/8.jpeg',
          width: 1200,
          height: 630,
          alt: 'ZEV Terms of Service & User Rights',
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

export default async function TermsPage({
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
        '@type': 'DigitalDocument',
        name: isFa ? 'شرایط استفاده از خدمات زو' : 'ZEV Terms of Service',
        url: `https://zevapp.com/${locale}/terms`,
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
            name: 'What content is prohibited on ZEV?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'ZEV strictly prohibits child exploitation (CSAM), hate speech, violent extremism, illegal scams, malicious impersonation, and non-consensual sharing of intimate media.',
            },
          },
        ],
      },
    ],
  };

  const sections = [
    {
      icon: UserCheck,
      title: isFa ? '۱. پذیرش شرایط و صلاحیت عضویت' : '1. Acceptance & Eligibility',
      content: isFa
        ? 'با ثبت‌نام، ورود یا استفاده از اپلیکیشن و وب‌سایت زو (ZEV)، شما تایید می‌کنید که حداقل ۱۳ سال سن داشته و متعهد به رعایت این توافق‌نامه و قوانین بین‌المللی جرایم سایبری می‌باشید.'
        : 'By accessing or creating an account on ZEV, you affirm that you are at least 13 years of age and agree to be bound by these Terms of Service and applicable international cybersecurity laws.',
    },
    {
      icon: Ban,
      title: isFa ? '۲. رفتارهای غیرمجاز و عدم تحمل نقض قوانین' : '2. Prohibited Conduct & Zero Tolerance',
      content: isFa
        ? 'زو هرگونه سوءاستفاده، آزار کلامی، کلاهبرداری، هرزنامه، محتوای غیراخلاقی هرزه‌نگاری کودکان (CSAM) یا ترویج خشونت را با مسدودسازی فوری و ارجاع به مراجع بین‌المللی برخورد می‌کند.'
        : 'We maintain zero tolerance for harassment, child sexual exploitation, hate speech, financial fraud, unauthorized spam bots, and unlawful impersonation. Violators are subject to immediate permanent termination.',
    },
    {
      icon: FileText,
      title: isFa ? '۳. مالکیت معنوی و حقوق سازندگان' : '3. Intellectual Property Rights',
      content: isFa
        ? 'حقوق مالکیت معنوی تمام ویدیوها، ریلزها و محتواهایی که بارگذاری می‌کنید متعلق به خود شماست. شما صرفاً مجوز نمایش فنی و پخش به سایر کاربران را به پلتفرم اعطا می‌نمایید.'
        : 'You retain full ownership of the reels, photos, and media you publish. You grant ZEV a non-exclusive license to encode, cache, and transmit your media to your designated audience.',
    },
    {
      icon: Scale,
      title: isFa ? '۴. مسئولیت محتوا و استانداردهای اجتماعی' : '4. Content Responsibility',
      content: isFa
        ? 'کاربران شخصاً مسئول محتوای ارسال‌شده در فید یا پیام‌ها می‌باشند. زو حق بازبینی و حذف محتوای گزارش‌شده توسط ابزارهای نظارت خودکار و انسانی را برای خود محفوظ می‌دارد.'
        : 'Users bear sole legal responsibility for their distributed content. ZEV reserves the right to review, quarantine, or delete reported media violating community integrity.',
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
            <Gavel size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'قوانین و استانداردهای پلتفرم' : 'TERMS & ACCEPTABLE USE'}
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
            {isFa ? 'شرایط و قوانین استفاده از خدمات زِو' : 'ZEV Terms of Service'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'تعهدات متقابل کاربران و شرکت صاحب گروپ جهت ایجاد فضایی امن، اخلاقی و پرسرعت برای ارتباطات سازنده.'
              : 'Our acceptable use policies and mutual commitments ensuring a safe, civil, and high-performance community.'}
          </p>
        </div>

        {/* Terms Sections */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
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

        {/* Legal Contact */}
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
            {isFa ? 'امور حقوقی و دعاوی قانونی' : 'Legal Affairs & Compliance'}
          </h3>
          <p style={{ fontSize: 14.5, color: '#94A3B8', marginBottom: 18 }}>
            {isFa
              ? 'جهت گزارش نقض کپی‌رایت، ارسال اخطاریه DMCA یا درخواست‌های حقوقی با ایمیل حقوقی در ارتباط باشید.'
              : 'Direct DMCA copyright infringement notices and formal compliance inquiries to legal@zevapp.com.'}
          </p>
          <a
            href="mailto:legal@zevapp.com"
            style={{
              color: '#00D4FF',
              fontWeight: 800,
              fontSize: 15,
              textDecoration: 'none',
            }}
          >
            legal@zevapp.com
          </a>
        </div>
      </div>
    </div>
  );
}
