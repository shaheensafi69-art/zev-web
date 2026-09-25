'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Sparkles, Users, Video, Compass, Smartphone, Layers } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const AppMockup = () => {
  const { lang, t } = useLanguage();
  const isFa = lang === 'fa';
  const [activeTab, setActiveTab] = useState<'reels' | 'people' | 'feed' | 'trading'>('reels');

  const tabs = [
    {
      id: 'reels' as const,
      label: isFa ? 'استودیو ریلز' : 'Reels Studio',
      icon: Video,
      image: '/screenshots/1.png',
      badge: isFa ? 'قابلیت ویژه ریلز' : 'Submit Your Reel',
      title: isFa ? 'ثبت و انتشار ویدیوهای ریلز با کیفیت بالا' : 'Turn Your Moments Into Impact',
      desc: isFa
        ? 'ویدیوهای کوتاه با آهنگ‌های روز، دسته‌بندی موضوعی (کدنویسی، تریدینگ، انگیزشی) و کپشن‌های جذاب به اشتراک بگذارید.'
        : 'Got a great video? Share it with the world! Choose custom categories like Coding, Trading, Motivation, and Education.',
    },
    {
      id: 'people' as const,
      label: isFa ? 'کشف دوستان' : 'Find Your People',
      icon: Users,
      image: '/screenshots/2.jpg',
      badge: isFa ? 'جامعه فعال' : 'Active Community',
      title: isFa ? 'آدم‌های واقعی، حس و حال واقعی' : 'Discover Amazing People & Connect',
      desc: isFa
        ? 'دوستان همفکر، هنرمندان، سازندگان و افراد خلاق را در افغانستان و جهان دنبال کنید و گپ بزنید.'
        : 'Connect with creators, friends, and active members. Follow inspiring personalities and build meaningful connections.',
    },
    {
      id: 'feed' as const,
      label: isFa ? 'فید و استوری' : 'Feed & Stories',
      icon: Compass,
      image: '/screenshots/3.jpg',
      badge: isFa ? 'فید هوشمند' : 'ZEV Feed',
      title: isFa ? 'عکس‌ها و استوری‌های دوستان با نهایت کیفیت' : 'Feed • Explore • Share • Connect',
      desc: isFa
        ? 'بیش از یک اپلیکیشن اجتماعی؛ فضایی امن و صمیمی برای ابراز نظرات و دیدن دستاوردهای دیگران.'
        : 'More than just a social app. It is your safe space to share gratitude, daily updates, and celebrate accomplishments.',
    },
    {
      id: 'trading' as const,
      label: isFa ? 'تحلیل و دانش' : 'Analysis & Media',
      icon: Layers,
      image: '/screenshots/55.jpeg',
      fallbackImage: '/screenshots/60.jpeg',
      badge: isFa ? 'تخصصی' : 'Knowledge & Insights',
      title: isFa ? 'اشتراک دانش تخصصی و چارت‌های تحلیلی' : 'Deep Analysis & High Res Media',
      desc: isFa
        ? 'از تحلیل‌های مالی و کریپتو گرفته تا برنامه‌نویسی و نکات علمی؛ جامعه‌ای هدفمند برای یادگیری.'
        : 'From market charts and tech tutorials to cultural arts, share high-resolution screenshots and insightful deep dives.',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="showcase" style={{ position: 'relative', padding: '90px 0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 50px' }}>
          <div className="badge-pill">
            <Sparkles size={14} />
            <span>{t.showcase.tag}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 16,
              color: '#000000',
            }}
          >
            {t.showcase.title}
          </h2>
          <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.6 }}>{t.showcase.desc}</p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 50,
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid #FC466B' : '1.5px solid rgba(252, 70, 107, 0.3)',
                  background: isActive ? '#FC466B' : '#FFF1F4',
                  color: isActive ? '#FFFFFF' : '#0F172A',
                  boxShadow: isActive ? '0 8px 24px rgba(252, 70, 107, 0.35)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mockup Display Box */}
        <div
          className="pink-box"
          style={{
            borderRadius: 36,
            padding: '48px clamp(20px, 3.5vw, 60px)',
            background: '#FFF7F9',
            border: '1.5px solid rgba(252, 70, 107, 0.35)',
            boxShadow: '0 20px 60px rgba(252, 70, 107, 0.12)',
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
            {/* Left Mockup Phone Frame */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 360,
                  aspectRatio: '9 / 17',
                  borderRadius: 36,
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  border: '4px solid #FC466B',
                  boxShadow: '0 25px 60px rgba(252, 70, 107, 0.25)',
                }}
              >
                <Image
                  src={currentTab.image}
                  alt={currentTab.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>

            {/* Right Information Details */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: '#FC466B',
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 800,
                  marginBottom: 16,
                  boxShadow: '0 4px 12px rgba(252, 70, 107, 0.3)',
                }}
              >
                <span>{currentTab.badge}</span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 900,
                  lineHeight: 1.25,
                  marginBottom: 18,
                  color: '#000000',
                }}
              >
                {currentTab.title}
              </h3>

              <p
                style={{
                  fontSize: 16,
                  color: '#334155',
                  lineHeight: 1.75,
                  marginBottom: 28,
                }}
              >
                {currentTab.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <a
                  href="https://zevapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Smartphone size={16} />
                  <span>{isFa ? 'تجربه در اپلیکیشن' : 'Try in App'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
