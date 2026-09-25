'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  Globe,
  ArrowRight,
  ShieldCheck,
  Video,
  Users,
  Lock,
  Monitor,
  Heart,
  ChevronDown,
  CheckCircle2,
  Smartphone,
  Flame,
  Star,
  Layers,
  Database,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';
import { AppMockup } from '@/components/AppMockup';
import { EcosystemSection } from '@/components/EcosystemSection';
import { DownloadModal } from '@/components/DownloadModal';

export default function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: dict.hero.activeUsers, value: dict.hero.activeUsersVal, icon: Users },
    { label: dict.hero.reelsShared, value: dict.hero.reelsSharedVal, icon: Video },
    { label: dict.hero.countries, value: dict.hero.countriesVal, icon: Globe },
    { label: dict.hero.security, value: '100% Encrypted', icon: Lock },
  ];

  const features = [
    {
      title: dict.features.f1Title,
      desc: dict.features.f1Desc,
      icon: Video,
      color: '#FC466B',
    },
    {
      title: dict.features.f2Title,
      desc: dict.features.f2Desc,
      icon: Flame,
      color: '#FC466B',
    },
    {
      title: dict.features.f3Title,
      desc: dict.features.f3Desc,
      icon: Lock,
      color: '#FC466B',
    },
    {
      title: dict.features.f4Title,
      desc: dict.features.f4Desc,
      icon: Monitor,
      color: '#FC466B',
    },
    {
      title: dict.features.f5Title,
      desc: dict.features.f5Desc,
      icon: Star,
      color: '#FC466B',
    },
    {
      title: dict.features.f6Title,
      desc: dict.features.f6Desc,
      icon: ShieldCheck,
      color: '#FC466B',
    },
  ];

  const faqs = [
    {
      q: isFa ? 'اپلیکیشن زو (ZEV) چیست و چه کسانی می‌توانند استفاده کنند؟' : 'What is ZEV and who can use it?',
      a: isFa
        ? 'زو یک پلتفرم شبکه اجتماعی نسل جدید با الهام از مدرن‌ترین استانداردهای بین‌المللی است که توسط نخبگان افغان برنامه‌نویسی شده است. هدف آن ایجاد فضایی امن، آزاد و پویا برای اشتراک‌گذاری لحظات، تماشای ریلز و ارتباط صمیمانه برای افغان‌ها و تمام مردم سراسر جهان است.'
        : 'ZEV is a next-generation social network inspired by modern international standards, engineered with pride by Afghan software developers. It provides a safe, vibrant, and private space for sharing reels, stories, photos, and thoughts with friends and creators worldwide.',
    },
    {
      q: isFa ? 'ارتباط زو با اکادمی صفی و صافی‌پی چیست؟' : 'What is the relationship between ZEV, Safi Academy, and SafiPay?',
      a: isFa
        ? 'زو عضو اصلی اکوسیستم شرکت‌های بین‌المللی صفی است. جالب است بدانید که زو از همان دیتابیس ابری متمرکز و سرورهای احراز هویت اکادمی صفی بهره می‌برد! دانشجویان اکادمی صفی می‌توانند با همان نام کاربری و ایمیل خود در زو لاگین کرده و نشان‌های تایید دانشجو یا مربی دریافت کنند. همچنین تسویه درآمدهای تولیدکنندگان محتوا از طریق صافی‌پی انجام می‌گیرد.'
        : 'ZEV is a flagship pillar of the Safi Ecosystem. It natively shares its cloud database and authentication architecture with Safi Academy. Students and instructors log into ZEV seamlessly using the same credentials, with synchronized creator verification and monetization via SafiPay.',
    },
    {
      q: isFa ? 'چگونه می‌توانم از زو در کامپیوتر یا لپتاپ استفاده کنم؟' : 'How can I access ZEV on my desktop or laptop?',
      a: isFa
        ? 'ما زو را با فناوری پیشرفته چندپلتفرمه فلاتر ساخته‌ایم! شما می‌توانید بدون نیاز به شبیه‌ساز یا نصب سنگین، مستقیماً از طریق مرورگر وب در سایت zevapp.com وارد اکانت خود شوید و از تمام امکانات فید، چت و ریلز لذت ببرید.'
        : 'ZEV is engineered with modern cross-platform technology. You can launch the web application directly in your browser at zevapp.com with full access to feeds, reels, messages, and stories without any emulator.',
    },
    {
      q: isFa ? 'چگونه حریم خصوصی و امنیت اطلاعات من تضمین می‌شود؟' : 'How does ZEV protect my data and privacy?',
      a: isFa
        ? 'اطلاعات شما با پروتکل‌های استانداردی مانند TLS 1.3 و رمزنگاری AES-256 محافظت می‌شود. ما قفل درون‌برنامه‌ای با پین‌کد و سنسور بیومتریک (اثر انگشت) ارائه می‌دهیم و به هیچ عنوان داده‌های شخصی شما را به شرکت‌های تبلیغاتی ثالث نمی‌فروشیم.'
        : 'Your data is secured in transit using TLS 1.3 and at rest with AES-256 encryption. We support optional in-app PIN and biometric locks, and we never sell your personal data to third-party data brokers.',
    },
    {
      q: isFa ? 'خط مشی زو در خصوص محتوای نامناسب و امنیت کودکان چیست؟' : 'What is ZEV’s policy on child safety and moderation?',
      a: isFa
        ? 'زو سیاست تحمل صفر مطلق در قبال هرگونه سوءاستفاده یا محتوای آسیب‌رسان به کودکان (CSAM) دارد و بلافاصله با مراجع نظارتی و قانونی بین‌المللی همکاری می‌کند. صفحه ویژه «محافظت از کودکان» ما تمام دستورالعمل‌ها را به تفصیل تشریح کرده است.'
        : 'ZEV maintains strict zero tolerance for any child abuse material or predatory behavior. We enforce automated screening, rapid human moderation, and cooperate with international child protection authorities like NCMEC.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          paddingTop: 40,
          paddingBottom: 80,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Ambient Glows */}
        <div
          className="ambient-glow ambient-pink"
          style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 50,
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="badge-pill">
                <Sparkles size={14} />
                <span>{dict.hero.badge}</span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 64px)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: '-1.5px',
                  marginBottom: 22,
                }}
              >
                <span className="text-gradient-pink">{dict.hero.titleHighlight}</span>
                <br />
                <span style={{ color: '#000000' }}>{dict.hero.titleRest}</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 19px)',
                  color: '#334155',
                  lineHeight: 1.65,
                  marginBottom: 36,
                  maxWidth: 620,
                  fontWeight: 500,
                }}
              >
                {dict.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 14,
                  marginBottom: 28,
                }}
              >
                <a
                  href="https://zevapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '15px 32px', fontSize: 16 }}
                >
                  <Globe size={18} />
                  <span>{dict.hero.ctaWeb}</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="btn-secondary"
                  style={{ padding: '15px 32px', fontSize: 16 }}
                >
                  <Download size={18} color="#FC466B" />
                  <span>{dict.hero.ctaDownload}</span>
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: '#64748B',
                }}
              >
                <CheckCircle2 size={16} color="#FC466B" />
                <span>{dict.hero.ctaStoreSubtitle}</span>
              </div>
            </div>

            {/* Right Showcase Image Hero */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Outer decorative ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '90%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(252, 70, 107, 0.35)',
                  animation: 'pulseGlow 8s infinite',
                  pointerEvents: 'none',
                }}
              />

              {/* Main Visual Card */}
              <div
                className="animate-float"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 440,
                  borderRadius: 36,
                  padding: 8,
                  background: '#FFF1F4',
                  border: '2px solid rgba(252, 70, 107, 0.4)',
                  boxShadow: '0 25px 60px rgba(252, 70, 107, 0.25)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 15',
                    borderRadius: 30,
                    overflow: 'hidden',
                    background: '#0B0C15',
                  }}
                >
                  <Image
                    src="/screenshots/3.jpg"
                    alt="ZEV Feed and Social Experience"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: isFa ? 'auto' : '-3%',
                  right: isFa ? '-3%' : 'auto',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(252, 70, 107, 0.4)',
                  padding: '12px 20px',
                  borderRadius: 22,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: '0 12px 30px rgba(252, 70, 107, 0.2)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: '#FC466B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <Video size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#000000' }}>
                    {isFa ? 'ریلز و استوری ترند' : 'Trending Reels Studio'}
                  </div>
                  <div style={{ fontSize: 11, color: '#FC466B', fontWeight: 700 }}>
                    {isFa ? 'کیفیت فوق‌العاده ۶۰fps' : 'Ultra HD 60fps'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS STRIP - Pink Box */}
          <div
            className="pink-box"
            style={{
              marginTop: 70,
              padding: '24px 36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
              background: '#FFF1F4',
              border: '1.5px solid rgba(252, 70, 107, 0.35)',
              boxShadow: '0 10px 30px rgba(252, 70, 107, 0.1)',
            }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
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
                      boxShadow: '0 4px 12px rgba(252, 70, 107, 0.35)',
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#000000',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section
        id="features"
        style={{
          position: 'relative',
          padding: '90px 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
            <div className="badge-pill">
              <Sparkles size={14} />
              <span>{dict.features.tag}</span>
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
              {dict.features.title}
            </h2>
            <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.6 }}>{dict.features.subtitle}</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="pink-box"
                  style={{
                    padding: 36,
                    borderRadius: 28,
                    background: '#FFF7F9',
                    border: '1.5px solid rgba(252, 70, 107, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(252, 70, 107, 0.08)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: 16,
                        background: '#FC466B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        marginBottom: 20,
                        boxShadow: '0 6px 18px rgba(252, 70, 107, 0.3)',
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: '#000000',
                        marginBottom: 12,
                      }}
                    >
                      {feat.title}
                    </h3>

                    <p style={{ color: '#334155', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APP MOCKUP SHOWCASE */}
      <AppMockup />

      {/* SAFI ECOSYSTEM & PARTNER SHOWCASE */}
      <EcosystemSection locale={locale} dict={dict} />

      {/* SCREENSHOT GALLERY */}
      <section
        style={{
          position: 'relative',
          padding: '90px 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
            <div className="badge-pill">
              <Smartphone size={14} />
              <span>{isFa ? 'گالری محیط کاربری' : 'App Visual Showcase'}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 14, color: '#000000' }}>
              {isFa ? 'نگاهی به بخش‌های مختلف برنامه' : 'Experience ZEV Across All Modules'}
            </h2>
            <p style={{ fontSize: 17, color: '#334155' }}>
              {isFa
                ? 'رابط کاربری مدرن با تم دارک، فید استوری، ریلز و دایرکت چت فوق‌سریع'
                : 'Fluid dark UI design, full-screen stories, responsive reels, and real-time chatting.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {[
              { img: '/screenshots/56.jpeg', title: isFa ? 'صفحه استوری و فید' : 'Feed & Stories' },
              { img: '/screenshots/57.jpeg', title: isFa ? 'پروفایل و تنظیمات' : 'Profile & Bio' },
              { img: '/screenshots/58.jpeg', title: isFa ? 'اکسپلور و کاوش' : 'Explore & Tags' },
              { img: '/screenshots/59.jpeg', title: isFa ? 'چت و پیام‌رسانی' : 'Direct Messages' },
            ].map((shot, idx) => (
              <div
                key={idx}
                className="pink-box"
                style={{
                  padding: 12,
                  borderRadius: 24,
                  textAlign: 'center',
                  background: '#FFF7F9',
                  border: '1.5px solid rgba(252, 70, 107, 0.3)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 18',
                    borderRadius: 18,
                    overflow: 'hidden',
                    background: '#0F101A',
                    marginBottom: 12,
                  }}
                >
                  <Image src={shot.img} alt={shot.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#000000' }}>{shot.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 14, color: '#000000' }}>
              {isFa ? 'پرسش‌های متداول' : 'Frequently Asked Questions'}
            </h2>
            <p style={{ fontSize: 16, color: '#334155' }}>
              {isFa
                ? 'پاسخ به سوالات مهم درباره نحوه کار، اکوسیستم صفی و امنیت زو'
                : 'Everything you need to know about ZEV, the Safi Ecosystem, and privacy.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="pink-box"
                  style={{
                    borderRadius: 18,
                    border: isOpen
                      ? '1.5px solid #FC466B'
                      : '1.5px solid rgba(252, 70, 107, 0.25)',
                    background: isOpen ? '#FFF1F4' : '#FFFFFF',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: '#000000',
                      fontSize: 16,
                      fontWeight: 800,
                      textAlign: isFa ? 'right' : 'left',
                      cursor: 'pointer',
                      gap: 16,
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      color="#FC466B"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 22px',
                        color: '#334155',
                        fontSize: 15,
                        lineHeight: 1.75,
                        borderTop: '1px solid rgba(252, 70, 107, 0.2)',
                        paddingTop: 16,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER - Solid Pink Box with White/Black contrast */}
      <section
        id="download"
        style={{
          position: 'relative',
          padding: '60px 0 100px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="pink-box-solid"
            style={{
              padding: '60px 40px',
              borderRadius: 36,
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(252, 70, 107, 0.35)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 46px)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: 16,
              }}
            >
              {dict.downloadSection.title}
            </h2>
            <p
              style={{
                fontSize: 17,
                color: '#FFFFFF',
                maxWidth: 620,
                margin: '0 auto 36px',
                lineHeight: 1.6,
                opacity: 0.95,
              }}
            >
              {dict.downloadSection.subtitle}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 16,
                marginBottom: 20,
              }}
            >
              <a
                href="https://zevapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
                style={{ padding: '16px 36px', fontSize: 16 }}
              >
                <Globe size={18} />
                <span>{dict.downloadSection.btnWeb}</span>
                <ArrowRight size={18} />
              </a>

              <button
                onClick={() => setDownloadModalOpen(true)}
                className="btn-white"
                style={{ padding: '16px 36px', fontSize: 16 }}
              >
                <Download size={18} />
                <span>{dict.hero.ctaDownload}</span>
              </button>
            </div>

            <div style={{ fontSize: 13, color: '#FFFFFF', opacity: 0.85 }}>{dict.downloadSection.apkNote}</div>
          </div>
        </div>
      </section>

      {/* Download Modal Trigger */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </div>
  );
}
