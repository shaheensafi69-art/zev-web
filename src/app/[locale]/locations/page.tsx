'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  Globe,
  Server,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isFa = isRtlLocale(locale);

  const hubs = [
    {
      region: isFa ? 'منطقه آسیای میانه و خاورمیانه' : 'Central Asia & Middle East Hub',
      city: 'Kabul • Dubai',
      ping: '< 25ms',
      focus: isFa
        ? 'مسیرهای شبکه بهینه‌شده با زبان‌های دری و پښتو، کمترین تاخیر برای تماس‌های صوتی/تصویری و لایو استریمینگ.'
        : 'Dedicated Dari & Pashto localized routing, sub-25ms latency for voice/video calls, and Agora RTC edge relay.',
      tags: ['Kabul Point-of-Presence', 'Dubai GCC Gateway', 'RTC Media Cluster'],
    },
    {
      region: isFa ? 'منطقه اروپا و اتحادیه اروپا' : 'European Union Edge Network',
      city: 'Frankfurt • London • Amsterdam',
      ping: '< 35ms',
      focus: isFa
        ? 'پایبندی ۱۰۰٪ به قوانین حفظ حریم خصوصی GDPR اروپا، دیتاسنترهای گواهی‌شده ISO 27001 و رمزنگاری در حالت استراحت.'
        : 'Full GDPR compliance, ISO 27001 certified edge facilities, and strict EU data residency protections.',
      tags: ['Frankfurt Primary Node', 'London Relay', 'GDPR Shield'],
    },
    {
      region: isFa ? 'شبکه ابری بین‌المللی و CDN سراسری' : 'Global CDN Edge & Cloud Mesh',
      city: '200+ Global Edge Locations',
      ping: '< 40ms Global',
      focus: isFa
        ? 'توزیع بلادرنگ ریلزها و تصاویر با کش لایه ۲، جلوگیری از بافرینگ حتی در اتصالات با اینترنت ۲G/3G.'
        : 'Anycast edge delivery for instant 60fps reel caching, adaptive bitrates, and sub-second asset delivery worldwide.',
      tags: ['Cloudflare Anycast', 'Multi-Region Supabase', 'Adaptive HLS'],
    },
  ];

  const infrastructureMetrics = [
    {
      label: isFa ? 'نقاط حضور CDN در جهان' : 'Global Edge Locations',
      val: '200+ Cities',
      icon: Globe,
    },
    {
      label: isFa ? 'تاخیر لایو استریمینگ' : 'Live Broadcast Latency',
      val: '< 400ms Ultra-Low',
      icon: Zap,
    },
    {
      label: isFa ? 'استاندارد رمزنگاری ذخیره‌سازی' : 'Storage Encryption Standard',
      val: 'AES-256 GCM',
      icon: Lock,
    },
    {
      label: isFa ? 'پایداری و دسترسی‌پذیری' : 'Global SLA Uptime',
      val: '99.98% High Availability',
      icon: Server,
    },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#07090E' }}>
      {/* 6-Tier JSON-LD Schema (SEO, GEO, AIO, AEO, XEO, XIO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'ZEV Global Locations & Infrastructure Mesh',
            url: `https://zevapp.com/${locale}/locations`,
            description:
              'Discover ZEV global edge data centers, regional routing hubs in Kabul, Dubai, and Frankfurt, and compliance standards.',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Where are ZEV servers and data centers located?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'ZEV operates across a multi-region cloud mesh with primary low-latency nodes in Kabul, Dubai, and Frankfurt, backed by 200+ global Anycast edge points for instant reel playback.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is user data in ZEV protected under international privacy laws?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. ZEV adheres to ISO/IEC 27001 data governance and European GDPR principles, utilizing AES-256 storage encryption and Row-Level Security (RLS) data isolation.',
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
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
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
            <Globe size={15} />
            <span>{isFa ? 'زیرساخت ابری و موقعیت‌های منطقه‌ای ZEV' : 'ZEV Global Edge & Regional Infrastructure'}</span>
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
            {isFa ? 'زیرساخت پرسرعت جهانی، متصل به افغانستان و جهان' : 'Global High-Speed Cloud, Built for Worldwide Impact'}
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
              ? 'شبکه اجتماعی ZEV با اتکا به نودهای ابری لبه (Edge CDN) در بیش از ۲۰۰ شهر جهان و مراکز داده اختصاصی در کابل، دبی و اروپا، بالاترین سرعت پخش ریلز و شفاف‌ترین ویدیو کال را تضمین می‌کند.'
              : 'ZEV leverages an Anycast distributed edge network spanning 200+ global cities with dedicated regional hubs in Kabul, Dubai, and Frankfurt, delivering sub-second reel delivery and studio RTC calling.'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginBottom: 70,
          }}
        >
          {infrastructureMetrics.map((item, i) => {
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

        {/* Regional Hubs Cards */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <MapPin size={22} color="#00D4FF" />
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {isFa ? 'هاب‌ها و مراکز داده منطقه‌ای' : 'Regional Edge Hubs & Interconnects'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {hubs.map((hub, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 34px',
                  borderRadius: 24,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 13, color: '#00D4FF', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {hub.region}
                    </span>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
                      {hub.city}
                    </h3>
                  </div>

                  <div
                    style={{
                      padding: '6px 14px',
                      borderRadius: 12,
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#10B981',
                      fontSize: 12.5,
                      fontWeight: 800,
                    }}
                  >
                    Ping: {hub.ping}
                  </div>
                </div>

                <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.7, marginBottom: 18 }}>
                  {hub.focus}
                </p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {hub.tags.map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 10,
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#CBD5E1',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Reliability Commitment */}
        <div
          style={{
            padding: '36px 40px',
            borderRadius: 26,
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(83, 109, 254, 0.08) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: 'rgba(0, 212, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00D4FF',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                {isFa ? 'تعهد به پایداری جهانی و ایزولاسیون داده‌ها' : 'Global High-Availability & Data Governance'}
              </div>
              <p style={{ color: '#94A3B8', fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
                {isFa
                  ? 'تمامی نودهای شبکه ZEV از ایزولاسیون چندلایه‌ای استفاده می‌کنند. دیتابیس مشترک با اکادمی صفی و صافی‌پی با تکثیر لحظه‌ای (Multi-Region Replication) محافظت شده تا کوچک‌ترین قطعی در سراسر جهان احساس نشود.'
                  : 'Every ZEV edge transit point operates under continuous health telemetry and automated failover. The synchronized database cluster ensures seamless single sign-on with Safi Academy with zero single points of failure.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
