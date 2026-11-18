'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  Code2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Lock,
  Cpu,
  Clock,
  Sparkles,
  Mail,
  CheckCircle2,
  Terminal,
  Layers,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function ApiInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const isFa = isRtlLocale(locale);

  const securityReasons = [
    {
      icon: Lock,
      title: isFa ? 'حفاظت حداکثری از داده‌ها و حریم خصوصی' : 'Zero-Scraping Data Privacy',
      desc: isFa
        ? 'برای جلوگیری از جمع‌آوری خودکار اطلاعات شخصی (Data Scraping) و نقض حریم کاربران، درگاه‌های عمومی API بدون احراز هویت شریک مسدود است.'
        : 'To prevent unauthorized automated scraping and bulk profile harvesting, public query interfaces remain strictly closed.',
    },
    {
      icon: Cpu,
      title: isFa ? 'عدم ارائه سرورهای MCP عمومی' : 'No Public MCP Server Endpoints',
      desc: isFa
        ? 'پروتکل متنی هوش مصنوعی (Model Context Protocol - MCP) به عنوان سرور عمومی برای مدل‌های هوش مصنوعی شخص ثالث ارائه نمی‌شود.'
        : 'Model Context Protocol (MCP) servers and third-party AI crawler integrations are not accessible via open public endpoints.',
    },
    {
      icon: ShieldAlert,
      title: isFa ? 'تضمین عملکرد بلادرنگ ۶۰ فریم و پایداری شبکه' : 'Guaranteed 60fps RTC Stability',
      desc: isFa
        ? 'ترافیک سرورها منحصراً به کلاینت‌های رسمی ZEV و استریمینگ ویدیو کال و لایو اختصاص دارد تا کوچک‌ترین افت کیفیتی رخ ندهد.'
        : 'Bandwidth and low-latency infrastructure are exclusively reserved for official first-party mobile and web clients.',
    },
    {
      icon: Layers,
      title: isFa ? 'حفاظت از اکوسیستم مشترک اکادمی صفی' : 'Unified Ecosystem Safeguards',
      desc: isFa
        ? 'دیتابیس مشترک با اکادمی صفی و تراکنش‌های صافی‌پی نیازمند بالاترین پروتکل‌های ایزولاسیون امنیتی است.'
        : 'Interconnected academic records and verified creator wallets enforce strict isolation boundaries.',
    },
  ];

  const roadmapPhases = [
    {
      phase: isFa ? 'فاز ۱ (وضعیت فعلی)' : 'Phase 1 (Current Status)',
      badge: isFa ? 'بسته / درون‌سازمانی' : 'Closed / First-Party Only',
      badgeColor: '#F59E0B',
      title: isFa ? 'دسترسی اختصاصی کلاینت‌های رسمی' : 'Exclusive First-Party Client Operations',
      desc: isFa
        ? 'کلیه عملیات ثبت‌نام، فید، چت، ریلز و تماس‌ها منحصراً از طریق اپلیکیشن‌های رسمی iOS، Android و وب‌اپ ZEV انجام می‌گیرد.'
        : 'All social interactions, media uploads, and messaging operate exclusively through signed first-party client applications.',
    },
    {
      phase: isFa ? 'فاز ۲ (در دست توسعه)' : 'Phase 2 (Under Development)',
      badge: isFa ? 'بزودی' : 'Coming Soon',
      badgeColor: '#00D4FF',
      title: isFa ? 'برنامه شرکای تجاری و آموزشی تایید شده' : 'Verified Educational & Business Partner Gateway',
      desc: isFa
        ? 'ارائه وب‌هوک‌ها و ابزارهای تایید هویت شرکتی برای مراکز آموزشی، سازمان‌ها و ناشران محتوا پس از ممیزی امنیتی.'
        : 'Selected academic institutions, verified advertisers, and enterprise partners will receive sandboxed webhook access.',
    },
    {
      phase: isFa ? 'فاز ۳ (آینده)' : 'Phase 3 (Future Roadmap)',
      badge: isFa ? 'برنامه‌ریزی شده' : 'Planned',
      badgeColor: '#536DFE',
      title: isFa ? 'بسته‌های توسعه نرم‌افزار رسمی (ZEV SDKs)' : 'Official ZEV Developer SDKs & Developer Hub',
      desc: isFa
        ? 'ارائه مستندات فنی و SDKهای استاندارد برای یکپارچه‌سازی وب و اپلیکیشن همراه با کلیدهای API کنترل‌شده.'
        : 'Production SDKs, developer documentation, and rate-limited developer tokens for verified ecosystem developers.',
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
            name: 'ZEV Developer Platform & API Status',
            url: `https://zevapp.com/${locale}/api-info`,
            description:
              'Official announcement regarding ZEV public APIs and Model Context Protocol (MCP). Currently, ZEV does not offer public API or MCP servers to third parties.',
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Does ZEV offer a public API?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. At this time, ZEV does not offer public REST or GraphQL APIs for third-party developers. Access is restricted to official first-party mobile and web applications.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does ZEV provide Model Context Protocol (MCP) tools or servers?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. ZEV does not provide public MCP (Model Context Protocol) servers or endpoints for external AI agents or automated bots.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How can developers register interest for future ZEV APIs?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Developers and partner organizations can contact the ZEV engineering desk at developers@zevapp.com to register interest for upcoming private beta partner programs.',
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
          {/* Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 20px',
              borderRadius: 30,
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              color: '#F59E0B',
              fontSize: 13.5,
              fontWeight: 800,
              marginBottom: 24,
              letterSpacing: '0.3px',
            }}
          >
            <AlertTriangle size={16} />
            <span>{isFa ? 'اطلاعیه رسمی: عدم ارائه عمومی API و MCP' : 'Notice: Public API & MCP Currently Closed'}</span>
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
            {isFa ? 'وضعیت پلتفرم توسعه‌دهندگان و API زو' : 'ZEV Developer Platform & API Status'}
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
              ? 'در حال حاضر، شبکه اجتماعی ZEV هیچ‌گونه درگاه عمومی API، سرویس‌های وب‌سرویس عمومی یا سرورهای MCP (پروتکل زمینه مدل‌های هوش مصنوعی) به برنامه‌نویسان و اشخاص ثالث ارائه نمی‌کند.'
              : 'At this time, ZEV does not offer public REST/GraphQL APIs or Model Context Protocol (MCP) server endpoints for third-party automated access. All infrastructure is exclusively dedicated to official ZEV applications.'}
          </p>
        </div>

        {/* Official Status Statement Box */}
        <div
          style={{
            padding: '32px 36px',
            borderRadius: 24,
            background: 'rgba(14, 20, 36, 0.75)',
            border: '1px solid rgba(0, 212, 255, 0.25)',
            marginBottom: 70,
            backdropFilter: 'blur(16px)',
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
              <Terminal size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
                {isFa ? 'بیانیه مهندسی و سیاست دسترسی ZEV' : 'Engineering & Data Boundary Policy'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                {isFa
                  ? 'تمامی خدمات، پایگاه داده‌های ابری و جریان‌های داده چندرسانه‌ای ZEV منحصراً از طریق کلاینت‌های مجاز و کامپایل‌شده (اپلیکیشن‌های رسمی iOS و Android در کنار وب‌اپ zevapp.com) تبادل می‌گردند. اتصال ربات‌های بدون مجوز، اسکریپت‌های کاوشگر و هوش‌های مصنوعی متفرقه به دیتابیس‌ها و جریان‌های پیام‌رسانی ZEV کاملاً مسدود و محافظت شده است.'
                  : 'All social media interactions, multimedia streaming pipelines, and encrypted databases operate strictly through authenticated, signature-verified official ZEV client builds. Unauthorized automated scraping, bot networks, and external AI agents are proactively blocked at our cloud boundary to guarantee safety and performance.'}
              </p>
            </div>
          </div>
        </div>

        {/* Why Closed Access? (4 Pillars) */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
              {isFa ? 'چرا دسترسی عمومی به API و MCP محدود است؟' : 'Why Public APIs & MCP Are Currently Restricted'}
            </h2>
            <p style={{ color: '#64748B', fontSize: 15 }}>
              {isFa ? 'اولویت‌های اصلی معماری سیستم شبکه اجتماعی ZEV' : 'Core architecture priorities for the ZEV network'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            {securityReasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: '28px 24px',
                    borderRadius: 22,
                    background: 'rgba(14, 20, 36, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      background: 'rgba(0, 212, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#00D4FF',
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
                    {reason.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Developer Roadmap */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <Clock size={22} color="#00D4FF" />
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
              {isFa ? 'نقشه راه توسعه درگاه‌های آینده' : 'Future Developer & Integration Roadmap'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {roadmapPhases.map((phase, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 30px',
                  borderRadius: 22,
                  background: 'rgba(14, 20, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: '#64748B', fontWeight: 700 }}>{phase.phase}</span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 12,
                      background: `${phase.badgeColor}1A`,
                      border: `1px solid ${phase.badgeColor}4D`,
                      color: phase.badgeColor,
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {phase.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                  {phase.title}
                </h3>
                <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Interest Registration */}
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
              {isFa ? 'ثبت علاقه‌مندی برای دسترسی توسعه‌دهندگان' : 'Register Interest for Future Developer Access'}
            </div>
            <p style={{ color: '#94A3B8', fontSize: 14.5, margin: 0, maxWidth: 640 }}>
              {isFa
                ? 'سازمان‌های آموزشی و شرکای فنی که مایل به اتصال تاییدشده به ZEV در مراحل آینده هستند، می‌توانند با تیم فنی در تماس باشند.'
                : 'Educational platforms and verified commercial partners seeking future sandbox integrations may reach our developer desk.'}
            </p>
          </div>

          <a
            href="mailto:developers@zevapp.com"
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
            <span>developers@zevapp.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
