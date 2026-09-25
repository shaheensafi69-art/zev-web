'use client';

import React, { use } from 'react';
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
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const detailedFeatures = [
    {
      title: isFa ? 'استودیو پیشرفته ریلز ۶۰ فریم' : 'High-Performance 60fps Reels Studio',
      badge: isFa ? 'قابلیت شاخص' : 'Flagship Feature',
      icon: Video,
      color: '#FC466B',
      image: '/screenshots/1.png',
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
      title: isFa ? 'فید هوشمند، اکسپلور و استوری ۲۴ ساعته' : 'Dynamic Feed, Explore & Ephemeral Stories',
      badge: isFa ? 'ارتباط روزمره' : 'Daily Social Hub',
      icon: Flame,
      color: '#FC466B',
      image: '/screenshots/2.jpg',
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
      badge: isFa ? 'فناوری روز' : 'Modern Tech Stack',
      icon: Monitor,
      color: '#FC466B',
      image: '/screenshots/3.jpg',
      desc: isFa
        ? 'یک پایگاه کد مدرن که همزمان تجربه روان نیتیو را روی اندروید، آیفون، نسخه وب web.zevapp.com و ویندوز/مک ارائه می‌کند.'
        : 'Single unified Flutter codebase delivering identical 60fps fluid interfaces across Android, iOS, Web browsers at web.zevapp.com, and desktop PCs.',
      bullets: [
        isFa ? 'ورود مستقیم از طریق وب در کامپیوتر بدون نیاز به شبیه‌ساز' : 'Instant browser access at web.zevapp.com with zero installation',
        isFa ? 'همگام‌سازی لحظه‌ای نشست‌ها و پیام‌ها در تمام پلتفرم‌ها' : 'Instant cross-device message and feed state synchronization',
        isFa ? 'مصرف بهینه باتری و رم دستگاه با رندرینگ سخت‌افزاری' : 'Optimized GPU-accelerated rendering and low memory footprint',
      ],
    },
    {
      title: isFa ? 'امنیت بانکی، رمزگذاری TLS 1.3 و قفل بیومتریک' : 'Bank-Grade Security & On-Device Biometrics',
      badge: isFa ? 'حریم خصوصی مطلق' : 'Privacy First',
      icon: Lock,
      color: '#FC466B',
      image: '/screenshots/55.jpeg',
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
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 60px' }}>
          <div className="badge-pill">
            <Sparkles size={14} />
            <span>{isFa ? 'تمام قابلیت‌ها و امکانات فنی زو' : 'Comprehensive Feature Suite'}</span>
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
            {isFa ? 'طراحی شده برای نهایت کیفیت، امنیت و سرعت' : 'Engineered for Performance, Privacy & Reach'}
          </h1>

          <p style={{ fontSize: 18, color: '#334155', lineHeight: 1.7 }}>
            {isFa
              ? 'در زو، هر پیکسل و هر خط کد با وسواس بالا پیاده‌سازی شده تا نسل جدید شبکه‌های اجتماعی را به دستان شما برساند.'
              : 'Discover how ZEV combines modern Flutter rendering, cloud video transcoding, and bank-grade privacy into an unmatched social experience.'}
          </p>
        </div>

        {/* Detailed Feature Blocks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {detailedFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const isEven = idx % 2 === 1;
            return (
              <div
                key={idx}
                className="pink-box"
                style={{
                  padding: '44px 36px',
                  borderRadius: 32,
                  border: '1.5px solid rgba(252, 70, 107, 0.35)',
                  background: '#FFF7F9',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 40,
                  alignItems: 'center',
                  boxShadow: '0 10px 30px rgba(252, 70, 107, 0.08)',
                }}
              >
                {/* Content Side */}
                <div style={{ order: isEven && !isFa ? 2 : 1 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: '#FC466B',
                      background: '#FFFFFF',
                      border: '1px solid rgba(252, 70, 107, 0.35)',
                      padding: '5px 14px',
                      borderRadius: 999,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={14} />
                    <span>{feat.badge}</span>
                  </span>

                  <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 900, color: '#000000', marginBottom: 14 }}>
                    {feat.title}
                  </h2>

                  <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.75, marginBottom: 24 }}>
                    {feat.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {feat.bullets.map((b, bIdx) => (
                      <div key={bIdx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: '#FC466B',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 11,
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </div>
                        <span style={{ fontSize: 15, color: '#1E293B', fontWeight: 600 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Screenshot Visual Side */}
                <div
                  style={{
                    order: isEven && !isFa ? 1 : 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: 320,
                      aspectRatio: '9 / 16',
                      borderRadius: 28,
                      overflow: 'hidden',
                      border: '2px solid rgba(252, 70, 107, 0.4)',
                      boxShadow: '0 15px 40px rgba(252, 70, 107, 0.2)',
                      background: '#FFFFFF',
                    }}
                  >
                    <Image src={feat.image} alt={feat.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner (Pink Box) */}
        <div
          className="pink-box"
          style={{
            marginTop: 60,
            padding: '48px 36px',
            borderRadius: 30,
            background: '#FFF1F4',
            border: '1.5px solid rgba(252, 70, 107, 0.4)',
            textAlign: 'center',
            boxShadow: '0 12px 35px rgba(252, 70, 107, 0.1)',
          }}
        >
          <h3 style={{ fontSize: 28, fontWeight: 900, color: '#000000', marginBottom: 12 }}>
            {isFa ? 'تجربه این امکانات در دستان شماست' : 'Ready to Experience Next-Gen Social Networking?'}
          </h3>
          <p style={{ fontSize: 16, color: '#334155', maxWidth: 580, margin: '0 auto 28px' }}>
            {isFa
              ? 'همین حالا از طریق نسخه وب یا دانلود برنامه وارد دنیای پرهیجان زو شوید.'
              : 'Launch ZEV directly in your desktop browser or download for Android & iOS.'}
          </p>
          <a
            href="https://web.zevapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: 15 }}
          >
            <Globe size={18} />
            <span>{dict.nav.openWebApp}</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
