'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Award, Shield, Sparkles, ExternalLink, Code2 } from 'lucide-react';
import { isRtlLocale } from '@/dictionaries';

interface TeamSectionProps {
  locale: string;
  dict: any;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ locale, dict }) => {
  const isFa = isRtlLocale(locale);

  const leaders = [
    {
      name: isFa ? 'شاهین صفی' : 'Shaheen Safi',
      role: isFa ? 'بنیان‌گذار و مدیرعامل (Founder & CEO)' : 'FOUNDER & CHIEF EXECUTIVE OFFICER',
      image: '/team/shaheen.jpeg',
      badge: isFa ? 'بنیان‌گذار ارشد' : 'Lead Founder',
      accentColor: '#FC466B',
      bio: isFa
        ? 'معمار ارشد نرم‌افزار، بنیان‌گذار پلتفرم بین‌المللی صفی اکادمی و زو. با سال‌ها تجربه در هوش مصنوعی، فلاتر و سیستم‌های مقیاس‌پذیر ابری.'
        : 'Lead Software Architect, Founder of Safi Academy and ZEV. Pioneering scalable cloud backends, Flutter universal architectures, and digital empowerment.',
    },
    {
      name: isFa ? 'ساحل سالم' : 'Sahel Salem',
      role: isFa ? 'هم‌بنیان‌گذار و مدیر توسعه اکوسیستم' : 'CO-FOUNDER & ECOSYSTEM PARTNERSHIPS',
      image: '/team/sahel.jpeg',
      badge: isFa ? 'هم‌بنیان‌گذار' : 'Co-Founder',
      accentColor: '#FC466B',
      bio: isFa
        ? 'مدیر استراتژی و گسترش همکاری‌های بین‌المللی در اکوسیستم صفی، متمرکز بر اتصال جوامع بین‌المللی و جذب پارتنرهای جهانی.'
        : 'Co-Founder leading ecosystem integration, corporate alliances, and creator community relations across international markets.',
    },
    {
      name: isFa ? 'مجتبی رحمانی' : 'Mujtaba Rahmani',
      role: isFa ? 'مدیر عملیات و امنیت سایبری (COO & CISO)' : 'CHIEF OPERATING OFFICER & CISO',
      image: '/team/mujtaba.jpeg',
      badge: isFa ? 'مدیر ارشد امنیت' : 'COO & Security Lead',
      accentColor: '#FC466B',
      bio: isFa
        ? 'رهبر فنی امنیت داده‌ها و معماری سرور، ناظر بر پروتکل‌های رمزنگاری و نظارت بر محافظت از حریم خصوصی کاربران در زو.'
        : 'Overseeing global operations, data encryption pipelines, and CSAM prevention standards to ensure an uncompromised safe social platform.',
    },
    {
      name: isFa ? 'شیرین گل احمدی' : 'Shirin Gol Ahmadi',
      role: isFa ? 'مدیر ارشد خلاقیت و هوش مصنوعی' : 'CHIEF CREATIVE OFFICER & AI LEAD',
      image: '/team/shirin.jpeg',
      badge: isFa ? 'طراحی و AI' : 'Design & AI Lead',
      accentColor: '#FC466B',
      bio: isFa
        ? 'هدایت‌کننده جلوه‌های بصری، طراحی تجربه کاربری ۶۰ فریم و یکپارچه‌سازی ابزارهای خلاقانه هوش مصنوعی در استودیو ریلز.'
        : 'Guiding the modern visual aesthetics, 60fps interaction paradigms, and generative AI creative toolsets for reels and feeds.',
    },
  ];

  return (
    <section id="leadership" style={{ position: 'relative', padding: '90px 0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 780, margin: '0 auto 60px' }}>
          <div className="badge-pill">
            <Users size={14} />
            <span>{dict.team.tag}</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 16,
              color: '#000000',
            }}
          >
            {dict.team.title}
          </h2>
          <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.6 }}>
            {dict.team.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
          }}
        >
          {leaders.map((member, idx) => (
            <div
              key={idx}
              className="pink-box"
              style={{
                borderRadius: 28,
                padding: '28px 24px',
                background: '#FFF7F9',
                border: '1.5px solid rgba(252, 70, 107, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 25px rgba(252, 70, 107, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                {/* Photo & Badge */}
                <div style={{ position: 'relative', marginBottom: 20 }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1 / 1.05',
                      borderRadius: 22,
                      overflow: 'hidden',
                      background: '#FFF1F4',
                      border: '2px solid rgba(252, 70, 107, 0.4)',
                      boxShadow: '0 6px 20px rgba(252, 70, 107, 0.2)',
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <span
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: isFa ? 'auto' : 12,
                      left: isFa ? 12 : 'auto',
                      padding: '5px 12px',
                      borderRadius: 999,
                      background: '#FC466B',
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 800,
                      boxShadow: '0 4px 12px rgba(252, 70, 107, 0.4)',
                    }}
                  >
                    {member.badge}
                  </span>
                </div>

                {/* Name & Title */}
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: '#000000',
                    marginBottom: 4,
                  }}
                >
                  {member.name}
                </h3>
                <div
                  style={{
                    fontSize: 11.5,
                    fontWeight: 800,
                    color: '#FC466B',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  {member.role}
                </div>

                <p
                  style={{
                    fontSize: 13.5,
                    color: '#334155',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
