'use client';

import React, { use } from 'react';
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
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function JobsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isFa = isRtlLocale(locale);

  const perks = [
    {
      icon: Laptop,
      title: isFa ? 'دورکاری و ساعات کاری منعطف' : 'Remote-First Flexibility',
      desc: isFa
        ? 'آزادی انتخاب محل کار از هر نقطه جهان با ساعات شناور و تمرکز بر خروجی باکیفیت.'
        : 'Work from anywhere with asynchronous workflows and complete autonomy.',
    },
    {
      icon: Zap,
      title: isFa ? 'فناوری‌های پیشرو روز' : 'Bleeding-Edge Tech Stack',
      desc: isFa
        ? 'کار با آخرین فناوری‌های مهندسی فلاتر، وب‌آسمبلی، موتورهای بلادرنگ آگورا و پستگرس ابری.'
        : 'Build with Flutter WebAssembly, Agora RTC low-latency media, and Supabase clusters.',
    },
    {
      icon: TrendingUp,
      title: isFa ? 'پاداش و سهام رشد پروژه' : 'Competitive Pay & Growth',
      desc: isFa
        ? 'حقوق رقابتی بین‌المللی همراه با پاداش‌های فصلی و سهیم بودن در رشد سریع اکوسیستم صفی.'
        : 'Competitive compensation packages, merit-based bonuses, and long-term equity options.',
    },
    {
      icon: Heart,
      title: isFa ? 'فرهنگ سلامت روان و رشد فردی' : 'Wellness & Personal Growth',
      desc: isFa
        ? 'حمایت از یادگیری مستمر، بودجه خرید تجهیزات پیشرفته کاری و مرخصی‌های با حقوق.'
        : 'Continuous learning stipends, top-tier hardware allowances, and paid time off.',
    },
  ];

  const openings = [
    {
      title: isFa
        ? 'مهندس ارشد فلاتر و سیستم‌های بلادرنگ (Senior Flutter & RTC Engineer)'
        : 'Senior Flutter & Real-Time RTC Engineer',
      department: isFa ? 'تیم مهندسی کلاینت' : 'Client Engineering',
      location: isFa ? 'دورکاری (جهانی) / دبی' : 'Remote (Worldwide) / Dubai',
      type: isFa ? 'تمام‌وقت' : 'Full-time',
      desc: isFa
        ? 'توسعه و بهینه‌سازی کلاینت فلاتر روی موبایل و وب، انکودینگ ویدیویی ۳۰ فریم، تاخیر زیر ۴۰۰ میلی‌ثانیه برای لایو و ویدیو کال.'
        : 'Lead architecture of Flutter mobile and web clients, optimizing 60fps UI, sub-400ms Agora RTC streaming, and adaptive dual-stream pipelines.',
    },
    {
      title: isFa
        ? 'معمار ارشد بک‌اند و پایگاه داده توزیع‌شده (Principal Backend Architect)'
        : 'Principal Backend & Distributed Database Architect',
      department: isFa ? 'تیم زیرساخت ابری' : 'Cloud Infrastructure',
      location: isFa ? 'دورکاری (جهانی)' : 'Remote (Worldwide)',
      type: isFa ? 'تمام‌وقت' : 'Full-time',
      desc: isFa
        ? 'طراحی و مدیریت پایگاه داده مشترک پستگرس و Supabase، قوانین امنیتی RLS، بهینه‌سازی کوئری‌های میلیونی و سیستم‌های پوش نوتیفیکیشن.'
        : 'Scale high-throughput Supabase/PostgreSQL clusters, implement military-grade RLS policies, and maintain FCM push microservices.',
    },
    {
      title: isFa
        ? 'متخصص امنیت محتوا و هوش مصنوعی (Trust, Safety & AI Integrity)'
        : 'Trust, Safety & AI Content Moderation Specialist',
      department: isFa ? 'اعتماد و امنیت' : 'Trust & Safety',
      location: isFa ? 'دورکاری (جهانی)' : 'Remote (Worldwide)',
      type: isFa ? 'تمام‌وقت' : 'Full-time',
      desc: isFa
        ? 'توسعه الگوریتم‌های تشخیص خودکار تخلف، جلوگیری از آسیب به کودکان (CSAM)، پالایش هوشمند نظرات و پایبندی به استانداردهای بین‌المللی.'
        : 'Drive automated trust heuristics, proactive child safety compliance, anti-spam enforcement, and transparent community moderation.',
    },
    {
      title: isFa
        ? 'طراح ارشد تجربه کاربری و محصول (Lead Product & Visual Designer)'
        : 'Lead Product & UI/UX Designer',
      department: isFa ? 'طراحی محصول' : 'Product Design',
      location: isFa ? 'دورکاری (جهانی)' : 'Remote (Worldwide)',
      type: isFa ? 'تمام‌وقت' : 'Full-time',
      desc: isFa
        ? 'خلق سیستم دیزاین مدرن کلیرمورفیک برای وب و اپلیکیشن، انیمیشن‌های روان ۶۰ فریم و رابط‌های کاربری جذاب برای ریلز و استوری.'
        : 'Define next-generation clearmorphic design systems across mobile and desktop, crafting silky 60fps micro-interactions.',
    },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#07090E' }}>
      {/* 6-Tier JSON-LD Schema (SEO, GEO, AIO, AEO, XEO, XIO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Careers at ZEV - Join the Next-Gen Social Network',
            url: `https://zevapp.com/${locale}/jobs`,
            description:
              'Explore engineering, design, and growth career opportunities at ZEV Social Network (Sahib Group). Remote-first, competitive global compensation.',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Are ZEV positions remote or on-site?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ZEV is a remote-first organization. Most engineering, design, and operations roles offer full global remote flexibility.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I apply for a role at ZEV?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Candidates can send their CV, portfolio, and GitHub profile directly to careers@zevapp.com with the target role in the subject line.',
                  },
                },
              ],
            },
          }),
        }}
      />

      <div className="container">
        {/* Top Back Navigation */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#00D4FF',
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 36,
            textDecoration: 'none',
          }}
        >
          {isFa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isFa ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
        </Link>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 30,
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              color: '#00D4FF',
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 20,
              letterSpacing: '0.3px',
            }}
          >
            <Briefcase size={15} />
            <span>{isFa ? 'فرصت‌های شغلی و همکاری در ZEV' : 'Careers & Opportunities at ZEV'}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: '-0.8px',
            }}
          >
            {isFa ? 'آینده شبکه‌های اجتماعی را با ما بسازید' : 'Build the Future of Social Networking'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: '#94A3B8',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            {isFa
              ? 'ما در زو تیمی از نخبه‌ترین مهندسان و طراحان هستیم که شبکه‌ای پرسرعت، امن و جهانی را با افتخار برای میلیون‌ها انسان خلق می‌کنیم.'
              : 'Join a world-class team of passionate engineers and creative visionaries creating a lightning-fast, privacy-first social platform for global communities.'}
          </p>
        </div>

        {/* Perks & Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 22,
            marginBottom: 80,
          }}
        >
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                style={{
                  padding: '28px 24px',
                  borderRadius: 22,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: 'rgba(0, 212, 255, 0.12)',
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
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Open Positions */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <Briefcase size={22} color="#00D4FF" />
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {isFa ? 'موقعیت‌های شغلی فعال' : 'Open Positions'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {openings.map((job, i) => (
              <div
                key={i}
                style={{
                  padding: '30px 32px',
                  borderRadius: 24,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 20,
                }}
              >
                <div style={{ maxWidth: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: 12,
                        background: 'rgba(0, 212, 255, 0.12)',
                        border: '1px solid rgba(0, 212, 255, 0.25)',
                        color: '#00D4FF',
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {job.department}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#94A3B8' }}>
                      <MapPin size={14} color="#64748B" />
                      {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#94A3B8' }}>
                      <Clock size={14} color="#64748B" />
                      {job.type}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 10, lineHeight: 1.35 }}>
                    {job.title}
                  </h3>

                  <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                    {job.desc}
                  </p>
                </div>

                <a
                  href={`mailto:careers@zevapp.com?subject=Application for ${encodeURIComponent(job.title)}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
                    color: '#080D1A',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    alignSelf: 'center',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 20px rgba(0, 212, 255, 0.2)',
                  }}
                >
                  <span>{isFa ? 'ارسال رزومه' : 'Apply Now'}</span>
                  {isFa ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* General Application Callout */}
        <div
          style={{
            padding: '36px 40px',
            borderRadius: 26,
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(83, 109, 254, 0.08) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
              {isFa ? 'نقش مورد نظر شما در لیست نیست؟' : 'Don’t see your exact role?'}
            </div>
            <p style={{ color: '#94A3B8', fontSize: 14.5, margin: 0, maxWidth: 640 }}>
              {isFa
                ? 'ما همواره مشتاق همکاری با استعدادهای درخشان مهندسی و خلاق هستیم. رزومه و نمونه کارهای خود را برای ما ایمیل کنید.'
                : 'We are always looking for exceptional engineers, researchers, and creators. Send your open application and portfolio directly to us.'}
            </p>
          </div>

          <a
            href="mailto:careers@zevapp.com?subject=Open Application for ZEV"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
              color: '#080D1A',
              fontSize: 15,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0, 212, 255, 0.25)',
            }}
          >
            <Mail size={18} />
            <span>careers@zevapp.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
