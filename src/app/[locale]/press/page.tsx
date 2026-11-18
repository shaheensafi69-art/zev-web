'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Newspaper,
  ArrowRight,
  ArrowLeft,
  Download,
  Mail,
  ShieldCheck,
  Globe,
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isFa = isRtlLocale(locale);

  const pressReleases = [
    {
      date: 'November 2026',
      title: isFa
        ? 'زو (ZEV) نسل جدید شبکه اجتماعی اختصاصی با موتور ۶۰ فریم و هویت بین‌المللی را معرفی کرد'
        : 'ZEV Unveils Flagship Cross-Platform Social Network with 60fps Native Performance',
      summary: isFa
        ? 'زو با معماری فوق‌سریع فلاتر، رمزنگاری پیشرفته و پایگاه داده مشترک با اکادمی صفی، مرزهای شبکه‌های اجتماعی مدرن را جابجا می‌کند.'
        : 'Engineered for seamless cross-platform performance, ZEV introduces ultra-low-latency reels, studio video calling, and banking-grade security.',
      tag: isFa ? 'اطلاعیه رسمی' : 'Official Launch',
    },
    {
      date: 'October 2026',
      title: isFa
        ? 'یکپارچه‌سازی پایگاه داده سراسری با اکوسیستم بین‌المللی صفی و صفی‌پی'
        : 'Strategic Single Sign-On & Database Unification with Safi Academy and SafiPay',
      summary: isFa
        ? 'کاربران زو اکنون می‌توانند با یک حساب کاربری مشترک به صدها دوره آموزشی، درگاه‌های پرداخت بین‌المللی و تیک‌های تایید رسمی متصل شوند.'
        : 'Over 200,000 students and creators receive instant SSO verification, academic badges, and direct monetization capabilities.',
      tag: isFa ? 'اکوسیستم' : 'Ecosystem',
    },
    {
      date: 'September 2026',
      title: isFa
        ? 'استقرار سیستم پخش زنده با تاخیر فوق‌العاده پایین (Ultra-Low Latency RTC)'
        : 'Deployment of Sub-400ms Agora RTC Live Broadcasting Engine',
      summary: isFa
        ? 'سیستم جدید پخش زنده زو با تنظیمات صدای گیمینگ و انکودر ویدیویی ۳۰ فریم بر ثانیه، کیفیتی در تراز جهانی ارائه می‌دهد.'
        : 'Achieving studio acoustic clarity and 30fps adaptive dual-stream video for global creator broadcasts.',
      tag: isFa ? 'فناوری' : 'Technology',
    },
  ];

  const brandAssets = [
    {
      title: isFa ? 'لوگوی رسمی ZEV (باکیفیت بالا)' : 'Official ZEV Primary Logo',
      format: 'PNG & SVG (1024x1024)',
      preview: '/assets/icon-clean.png',
      url: '/assets/icon-clean.png',
    },
    {
      title: isFa ? 'بنر معرفی رسمی زو' : 'Official ZEV Showcase Banner',
      format: 'High-Res Landscape (1600x800)',
      preview: '/app-shots/8.jpeg',
      url: '/app-shots/8.jpeg',
    },
    {
      title: isFa ? 'اسکرین‌شات‌های رابط کاربری اپ' : 'App UI Interface Showcase',
      format: 'Mobile HD Pack (738x1600)',
      preview: '/app-shots/1.jpeg',
      url: '/app-shots/1.jpeg',
    },
  ];

  const brandColors = [
    { name: 'ZEV Electric Blue', hex: '#00D4FF', role: isFa ? 'رنگ اصلی برند' : 'Primary Accent' },
    { name: 'ZEV Royal Blue', hex: '#536DFE', role: isFa ? 'گرادینت ثانویه' : 'Secondary Accent' },
    { name: 'Deep Space Navy', hex: '#080D1A', role: isFa ? 'پس‌زمینه و تیترها' : 'Deep Background' },
    { name: 'Slate Dark Card', hex: '#141721', role: isFa ? 'کارت‌ها و پنل‌ها' : 'Surface Cards' },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#07090E' }}>
      {/* Dynamic 6-Tier JSON-LD Schema (SEO, GEO, AIO, AEO, XEO, XIO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsMediaOrganization',
            name: 'ZEV Press & Media Center',
            url: `https://zevapp.com/${locale}/press`,
            logo: 'https://zevapp.com/assets/icon-clean.png',
            parentOrganization: {
              '@type': 'Organization',
              name: 'Sahib Group',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'press@zevapp.com',
              contactType: 'media relations',
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is ZEV?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ZEV is a next-generation high-performance social media platform founded by Shaheen Safi and Sahib Group, offering 60fps Reels, HD video calling, encrypted messaging, and synchronized cloud infrastructure with Safi Academy.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How can media outlets contact ZEV for press inquiries?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Journalists, publishers, and media representatives can reach the ZEV media team at press@zevapp.com for official statements, interviews, and press kits.',
                  },
                },
              ],
            },
          }),
        }}
      />

      <div className="container">
        {/* Top Back Navigation */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#00D4FF',
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 36,
            textDecoration: 'none',
          }}
        >
          {isFa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isFa ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
        </Link>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 64px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 30,
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              color: '#00D4FF',
              fontSize: 13,
              fontWeight: 800,
              marginBottom: 20,
              letterSpacing: '0.3px',
            }}
          >
            <Newspaper size={15} />
            <span>{isFa ? 'اتاق خبر و مرکز رسانه‌ای ZEV' : 'ZEV Newsroom & Press Kit'}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: '-0.8px',
            }}
          >
            {isFa ? 'اخبار رسمی، بیانیه‌ها و دارایی‌های برند زو' : 'Official News, Press Releases & Brand Assets'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: '#94A3B8',
              lineHeight: 1.7,
              margin: '0 auto',
            }}
          >
            {isFa
              ? 'مرکز اخبار موثق، منابع تصویری رسمی، اعلامیه‌ها و ارتباط با تیم رسانه‌ای شبکه اجتماعی ZEV از گروه صاحب.'
              : 'The authoritative source for ZEV news announcements, executive statements, official logo kits, and journalist resources.'}
          </p>
        </div>

        {/* Key Metrics / Quick Facts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginBottom: 70,
          }}
        >
          {[
            {
              label: isFa ? 'بنیان‌گذار و سازمان مادری' : 'Founded & Parent Group',
              val: 'Shaheen Safi • Sahib Group',
              icon: Award,
            },
            {
              label: isFa ? 'پلتفرم‌های فعال' : 'Platforms Supported',
              val: 'Android • iOS • Web (Flutter 60fps)',
              icon: Layers,
            },
            {
              label: isFa ? 'اکوسیستم یکپارچه' : 'Unified Ecosystem',
              val: 'Safi Academy & SafiPay',
              icon: Globe,
            },
            {
              label: isFa ? 'امنیت و حفظ حریم خصوصی' : 'Security Standards',
              val: 'AES-256 Storage & RLS Isolation',
              icon: ShieldCheck,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  padding: '24px 22px',
                  borderRadius: 20,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: 'rgba(0, 212, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00D4FF',
                    marginBottom: 14,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 600, marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 16, color: '#FFFFFF', fontWeight: 800 }}>
                  {item.val}
                </div>
              </div>
            );
          })}
        </div>

        {/* Press Releases Section */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <FileText size={22} color="#00D4FF" />
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {isFa ? 'آخرین اطلاعیه‌ها و بیانیه‌های خبری' : 'Recent Press Releases & Updates'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {pressReleases.map((pr, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 30px',
                  borderRadius: 22,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'transform 0.2s, border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.18), rgba(83, 109, 254, 0.18))',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#00D4FF',
                      fontSize: 11.5,
                      fontWeight: 800,
                    }}
                  >
                    {pr.tag}
                  </span>
                  <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{pr.date}</span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: '#FFFFFF', marginBottom: 10, lineHeight: 1.4 }}>
                  {pr.title}
                </h3>
                <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                  {pr.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Assets & Guidelines */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <Download size={22} color="#00D4FF" />
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {isFa ? 'بسته دارایی‌های گرافیکی و مدیا کیت' : 'Official Brand Assets & Media Kit'}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              marginBottom: 40,
            }}
          >
            {brandAssets.map((asset, i) => (
              <div
                key={i}
                style={{
                  padding: 22,
                  borderRadius: 22,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 180,
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#0B0F19',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={asset.preview}
                    alt={asset.title}
                    fill
                    style={{ objectFit: 'contain', padding: 12 }}
                  />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>
                  {asset.title}
                </div>
                <div style={{ fontSize: 12.5, color: '#64748B', marginBottom: 16 }}>
                  {asset.format}
                </div>
                <a
                  href={asset.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
                    color: '#080D1A',
                    fontSize: 13,
                    fontWeight: 800,
                    textDecoration: 'none',
                  }}
                >
                  <Download size={15} />
                  <span>{isFa ? 'دانلود مستقیم فایل' : 'Download Asset'}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Color Palette Card */}
          <div
            style={{
              padding: '24px 28px',
              borderRadius: 22,
              background: 'rgba(14, 20, 36, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 16 }}>
              {isFa ? 'رنگ‌های رسمی برند ZEV' : 'ZEV Official Brand Palette'}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
              }}
            >
              {brandColors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 12,
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: c.hex,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>{c.name}</div>
                    <div style={{ fontSize: 11.5, color: '#64748B', fontFamily: 'monospace' }}>
                      {c.hex} • {c.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Inquiries Card */}
        <div
          style={{
            padding: '36px 40px',
            borderRadius: 26,
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(83, 109, 254, 0.08) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
              {isFa ? 'ارتباط با بخش روابط عمومی و رسانه‌ها' : 'Media Inquiries & Press Relations'}
            </div>
            <p style={{ color: '#94A3B8', fontSize: 14.5, margin: 0, maxWidth: 600 }}>
              {isFa
                ? 'خبرنگاران و فعالان رسانه‌ای می‌توانند برای مصاحبه با مدیریت ارشد، دریافت بیانیه‌های رسمی یا درخواست کیت رسانه‌ای کامل با ما در تماس باشند.'
                : 'For journalist interviews, official commentary, or high-resolution custom media packages, please contact our global communications desk.'}
            </p>
          </div>

          <a
            href="mailto:press@zevapp.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
              color: '#080D1A',
              fontSize: 15,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0, 212, 255, 0.25)',
            }}
          >
            <Mail size={18} />
            <span>press@zevapp.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
