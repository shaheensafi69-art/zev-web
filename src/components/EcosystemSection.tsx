'use client';

import React from 'react';
import Image from 'next/image';
import { Database, ExternalLink, ShieldCheck, Zap, Globe, Sparkles, CreditCard, GraduationCap } from 'lucide-react';
import { isRtlLocale } from '@/dictionaries';

interface EcosystemSectionProps {
  locale: string;
  dict: any;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ locale, dict }) => {
  const isFa = isRtlLocale(locale);

  const featuredEcosystem = [
    {
      name: isFa ? 'اکادمی بین‌المللی صفی (Safi Academy)' : 'Safi Academy',
      url: 'https://safiacademy.org',
      logo: '/assets/safi-academy-logo-clean.png',
      fallbackLogo: '/assets/safi-academy-logo.png',
      badge: isFa ? 'دیتابیس و حساب مشترک با زو' : 'Shared Single Database & SSO with ZEV',
      description: isFa
        ? 'بزرگترین پلتفرم آموزشی آنلاین افغان‌ها در حوزه‌های تریدینگ، برنامه‌نویسی، هوش مصنوعی و زبان‌های بین‌المللی. کاربران و دانشجویان اکادمی صفی می‌توانند با همان حساب کاربری خود فوراً وارد اپلیکیشن زو (ZEV) شوند!'
        : 'The premier global Afghan educational ecosystem offering world-class trading, software engineering, and AI courses. Safi Academy members sign into ZEV with the exact same unified credentials and shared database!',
      accentColor: '#FC466B',
      icon: GraduationCap,
      features: [
        isFa ? 'احراز هویت مشترک با زو (Single Sign-On)' : 'Unified Authentication with ZEV',
        isFa ? 'همگام‌سازی پروفایل‌ها و تایید هویت' : 'Profile & Creator Badge Sync',
        isFa ? 'جامعه بزرگ بیش از صدها هزار دانشجو' : 'Over 100K+ Active Learners',
      ],
    },
    {
      name: isFa ? 'صافی پی (SafiPay)' : 'SafiPay Global Fintech',
      url: 'https://safipay.net',
      logo: '/company/SafiPay.png',
      badge: isFa ? 'زیرساخت پرداخت و کیف پول' : 'Global Payment & Card Infrastructure',
      description: isFa
        ? 'سیستم مالی پیشرفته و کارت‌های بین‌المللی ویزا برای واریز و برداشت آنی، پرداخت دستمزد تولیدکنندگان محتوا در زو، و تسهیل مراودات ارزی دانشجویان و بازرگانان در سرتاسر جهان.'
        : 'Next-gen fintech application facilitating international Visa card issuance, instant multi-currency transfers, and seamless monetization payouts for verified ZEV content creators.',
      accentColor: '#FC466B',
      icon: CreditCard,
      features: [
        isFa ? 'صدور ویزاکارت و حساب ارزی بین‌المللی' : 'Virtual & Physical Visa Cards',
        isFa ? 'تسویه آنی درآمد تولیدکنندگان محتوا' : 'Instant Creator Monetization Payouts',
        isFa ? 'پشتیبانی از انتقال چند ارزی جهانی' : 'Global Multi-Currency Settlements',
      ],
    },
  ];

  const otherCompanies = [
    {
      name: 'Safi International Capital LTD',
      url: 'https://safiinternationalcapitalltd.site',
      logo: '/company/Safi International Capital LTD.png',
      badge: 'Parent Holding (UK)',
      desc: isFa
        ? 'هلدینگ مادر و نهاد حقوقی ثبت شده در انگلستان و ولز با شماره ثبت ۱۷۰۶۳۲۸۶ برای نظارت و مدیریت سرمایه‌گذاری‌های جهانی.'
        : 'The corporate parent entity registered in England & Wales (#17063286) stewarding global investments.',
    },
    {
      name: 'Safi TopUp',
      url: 'https://safitopup.site',
      logo: '/company/Safi TopUp.jpg',
      badge: 'Telecom & Gaming',
      desc: isFa
        ? 'پلتفرم شارژ سیم‌کارت‌های بین‌المللی، گیفت‌کارت و جم بازی‌ها با پرداخت سریع.'
        : 'Instant global telecom airtime, gift cards, and gaming top-up infrastructure.',
    },
    {
      name: 'SafiPro',
      url: 'https://safipro.site',
      logo: '/company/SafiPro.jpeg',
      badge: 'Digital Commerce',
      desc: isFa
        ? 'فروشگاه نرم‌افزارهای اورجینال، اکانت‌های پریمیوم و ابزارهای دیجیتال حرفه‌ای.'
        : 'Premium software licensing, developer tools, and verified professional accounts.',
    },
    {
      name: 'Shaheen Safi Official Blog',
      url: 'https://shaheensafi.blog',
      logo: '/company/shaheenblog.png',
      badge: 'Founder Thoughts',
      desc: isFa
        ? 'وبلاگ رسمی مهندس شاهین صفی (دایرکتور و فاوندر) پیرامون آینده فناوری، برنامه‌نویسی و آزادی دیجیتال.'
        : 'Articles, vision, and technology deep-dives from Director & Founder Shaheen Safi.',
    },
    {
      name: 'Safi AI Platform',
      url: 'https://www.safiai.site',
      logo: '/company/Safi Ai.png',
      badge: 'Artificial Intelligence',
      desc: isFa
        ? 'پلتفرم پیشرفته هوش مصنوعی جهت پردازش زبان‌های بومی، تولید محتوا و کدنویسی خودکار.'
        : 'Next-generation AI services powering smart content moderation and NLP solutions.',
    },
  ];

  return (
    <section id="ecosystem" style={{ position: 'relative', padding: '90px 0', overflow: 'hidden', backgroundColor: '#07090E' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 50px' }}>
          <div className="badge-pill">
            <Zap size={14} />
            <span>{dict.ecosystem.tag}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 16,
              color: '#FFFFFF',
            }}
          >
            {dict.ecosystem.title}
          </h2>
          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.7 }}>
            {dict.ecosystem.subtitle}
          </p>
        </div>

        {/* Unified Database Highlight Card - Pink Box */}
        <div
          className="pink-box"
          style={{
            padding: '28px 36px',
            borderRadius: 28,
            background: 'rgba(13, 18, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 12px 35px rgba(252, 70, 107, 0.15)',
            marginBottom: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              background: '#FC466B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              flexShrink: 0,
              boxShadow: '0 6px 20px rgba(252, 70, 107, 0.35)',
            }}
          >
            <Database size={28} />
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                {dict.ecosystem.databaseNoticeTitle}
              </h3>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  background: '#FC466B',
                  padding: '3px 12px',
                  borderRadius: 999,
                }}
              >
                Supabase Unified Cloud
              </span>
            </div>
            <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              {dict.ecosystem.databaseNoticeDesc}
            </p>
          </div>
        </div>

        {/* Featured Big Cards (Safi Academy & SafiPay) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
            gap: 28,
            marginBottom: 50,
          }}
        >
          {featuredEcosystem.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="pink-box"
                style={{
                  padding: '36px 32px',
                  borderRadius: 30,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(13, 18, 30, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 35px rgba(252, 70, 107, 0.12)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: 54,
                        height: 54,
                        borderRadius: 16,
                        overflow: 'hidden',
                        background: 'rgba(13, 18, 30, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 6,
                        boxShadow: '0 4px 12px rgba(252, 70, 107, 0.15)',
                      }}
                    >
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={42}
                        height={42}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: '#FC466B',
                        padding: '5px 12px',
                        borderRadius: 999,
                        background: 'rgba(13, 18, 30, 0.75)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      marginBottom: 12,
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 14.5,
                      color: '#94A3B8',
                      lineHeight: 1.7,
                      marginBottom: 22,
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                    {item.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: '#FC466B',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 11,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ fontSize: 13.5, color: '#94A3B8', fontWeight: 600 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '13px 20px',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span>{isFa ? 'مشاهده وب‌سایت رسمی' : 'Visit Official Website'}</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            );
          })}
        </div>

        {/* 5 Sister Companies Grid */}
        <div style={{ marginBottom: 20 }}>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: '#FFFFFF',
              marginBottom: 20,
              textAlign: isFa ? 'right' : 'left',
            }}
          >
            {isFa ? 'سایر شرکت‌ها و دارایی‌های اکوسیستم صفی' : 'Other Companies & Entities in the Safi Family'}
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {otherCompanies.map((comp, idx) => (
              <a
                key={idx}
                href={comp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel"
                style={{
                  padding: 24,
                  borderRadius: 22,
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1.5px solid rgba(252, 70, 107, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.25s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        overflow: 'hidden',
                        background: 'rgba(13, 18, 30, 0.75)',
                        border: '1px solid rgba(252, 70, 107, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                      }}
                    >
                      <Image
                        src={comp.logo}
                        alt={comp.name}
                        width={34}
                        height={34}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#FC466B',
                        padding: '3px 10px',
                        borderRadius: 999,
                        background: 'rgba(13, 18, 30, 0.75)',
                      }}
                    >
                      {comp.badge}
                    </span>
                  </div>

                  <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                    {comp.name}
                  </h4>
                  <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                    {comp.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 18,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#FC466B',
                  }}
                >
                  <span>{isFa ? 'ورود به سایت' : 'Open Link'}</span>
                  <ExternalLink size={13} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
