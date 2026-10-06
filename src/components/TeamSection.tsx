'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Award, Shield, Sparkles, CheckCircle2, BadgeCheck } from 'lucide-react';
import { isRtlLocale } from '@/dictionaries';

interface TeamSectionProps {
  locale: string;
  dict: any;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ locale, dict }) => {
  const isRtl = isRtlLocale(locale);

  // Exact hierarchy according to official executive ranking:
  // 1. Shaheen Safi (Director & Founder)
  // 2. Sahel Salem (CEO & European Relations)
  // 3. Mujtaba Rahmani (Co-Founder)
  // 4. Shirin Gol Ahmadi (Ecosystem Manager)
  // 5. Mobin Hassani (Lead Developer)
  const m = dict.team?.members || {};

  const leaders = [
    {
      rank: '01',
      key: 'shaheen',
      name: m.shaheen?.name || (isRtl ? 'شاهین صافی' : 'Shaheen Safi'),
      role: m.shaheen?.role || (isRtl ? 'دایرکتور و فاوندر (Director & Founder)' : 'DIRECTOR & FOUNDER'),
      badge: m.shaheen?.badge || (isRtl ? 'دایرکتور و فاوندر' : 'Director & Founder'),
      image: '/team/shaheen.jpeg',
      bio:
        m.shaheen?.bio ||
        (isRtl
          ? 'بنیان‌گذار و دایرکتور اکوسیستم بین‌المللی صفی و پلتفرم زِو، معمار ارشد سیستم‌های ابری، هوش مصنوعی و معماری فلاتر.'
          : 'Founder & Director of the Safi Ecosystem and ZEV platform, Lead Cloud & Software Architect pioneering universal Flutter systems and AI.'),
      accentGradient: 'linear-gradient(135deg, #FC466B 0%, #FF5E82 100%)',
    },
    {
      rank: '02',
      key: 'sahel',
      name: m.sahel?.name || (isRtl ? 'ساحل سالم' : 'Sahel Salem'),
      role: m.sahel?.role || (isRtl ? 'مدیرعامل (CEO) و ارتباطات اروپا' : 'CHIEF EXECUTIVE OFFICER & EUROPEAN RELATIONS'),
      badge: m.sahel?.badge || (isRtl ? 'مدیرعامل و ارتباطات اروپا' : 'CEO & European Relations'),
      image: '/team/sahel.jpeg',
      bio:
        m.sahel?.bio ||
        (isRtl
          ? 'مدیرعامل پلتفرم و مسئول ارشد توسعه دیپلماسی تجاری، ارتباطات شرکتی و شرکای استراتژیک در سراسر اروپا و بازارهای جهانی.'
          : 'Chief Executive Officer leading corporate governance, cross-border European relations, and global strategic alliances for ZEV.'),
      accentGradient: 'linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)',
    },
    {
      rank: '03',
      key: 'mujtaba',
      name: m.mujtaba?.name || (isRtl ? 'مجتبی رحمانی' : 'Mujtaba Rahmani'),
      role: m.mujtaba?.role || (isRtl ? 'هم‌بنیان‌گذار (Co-Founder)' : 'CO-FOUNDER'),
      badge: m.mujtaba?.badge || (isRtl ? 'هم‌بنیان‌گذار' : 'Co-Founder'),
      image: '/team/mujtaba.jpeg',
      bio:
        m.mujtaba?.bio ||
        (isRtl
          ? 'هم‌بنیان‌گذار پلتفرم زِو، ناظر بر یکپارچگی زیرساخت، عملیات و پایبندی به بالاترین معیارهای امنیت و حفاظت داده‌های کاربران.'
          : 'Co-Founder of ZEV, directing platform infrastructure, global operational resilience, and cybersecurity integrity.'),
      accentGradient: 'linear-gradient(135deg, #38BDF8 0%, #6366F1 100%)',
    },
    {
      rank: '04',
      key: 'shirin',
      name: m.shirin?.name || (isRtl ? 'شیرین گل احمدی' : 'Shirin Gol Ahmadi'),
      role: m.shirin?.role || (isRtl ? 'مدیر کل اکوسیستم (Ecosystem Manager)' : 'GENERAL ECOSYSTEM MANAGER'),
      badge: m.shirin?.badge || (isRtl ? 'مدیر کل اکوسیستم' : 'Ecosystem Manager'),
      image: '/team/shirin.jpeg',
      bio:
        m.shirin?.bio ||
        (isRtl
          ? 'مدیریت یکپارچه کلیه محصولات و پلتفرم‌های اکوسیستم صفی، هماهنگی استراتژیک میان بخش‌های فناوری، آموزش، مالی و زِو.'
          : 'Directing ecosystem-wide synergy across all Safi platforms, orchestrating tech, educational, and social integrations for ZEV.'),
      accentGradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
    },
    {
      rank: '05',
      key: 'mobin',
      name: m.mobin?.name || (isRtl ? 'مبین حسنی' : 'Mobin Hassani'),
      role: m.mobin?.role || (isRtl ? 'لیدر بخش توسعه‌دهندگان (Lead Developer)' : 'LEAD DEVELOPER'),
      badge: m.mobin?.badge || (isRtl ? 'لیدر بخش توسعه' : 'Lead Developer'),
      image: '/team/mobin.jpg',
      bio:
        m.mobin?.bio ||
        (isRtl
          ? 'رهبر تیم مهندسی نرم‌افزار و معماری کلاینت/سرور، هدایت برنامه‌نویسان فلاتر و بهینه‌سازی کدهای چندپلتفرمه برای حداکثر سرعت.'
          : 'Head of Software Development, directing client-side and full-stack engineers, optimizing Flutter multiplatform performance and codebases.'),
      accentGradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
    },
  ];

  return (
    <section
      id="leadership"
      dir={isRtl ? 'rtl' : 'ltr'}
      style={{
        position: 'relative',
        padding: '100px 0',
        overflow: 'hidden',
        backgroundColor: '#07090E',
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="ambient-glow ambient-pink"
        style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.35 }}
      />
      <div
        className="ambient-glow ambient-purple"
        style={{ bottom: '5%', right: '10%', opacity: 0.25 }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 64px' }}>
          <div className="badge-pill">
            <Users size={14} />
            <span>{dict.team.tag}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(30px, 4.5vw, 46px)',
              fontWeight: 900,
              lineHeight: 1.18,
              letterSpacing: '-1px',
              marginBottom: 18,
              color: '#FFFFFF',
            }}
          >
            {dict.team.title}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: '#94A3B8',
              lineHeight: 1.7,
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            {dict.team.subtitle}
          </p>
        </div>

        {/* Team Grid - High-End Executive Presentation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 28,
          }}
        >
          {leaders.map((member) => (
            <div
              key={member.key}
              className="glass-panel"
              style={{
                position: 'relative',
                borderRadius: 24,
                padding: '24px',
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div>
                {/* Photo & Rank Badge */}
                <div style={{ position: 'relative', marginBottom: 20 }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1 / 1.08',
                      borderRadius: 18,
                      overflow: 'hidden',
                      background: '#0F1626',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                      priority={member.rank === '01'}
                    />
                    {/* Subtle bottom vignette */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, transparent 60%, rgba(7, 9, 14, 0.85) 100%)',
                      }}
                    />
                  </div>

                  {/* Rank Indicator */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: isRtl ? 'auto' : 12,
                      left: isRtl ? 12 : 'auto',
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(7, 9, 14, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      backdropFilter: 'blur(10px)',
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '1px',
                    }}
                  >
                    RANK #{member.rank}
                  </span>

                  {/* Role Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: isRtl ? 'auto' : 12,
                      left: isRtl ? 12 : 'auto',
                      padding: '5px 12px',
                      borderRadius: 999,
                      background: member.accentGradient,
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 800,
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Sparkles size={11} />
                    <span>{member.badge}</span>
                  </span>
                </div>

                {/* Name with Verified Mark */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 21,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {member.name}
                  </h3>
                  <BadgeCheck size={18} color="#38BDF8" />
                </div>

                {/* Formal Corporate Title */}
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#FC466B',
                    letterSpacing: isRtl ? '0px' : '0.8px',
                    textTransform: isRtl ? 'none' : 'uppercase',
                    marginBottom: 14,
                    lineHeight: 1.4,
                  }}
                >
                  {member.role}
                </div>

                {/* Professional Biography */}
                <p
                  style={{
                    fontSize: 13.5,
                    color: '#94A3B8',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {member.bio}
                </p>
              </div>

              {/* Bottom Verification Tag */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#64748B',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Shield size={12} color="#10B981" />
                  <span>Executive Board</span>
                </span>
                <span style={{ fontWeight: 700, color: '#CBD5E1' }}>ZEV Ecosystem</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
