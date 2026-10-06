'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Heart, Mail, ExternalLink, Globe, Database, Sparkles, Layers, Lock } from 'lucide-react';
import { isRtlLocale, languages } from '@/dictionaries';

interface FooterProps {
  locale: string;
  dict: any;
}

export const Footer: React.FC<FooterProps> = ({ locale, dict }) => {
  const isFa = isRtlLocale(locale);

  return (
    <footer
      style={{
        backgroundColor: '#07090E',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 80,
        paddingBottom: 40,
        position: 'relative',
        overflow: 'hidden',
        color: '#94A3B8',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: 250,
          background: 'radial-gradient(ellipse at bottom, rgba(252, 70, 107, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Partner Strip: Safi Academy & SafiPay banner */}
        <div
          style={{
            padding: '22px 30px',
            borderRadius: 24,
            background: 'rgba(13, 18, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: '#FC466B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              <Database size={20} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
                {isFa ? 'عضو یکپارچه اکوسیستم بین‌المللی صفی' : 'Unified Member of the Global Safi Ecosystem'}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>
                {isFa
                  ? 'یکپارچه شده با دیتابیس مشترک اکادمی صفی و درگاه‌های پرداخت بین‌المللی صافی‌پی'
                  : 'Interconnected via shared database with Safi Academy & SafiPay'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="https://safiacademy.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94A3B8',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(252, 70, 107, 0.1)',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/assets/safi-academy-logo-clean.png"
                  alt="Safi Academy"
                  width={22}
                  height={22}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span>Safi Academy</span>
              <ExternalLink size={13} color="#FC466B" />
            </a>

            <a
              href="https://safipay.net"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                borderRadius: 12,
                background: '#FC466B',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(252, 70, 107, 0.3)',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  position: 'relative',
                  borderRadius: 6,
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.06)',
                  padding: 2,
                }}
              >
                <Image
                  src="/company/SafiPay.png"
                  alt="SafiPay"
                  width={16}
                  height={16}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span>SafiPay</span>
              <ExternalLink size={13} color="#FFFFFF" />
            </a>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 60,
          }}
        >
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href={`/${locale}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textDecoration: 'none',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(252, 70, 107, 0.2)',
                }}
              >
                <Image
                  src="/assets/icon-clean.png"
                  alt="ZEV Logo"
                  width={34}
                  height={34}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    letterSpacing: '-0.5px',
                  }}
                >
                  ZEV
                </span>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#FC466B',
                    display: 'inline-block',
                    marginLeft: 4,
                  }}
                />
                <div style={{ fontSize: 11, color: '#FC466B', fontWeight: 800 }}>zevapp.com</div>
              </div>
            </Link>

            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              {isFa
                ? 'شبکه اجتماعی پیشرفته نسل جدید با هویت اصیل افغانی و پیوند بین‌المللی. آزادی خلاقیت، ریلزهای پرسرعت و نهایت امنیت.'
                : 'The next generation social network built with pride by Afghan visionaries for global unity. Fast 60fps reels, real people, and authentic connections.'}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 12,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: 12,
                color: '#FC466B',
                fontWeight: 700,
              }}
            >
              <ShieldCheck size={16} />
              <span>{isFa ? 'رمزگذاری کامل داده‌ها (TLS 1.3)' : '100% Encrypted & Safe'}</span>
            </div>
          </div>

          {/* Column: Main Pages */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}
            >
              {dict.footer.quickLinks}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link href={`/${locale}`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/features`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {dict.nav.features}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ecosystem`} style={{ fontSize: 14, color: '#FC466B', fontWeight: 800 }}>
                  {dict.nav.ecosystem}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/child-safety`} style={{ fontSize: 14, color: '#E11D48', fontWeight: 700 }}>
                  {dict.nav.childSafety}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/support`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {dict.nav.support}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Safi Ecosystem */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}
            >
              {isFa ? 'اکوسیستم صفی' : 'Safi Ecosystem'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <a
                  href="https://safiacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    color: '#FC466B',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>Safi Academy</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://safipay.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    color: '#FC466B',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>SafiPay</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://safiinternationalcapitalltd.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13.5, color: '#94A3B8', fontWeight: 600 }}
                >
                  Safi International Capital
                </a>
              </li>
              <li>
                <a
                  href="https://safitopup.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13.5, color: '#94A3B8', fontWeight: 600 }}
                >
                  Safi TopUp
                </a>
              </li>
              <li>
                <a
                  href="https://safipro.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13.5, color: '#94A3B8', fontWeight: 600 }}
                >
                  SafiPro
                </a>
              </li>
              <li>
                <a
                  href="https://shaheensafi.blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13.5, color: '#94A3B8', fontWeight: 600 }}
                >
                  Shaheen Safi Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.safiai.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13.5, color: '#94A3B8', fontWeight: 600 }}
                >
                  Safi AI Platform
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Trust & Legal */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}
            >
              {dict.footer.legal}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link href={`/${locale}/child-safety`} style={{ fontSize: 14, color: '#E11D48', fontWeight: 700 }}>
                  {dict.footer.childSafety}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/delete-account`} style={{ fontSize: 14, color: '#FC466B', fontWeight: 700 }}>
                  {dict.nav.deleteAccount || (isFa ? 'حذف حساب کاربری' : 'Delete Account')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/support`} style={{ fontSize: 14, color: '#94A3B8', fontWeight: 600 }}>
                  {isFa ? 'مرکز گزارش تخلف و امنیت' : 'Security Escalation Desk'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Shared Database & Engineering */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
              }}
            >
              {isFa ? 'دیتابیس ابری مشترک' : 'Shared Cloud Database'}
            </h4>
            <div
              style={{
                padding: '16px 18px',
                borderRadius: 18,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                  }}
                />
                <span style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>
                  Supabase DB Sync 100%
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                {isFa
                  ? 'یک حساب کاربری برای کل اکوسیستم. ورود همزمان در زو و اکادمی صفی با یک ایمیل.'
                  : 'Single Sign-On across ZEV and Safi Academy powered by a synchronized database cluster.'}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#94A3B8' }}>
              <Lock size={14} color="#FC466B" />
              <span>{isFa ? 'رمزنگاری AES-256 در حال استراحت' : 'AES-256 Storage Encryption'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            paddingTop: 30,
            borderTop: '1px solid rgba(252, 70, 107, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ fontSize: 13, color: '#64748B' }}>
            © {new Date().getFullYear()} ZEV Social Network (
            <span style={{ color: '#FC466B', fontWeight: 800 }}>zevapp.com</span>). {dict.footer.copyright}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#94A3B8' }}>
            <span>{isFa ? 'طراحی شده با' : 'Crafted with'}</span>
            <Heart size={14} color="#FC466B" fill="#FC466B" />
            <span>{isFa ? 'توسط مهندسان صفی برای افغانستان و جهان' : 'by Safi Engineers for Afghanistan & the World'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
