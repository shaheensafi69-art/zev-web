'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Video,
  PhoneCall,
  Compass,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { isRtlLocale } from '@/dictionaries';

interface AppShowcaseProps {
  locale: string;
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({ locale }) => {
  const isFa = isRtlLocale(locale);
  const [activeTab, setActiveTab] = useState<number>(0);

  const showcaseItems = [
    {
      id: 0,
      title: isFa ? 'استودیو ریلز ۶۰ فریم' : '60fps Ultra-Fluid Reels',
      subtitle: isFa ? 'پخش بدون افت فریم با صدای همگام' : 'Hardware-accelerated vertical playback',
      category: isFa ? 'قابلیت شاخص' : 'Flagship Engine',
      image: '/app-shots/1.jpeg',
      icon: Video,
      accent: '#00D4FF',
      description: isFa
        ? 'پخش ریلزهای فول اچ‌دی با نرخ نوسازی ۶۰ فریم بر ثانیه، افکت‌های بصری پیشرفته، انتخاب موزیک‌های ترند و دسته‌بندی موضوعی شامل آموزش، تریدینگ و کدنویسی.'
        : 'Experience silk-smooth 60fps vertical reels with low-bandwidth hardware decoding, instant sound sync, and smart topic categorization.',
      highlights: [
        isFa ? 'نرخ رندر پایدار ۶۰ فریم بر ثانیه' : 'Consistent 60fps GPU frame rates',
        isFa ? 'بارگذاری بدون وقفه با حافظه موقت هوشمند' : 'Zero-buffering intelligent chunk pre-caching',
        isFa ? 'دسته‌بندی‌های اختصاصی کدنویسی، ترید و انگیزه' : 'Dedicated Coding, Trading & Motivation tags',
      ],
    },
    {
      id: 1,
      title: isFa ? 'تماس صوتی و تصویری HD' : 'Sub-400ms HD Video Calls',
      subtitle: isFa ? 'معماری همزمان Agora RTC' : 'Studio audio & noise cancellation',
      category: isFa ? 'ارتباط لحظه‌ای' : 'Real-Time RTC',
      image: '/app-shots/6.jpeg',
      icon: PhoneCall,
      accent: '#536DFE',
      description: isFa
        ? 'تماس تصویری و صوتی استودیویی با تاخیر کمتر از ۴۰۰ میلی‌ثانیه، فناوری حذف نویز هوشمند و اتصال خودکار مجدد در صورت تغییر شبکه.'
        : 'Crystal-clear 1080p video and studio voice calls with sub-400ms latency across 200+ global edge relay nodes, complete with background AI noise cancellation.',
      highlights: [
        isFa ? 'تاخیر فوق‌العاده پایین زیر ۴۰۰ میلی‌ثانیه' : 'Ultra-low sub-400ms worldwide latency',
        isFa ? 'کیفیت تصویر فول اچ‌دی ۱۰۸۰ با مصرف بهینه اینترنت' : 'Adaptive 1080p bitrate scaling on weak networks',
        isFa ? 'رمزگذاری سرتاسری و امنیت کامل صدا و تصویر' : 'End-to-end encrypted audio/video payloads',
      ],
    },
    {
      id: 2,
      title: isFa ? 'فید و استوری‌های ۲۴ ساعته' : 'Interactive Feed & Stories',
      subtitle: isFa ? 'تعامل آنی و شفاف' : 'Full resolution & instant likes',
      category: isFa ? 'هاب اجتماعی' : 'Social Hub',
      image: '/app-shots/3.jpeg',
      icon: Compass,
      accent: '#00D4FF',
      description: isFa
        ? 'محیطی پاک و صمیمی برای اشتراک‌گذاری لحظه‌ها، تصاویر باکیفیت بالا و استوری‌های ۲۴ ساعته با قابلیت ریپلای خصوصی.'
        : 'A transparent, chronological feed free of opaque shadowbans. Share high-res photos, moments, and 24-hour stories with private DM replies.',
      highlights: [
        isFa ? 'الگوریتم شفاف و نمایش مبتنی بر علایق واقعی' : 'Transparent feed order based on real connections',
        isFa ? 'استوری ۲۴ ساعته با ابزارهای تعاملی' : '24-hour disappearing stories with interactive stickers',
        isFa ? 'لایک و کامنت‌های ریل‌تایم زیر یک ثانیه' : 'Real-time threaded comments and reactions',
      ],
    },
    {
      id: 3,
      title: isFa ? 'پیام‌رسان رمزگذاری‌شده (DMs)' : 'Encrypted Direct Messaging',
      subtitle: isFa ? 'حریم خصوصی غیرقابل نفوذ' : 'Direct encrypted chat & media',
      category: isFa ? 'پیام‌رسانی امن' : 'Private Messenger',
      image: '/app-shots/5.jpeg',
      icon: MessageSquare,
      accent: '#536DFE',
      description: isFa
        ? 'پیام‌رسانی مستقیم با رمزگذاری سرتاسری TLS 1.3، تیک‌های خوانده‌شدن، ویس‌مسیج‌های باکیفیت و ارسال فایل بدون فشرده‌سازی بی‌مورد.'
        : 'Enterprise-grade direct communication with cryptographic secrecy, delivery receipts, crystal voice notes, and uncompressed media exchange.',
      highlights: [
        isFa ? 'امنیت بانکی و رمزگذاری در حال انتقال' : 'TLS 1.3 cryptographic transit protection',
        isFa ? 'تیک‌های تحویل و خوانده‌شدن آنی' : 'Instant delivery and read status receipts',
        isFa ? 'ضبط و ارسال پیام صوتی با فرکانس بالا' : 'Studio voice memos with background waveform visualizer',
      ],
    },
    {
      id: 4,
      title: isFa ? 'اکسپلور و ترندهای زنده' : 'Explore & Real-Time Trends',
      subtitle: isFa ? 'کشف سازندگان برتر' : 'Smart discovery & verified tags',
      category: isFa ? 'کشف محتوا' : 'Discovery Hub',
      image: '/app-shots/2.jpeg',
      icon: TrendingUp,
      accent: '#00D4FF',
      description: isFa
        ? 'جستجوی هوشمند در میان هزاران تولیدکننده محتوا، هشتگ‌های پرطرفدار و موضوعات داغ بدون سانسور یا پنهان‌سازی.'
        : 'Discover trending creators, popular hashtags, and viral reels with a lightning-fast discovery index powered by real engagement.',
      highlights: [
        isFa ? 'جستجوی سریع کاربران و هشتگ‌های زنده' : 'Sub-second user, reel & hashtag search',
        isFa ? 'ترندهای افغانستان و جهان به صورت لحظه‌ای' : 'Live trending topics across Afghanistan & worldwide',
        isFa ? 'فیلتر هوشمند ریلزها بر اساس دسته‌بندی' : 'Contextual filtering for education and tech content',
      ],
    },
    {
      id: 5,
      title: isFa ? 'پروفایل و تیک‌های تایید رسمی' : 'Creator Profiles & Badges',
      subtitle: isFa ? 'احراز هویت نخبگان' : 'Verified identity & portfolio',
      category: isFa ? 'هویت حرفه‌ای' : 'Creator Identity',
      image: '/app-shots/4.jpeg',
      icon: UserCheck,
      accent: '#536DFE',
      description: isFa
        ? 'پروفایل‌های حرفه‌ای با نشان تایید هویت رسمی (تیک آبی)، همگام با اکادمی صفی برای مدرسین، تریدرها، هنرمندان و کارشناسان.'
        : 'Showcase your portfolio with official verified blue badges, academic credentials synchronized with Safi Academy, and deep audience analytics.',
      highlights: [
        isFa ? 'تیک آبی معتبر پس از راستی‌آزمایی مدارک' : 'Official Blue Verification for recognized creators',
        isFa ? 'همگام‌سازی خودکار مدارک اکادمی صفی' : 'Instant badge sync with Safi Academy graduates',
        isFa ? 'نمایش آرشیو ریلز، پست‌ها و بیوگرافی شخصی' : 'Organized grid showcase for reels, media, and bio links',
      ],
    },
  ];

  const current = showcaseItems[activeTab];

  return (
    <section
      id="experience"
      style={{
        padding: '100px 0',
        backgroundColor: '#07090E',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow effects */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, rgba(83, 109, 254, 0.04) 50%, transparent 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 50px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 24,
              background: 'rgba(0, 212, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              marginBottom: 16,
            }}
          >
            <Sparkles size={15} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF', letterSpacing: 0.5 }}>
              {isFa ? 'بررسی زنده محیط اپلیکیشن' : 'LIVE INTERFACE EXPERIENCE'}
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {isFa
              ? 'معماری و قابلیت‌های شاخص اپلیکیشن زِو'
              : 'Engineered for Performance. Designed for You.'}
          </h2>

          <p style={{ fontSize: 16.5, color: '#94A3B8', lineHeight: 1.6 }}>
            {isFa
              ? 'تصاویر واقعی از نسخه رسمی ۲.۴ فعال در گوگل پلی استور؛ از ریلزهای روان ۶۰ فریم تا تماس‌های ویدیویی فوق‌پایدار و پیام‌رسان ایمن.'
              : 'Direct screen captures from the official ZEV 2.4 release on Google Play. Silk-smooth 60fps Reels, sub-400ms RTC video calling, and protected messaging.'}
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 44,
          }}
        >
          {showcaseItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '11px 20px',
                  borderRadius: 20,
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive
                    ? '1.5px solid #00D4FF'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.18) 0%, rgba(83, 109, 254, 0.18) 100%)'
                    : 'rgba(13, 18, 30, 0.75)',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  boxShadow: isActive ? '0 4px 20px rgba(0, 212, 255, 0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={16} color={isActive ? '#00D4FF' : '#64748B'} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Showcase Box */}
        <div
          style={{
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: 32,
            padding: '48px clamp(20px, 4vw, 56px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            {/* Phone Frame Mockup */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Device outer frame */}
              <div
                style={{
                  position: 'relative',
                  width: 285,
                  height: 615,
                  borderRadius: 44,
                  background: '#020408',
                  border: '8px solid #1A2234',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 212, 255, 0.2)',
                  overflow: 'hidden',
                }}
              >
                {/* Speaker pill notch */}
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 90,
                    height: 18,
                    background: '#090D15',
                    borderRadius: 10,
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
                      width: 32,
                      height: 3,
                      borderRadius: 2,
                      background: '#1E293B',
                    }}
                  />
                </div>

                {/* Real Screenshot */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="300px"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>

              {/* Floating verified badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: isFa ? 'auto' : -10,
                  left: isFa ? -10 : 'auto',
                  background: 'rgba(8, 13, 26, 0.92)',
                  border: '1px solid rgba(0, 212, 255, 0.35)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 18px',
                  borderRadius: 20,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(0, 212, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00D4FF',
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
                    {isFa ? 'تست و اعتبارسنجی شده' : 'Google Play Verified'}
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8' }}>
                    {isFa ? 'نسخه ۲.۴ رسمی' : 'Official Release 2.4'}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Content Info */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 14,
                  background: 'rgba(0, 212, 255, 0.1)',
                  border: '1px solid rgba(0, 212, 255, 0.25)',
                  marginBottom: 16,
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: '#00D4FF',
                }}
              >
                <span>{current.category}</span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(26px, 3.5vw, 38px)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.25,
                  marginBottom: 12,
                }}
              >
                {current.title}
              </h3>

              <div
                style={{
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: '#00D4FF',
                  marginBottom: 16,
                }}
              >
                {current.subtitle}
              </div>

              <p
                style={{
                  fontSize: 15.5,
                  color: '#CBD5E1',
                  lineHeight: 1.7,
                  marginBottom: 26,
                }}
              >
                {current.description}
              </p>

              {/* Bullet highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {current.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: 14.5,
                      color: '#E2E8F0',
                    }}
                  >
                    <CheckCircle2 size={18} color="#00D4FF" style={{ flexShrink: 0 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.zevapp.app&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '13px 24px',
                    borderRadius: 16,
                    background: '#00D4FF',
                    color: '#07090E',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(0, 212, 255, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{isFa ? 'دریافت از گوگل پلی' : 'Get on Google Play'}</span>
                  <ExternalLink size={15} />
                </a>

                <a
                  href="https://zevapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '13px 22px',
                    borderRadius: 16,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{isFa ? 'اجرای وب اپلیکیشن' : 'Launch Web App'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
