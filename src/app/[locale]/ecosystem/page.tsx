'use client';

import React, { use } from 'react';
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
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';
import { EcosystemSection } from '@/components/EcosystemSection';

export default function EcosystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#FFFFFF' }}>
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
            color: '#475569',
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
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 50px' }}>
          <div className="badge-pill">
            <Layers size={14} />
            <span>{isFa ? 'اکوسیستم بین‌المللی صفی' : 'Global Safi Ecosystem'}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 50px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 18,
              color: '#000000',
            }}
          >
            {isFa
              ? 'همگرایی فناوری، آموزش، فین‌تک و شبکه اجتماعی'
              : 'Convergence of Education, Global Fintech & Social Innovation'}
          </h1>

          <p style={{ fontSize: 18, color: '#334155', lineHeight: 1.75 }}>
            {isFa
              ? 'پلتفرم زو (ZEV) پیوندی استوار با اکادمی صفی و صافی‌پی دارد؛ یک اکوسیستم جامع و یکپارچه با پایگاه داده مشترک برای پیشرفت جوانان، دانشجویان و کارآفرینان در سراسر دنیا.'
              : 'ZEV is seamlessly interconnected with Safi Academy and SafiPay under a unified database infrastructure. A digital powerhouse empowering students, traders, coders, and creators worldwide.'}
          </p>
        </div>

        {/* Architectural Deep-Dive Card (Pink Box) */}
        <div
          className="pink-box"
          style={{
            padding: '44px 36px',
            borderRadius: 32,
            border: '1.5px solid rgba(252, 70, 107, 0.4)',
            background: '#FFF1F4',
            marginBottom: 60,
            boxShadow: '0 12px 35px rgba(252, 70, 107, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: '#FC466B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 6px 18px rgba(252, 70, 107, 0.35)',
              }}
            >
              <Database size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: '#000000' }}>
                {isFa ? 'معماری دیتابیس مشترک: اکادمی صفی و زو' : 'Shared Single Database Architecture: Safi Academy & ZEV'}
              </h2>
              <div style={{ fontSize: 13, color: '#FC466B', fontWeight: 800 }}>
                Powered by Enterprise Supabase Cloud Backend
              </div>
            </div>
          </div>

          <p style={{ fontSize: 16, color: '#1E293B', lineHeight: 1.8, marginBottom: 24 }}>
            {isFa
              ? 'یکی از دستاوردهای مهندسی مهم اکوسیستم صفی، یکپارچه‌سازی پایگاه داده مرکزی است. هر حسابی که در اکادمی صفی ایجاد شده باشد (شامل صدها هزار دانشجو، استاد و تحلیل‌گر)، به صورت خودکار و بدون نیاز به ثبت‌نام مجدد در زو معتبر است. به این ترتیب:'
              : 'A core architectural breakthrough of the Safi engineering team is unified database federation. Accounts provisioned on Safi Academy (encompassing hundreds of thousands of students, instructors, and analysts) are valid across ZEV instantly without redundant signups:'}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            <div
              style={{
                padding: 22,
                borderRadius: 20,
                background: '#FFFFFF',
                border: '1.5px solid rgba(252, 70, 107, 0.3)',
                boxShadow: '0 4px 15px rgba(252, 70, 107, 0.08)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 16, color: '#FC466B', marginBottom: 8 }}>
                {isFa ? '۱. ورود یکپارچه (Single Sign-On)' : '1. Seamless Single Sign-On'}
              </div>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0 }}>
                {isFa
                  ? 'یک نام کاربری و رمز عبور برای ورود به دوره آموزشی در اکادمی صفی، ورود به نسخه وب زو و اپلیکیشن موبایل.'
                  : 'A single set of credentials grants instant entry across Safi Academy courses, ZEV mobile, and zevapp.com desktop.'}
              </p>
            </div>

            <div
              style={{
                padding: 22,
                borderRadius: 20,
                background: '#FFFFFF',
                border: '1.5px solid rgba(252, 70, 107, 0.3)',
                boxShadow: '0 4px 15px rgba(252, 70, 107, 0.08)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 16, color: '#FC466B', marginBottom: 8 }}>
                {isFa ? '۲. همگام‌سازی نشان‌های تایید' : '2. Synchronized Verification Badges'}
              </div>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0 }}>
                {isFa
                  ? 'اساتید و دانشجویان ممتاز در اکادمی صفی بلافاصله در زو تیک و نشان Creator یا Verified دریافت می‌کنند.'
                  : 'Distinguished instructors and graduated scholars automatically receive Creator badges in the ZEV feed.'}
              </p>
            </div>

            <div
              style={{
                padding: 22,
                borderRadius: 20,
                background: '#FFFFFF',
                border: '1.5px solid rgba(252, 70, 107, 0.3)',
                boxShadow: '0 4px 15px rgba(252, 70, 107, 0.08)',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 16, color: '#FC466B', marginBottom: 8 }}>
                {isFa ? '۳. پرداخت و کسب درآمد از صافی‌پی' : '3. Monetization via SafiPay'}
              </div>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0 }}>
                {isFa
                  ? 'تولیدکنندگان محتوا و اساتیدی که در زو ریلز آموزشی می‌گذارند، درآمد خود را مستقیماً در کیف پول صافی‌پی دریافت می‌کنند.'
                  : 'Educators publishing premium tips on ZEV receive monetization rewards routed directly through SafiPay wallets.'}
              </p>
            </div>
          </div>
        </div>

        {/* Complete Ecosystem Section */}
        <EcosystemSection locale={locale} dict={dict} />
      </div>
    </div>
  );
}
