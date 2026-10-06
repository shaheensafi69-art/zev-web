'use client';

import React, { use } from 'react';
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
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';
import { TeamSection } from '@/components/TeamSection';

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

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
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FC466B')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
        >
          {isFa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isFa ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
        </Link>

        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 50px' }}>
          <div className="badge-pill">
            <Heart size={14} />
            <span>{isFa ? 'داستان پیدایش، رسالت و تیم رهبری' : 'Our Story, Mission & Leadership'}</span>
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
            {isFa ? 'درباره زو (ZEV): رسالت ما و رهبری' : 'About ZEV: Our Vision & Leadership'}
          </h1>

          <p style={{ fontSize: 18, color: '#94A3B8', lineHeight: 1.75 }}>
            {isFa
              ? 'پلتفرمی مستقل، پرسرعت و مدرن که از دل افغانستان جوانه زد تا بستری آزاد، امن و سرافراز برای خلاقیت جوانان و اتصال پایدار با جامعه بین‌المللی باشد.'
              : 'An independent, high-velocity social network originating from Afghanistan to connect minds, inspire creators, and demonstrate world-class software engineering globally.'}
          </p>
        </div>

        {/* Founder Story Banner Card (White / Pink Box) */}
        <div
          className="pink-box"
          style={{
            padding: '48px 40px',
            borderRadius: 36,
            background: 'rgba(13, 18, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: 60,
            boxShadow: '0 12px 35px rgba(252, 70, 107, 0.1)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#FC466B',
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '6px 14px',
                  borderRadius: 999,
                  marginBottom: 16,
                }}
              >
                <Sparkles size={14} />
                <span>{isFa ? 'نگاه بنیادین بنیان‌گذار' : 'Founder Perspective'}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 18 }}>
                {isFa
                  ? 'ساخته شده با افتخار توسط افغان‌ها؛ گشوده به روی تمام دنیا'
                  : 'Engineered with Pride by Afghans; Open to the World'}
              </h2>

              <p style={{ fontSize: 16, color: '#CBD5E1', lineHeight: 1.8, marginBottom: 16 }}>
                {isFa
                  ? 'مهندس شاهین صفی، دایرکتور و بنیان‌گذار اکوسیستم بین‌المللی صفی (شامل اکادمی صفی و صافی‌پی)، با یک رسالت شفاف اپلیکیشن زو را خلق کرد: اثبات این حقیقت که جوانان و متخصصان افغان توانایی رقابت با غول‌های فناوری دنیا مانند اینستاگرام و تیک‌تاک را دارند و می‌توانند پلتفرمی با کیفیتی بی‌همتا ارائه کنند.'
                  : 'Shaheen Safi, Director & Founder of the Safi Ecosystem (including Safi Academy and SafiPay), engineered ZEV with an uncompromising conviction: proving that Afghan software architects possess the technological mastery to build social networks rivaling Silicon Valley giants.'}
              </p>

              <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.8, marginBottom: 24 }}>
                {isFa
                  ? 'زو بر پایه دیتابیس مشترک با اکادمی صفی ساخته شده تا جامعه آموزشی و کارآفرینی افغانستان مستقیماً به بستری برای ارتباط تصویری، استوری و اشتراک‌گذاری ایده‌ها مجهز گردد.'
                  : 'Interconnected with Safi Academy’s cloud infrastructure, ZEV equips hundreds of thousands of learners and creators with a secure visual platform for authentic growth.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <a
                  href="https://web.zevapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: 14 }}
                >
                  <Globe size={16} />
                  <span>{dict.nav.openWebApp}</span>
                </a>
                <a
                  href="https://safiacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '12px 24px', fontSize: 14 }}
                >
                  <Building2 size={16} />
                  <span>safiacademy.org</span>
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 480,
                  aspectRatio: '16 / 10',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 15px 40px rgba(252, 70, 107, 0.2)',
                  background: 'rgba(13, 18, 30, 0.75)',
                }}
              >
                <Image
                  src="/screenshots/banner-1024x500.jpg"
                  alt="ZEV Banner"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars (White Cards with Pink Borders) */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
              {isFa ? 'ارزش‌ها و استانداردهای بنیادین ما' : 'Our Core Architectural Values'}
            </h2>
            <p style={{ fontSize: 16, color: '#94A3B8' }}>
              {isFa
                ? 'پایبندی به بالاترین اصول امنیت، حریم خصوصی و تجربه کاربری در تمام نسخه‌های زو'
                : 'Upholding strict benchmarks of privacy, responsiveness, and user empowerment.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="pink-box"
                  style={{
                    padding: '28px 24px',
                    borderRadius: 24,
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 6px 20px rgba(252, 70, 107, 0.08)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 14,
                      background: '#FC466B',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                      boxShadow: '0 6px 18px rgba(252, 70, 107, 0.3)',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TEAM & LEADERSHIP SECTION - MOVED EXCLUSIVELY TO ABOUT PAGE */}
        <div style={{ marginTop: 20 }}>
          <TeamSection locale={locale} dict={dict} />
        </div>
      </div>
    </div>
  );
}
