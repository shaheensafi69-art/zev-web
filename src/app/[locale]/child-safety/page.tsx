'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  AlertOctagon,
  Users,
  EyeOff,
  PhoneCall,
  Mail,
  Send,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Lock,
  FileCheck,
  Building2,
  ShieldCheck,
  Check,
  ExternalLink,
  LifeBuoy,
  BadgeAlert,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function LocalizedChildSafetyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportForm, setReportForm] = useState({
    url: '',
    username: '',
    details: '',
    email: '',
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
  };

  const safetyPillars = [
    {
      icon: EyeOff,
      title: isFa ? 'پایش هوشمند و تطبیق رسانه‌ای' : 'Automated Hash Matching & Pre-Scan',
      desc: isFa
        ? 'الگوریتم‌های تطبیق هش رسانه‌ای به صورت ۲۴ ساعته هرگونه تصویر یا فایل ویدیویی مشکوک را پیش از ذخیره در سرور شناسایی و از انتشار آن در شبکه به طور خودکار جلوگیری می‌کنند.'
        : 'Automated perceptual hashing and machine learning classifiers inspect video streams and uploaded imagery in real time, preventing unauthorized CSAM materials from ever reaching user feeds.',
      tag: isFa ? 'فیلترینگ لحظه‌ای ۲۴/۷' : 'Real-time 24/7 Filtering',
    },
    {
      icon: Users,
      title: isFa ? 'الزام حداقل سن و حالت امن نوجوانان' : 'Strict Age Gating & Default Protections',
      desc: isFa
        ? 'ثبت‌نام برای افراد زیر ۱۳ سال مطلقاً مسدود است. برای نوجوانان ۱۳ تا ۱۷ سال، تنظیمات حریم خصوصی به طور پیش‌فرض روی حالت فوق‌محافظت‌شده فعال بوده و امکان دریافت پیام خصوصی از غریبه‌ها مسدود است.'
        : 'Registration strictly enforces an age threshold of 13+. Teen accounts (13-17) operate under heightened privacy boundaries with unverified direct messaging and search visibility restricted by default.',
      tag: isFa ? 'تنظیمات پیش‌فرض امن' : 'Default Teen Safe Mode',
    },
    {
      icon: PhoneCall,
      title: isFa ? 'تیم بررسی اضطراری و اقدام فوری' : 'Emergency Triage & Human Review',
      desc: isFa
        ? 'گزارش‌های ثبت‌شده در دسته امنیت کودکان در اولویت رتبه ۱ (Priority 1) قرار داشته و کارشناسان ویژه ما در کمتر از ۶۰ دقیقه اقدام به بررسی، مسدودسازی حساب و حفظ مدارک برای مراجع قضایی می‌نمایند.'
        : 'Child safety escalation alerts are handled on a high-priority emergency queue, reviewed in under 60 minutes with immediate suspension of offending entities and cryptographic evidence preservation.',
      tag: isFa ? 'پاسخ کمتر از ۶۰ دقیقه' : 'Sub-60min Human Triage',
    },
    {
      icon: Lock,
      title: isFa ? 'محدودیت پیشرفته پیام‌رسانی مستقیم' : 'Guarded Direct Messaging',
      desc: isFa
        ? 'بزرگسالان اجازه ارسال پیام به نوجوانانی که در لیست دنبال‌کنندگان متقابل نیستند را ندارند. ارسال لینک‌ها یا تصاویر نامناسب در پیام خصوصی با هوش مصنوعی آنالیز و مسدود می‌گردد.'
        : 'Direct communications between adult profiles and minor accounts are strictly monitored. Accounts lacking mutual social links are prohibited from initiating unsolicited outreach.',
      tag: isFa ? 'ضد ارتباطات مشکوک' : 'Anti-Grooming Heuristics',
    },
    {
      icon: Building2,
      title: isFa ? 'همکاری بین‌المللی با مراجع قانونی' : 'NCMEC & Global Law Enforcement',
      desc: isFa
        ? 'زو به عنوان عضو متعهد به قوانین بین‌المللی حفاظت از کودکان، تمامی تخلفات قطعی را به سازمان‌های رسمی همچون NCMEC و مراجع قانونی محلی و بین‌المللی ارجاع می‌دهد.'
        : 'ZEV transparently coordinates with international child welfare consortia including NCMEC and jurisdictional law enforcement to report unlawful activity and assist in legal investigations.',
      tag: isFa ? 'انطباق جهانی با قوانین' : 'Zero Tolerance Compliance',
    },
    {
      icon: LifeBuoy,
      title: isFa ? 'ابزارهای نظارتی خانواده و والدین' : 'Parental Insights & Safety Tools',
      desc: isFa
        ? 'والدین می‌توانند با فعال‌سازی ابزار پیوند خانوادگی، بر مدت زمان استفاده نوجوان از اپلیکیشن نظارت داشته و محدودیت‌های زمانی و فیلترهای محتوایی دلخواه را اعمال کنند.'
        : 'Guardians can establish supervisory controls to monitor active screen time, configure quiet hours, and restrict discoverability to verified educational and family accounts.',
      tag: isFa ? 'کنترل اختیاری والدین' : 'Family Supervision Suite',
    },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#07090E' }}>
      <div className="container">
        {/* Top Breadcrumb */}
        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: '#94A3B8',
            marginBottom: 28,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FC466B')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
        >
          {isFa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isFa ? 'بازگشت به صفحه اصلی زو' : 'Back to ZEV Home'}</span>
        </Link>

        {/* Hero Section Banner (Pink Box) */}
        <div
          className="pink-box"
          style={{
            padding: '36px clamp(20px, 3vw, 48px)',
            borderRadius: 32,
            background: 'rgba(13, 18, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 12px 35px rgba(252, 70, 107, 0.1)',
            marginBottom: 36,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 999,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: 13,
                fontWeight: 800,
                color: '#FC466B',
              }}
            >
              <ShieldAlert size={15} />
              {isFa ? 'سیاست رسمی و الزام‌آور حفاظت از کودکان و نوجوانان' : 'Official Child Protection Standards & Policies'}
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(252, 70, 107, 0.25)',
                fontSize: 12,
                fontWeight: 700,
                color: '#94A3B8',
              }}
            >
              zevapp.com/child-safety
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#FFFFFF',
              marginBottom: 16,
              letterSpacing: '-0.5px',
            }}
          >
            {isFa ? 'استانداردهای جهانی حفاظت از کودکان و نوجوانان در زو (ZEV)' : 'ZEV Global Child & Minor Safety Standards'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: '#94A3B8',
              maxWidth: 1200,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {isFa
              ? 'پلتفرم اجتماعی زو متعهد به تضمین بالاترین درجه امنیت و کرامت انسانی برای کودکان و نوجوانان در سراسر جهان است. ما سیاست «تحمل صفر مطلق» (Zero Tolerance) را در برابر هرگونه سوءاستفاده، آزار آنلاین، تبلیغ محتوای نامناسب برای خردسالان و رفتارهای شکارچیانه اجرا نموده و با قدرتمندترین فناوری‌های هوش مصنوعی از کاربران جوان محافظت می‌کنیم.'
              : 'ZEV is uncompromisingly dedicated to upholding the highest bar of minor safety, digital dignity, and mental well-being. We enforce an absolute Zero-Tolerance policy toward any Child Sexual Abuse Material (CSAM), cyberbullying, predatory outreach, or age-inappropriate distribution across our global network.'}
          </p>
        </div>

        {/* Emergency Alert Strip */}
        <div
          className="pink-box"
          style={{
            padding: '20px 28px',
            borderRadius: 22,
            background: 'rgba(13, 18, 30, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            boxShadow: '0 8px 25px rgba(252, 70, 107, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                background: '#FC466B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
                boxShadow: '0 4px 15px rgba(252, 70, 107, 0.3)',
              }}
            >
              <AlertOctagon size={24} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF' }}>
                {isFa ? 'رسیدگی اضطراری کمتر از ۱ ساعت' : 'Urgent Safety Escalation Protocol'}
              </div>
              <div style={{ fontSize: 13.5, color: '#94A3B8', marginTop: 2 }}>
                {isFa
                  ? 'گزارش‌های سوءاستفاده از کودکان فوراً به صورت خودکار به تیم امنیتی ارجاع و منجر به مسدودسازی حساب، ضبط IP و ارسال به NCMEC می‌گردد.'
                  : 'Incidents flagged for minor endangerment trigger automated account freeze, IP logging, and instantaneous notification of NCMEC & law enforcement.'}
              </div>
            </div>
          </div>

          <a
            href="#report-form"
            className="btn-primary"
            style={{
              padding: '10px 22px',
              fontSize: 13.5,
            }}
          >
            <BadgeAlert size={16} />
            <span>{isFa ? 'ثبت گزارش فوری' : 'File Emergency Report'}</span>
          </a>
        </div>

        {/* Main Content Layout: 2 Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.65fr) minmax(360px, 1fr)',
            gap: 36,
            alignItems: 'start',
          }}
          className="child-safety-grid"
        >
          {/* Left Column: 6 Pillars Grid + Legal Commitments */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  marginBottom: 8,
                }}
              >
                {isFa ? 'اصول شش‌گانه تضمین سلامت و امنیت کودکان در زو' : 'ZEV Six-Pillar Safety Architecture'}
              </h2>
              <p style={{ fontSize: 15, color: '#94A3B8' }}>
                {isFa
                  ? 'تمامی این تدابیر به صورت سخت‌گیرانه و غیرقابل دور زدن در نسخه وب، اندروید، iOS و دسکتاپ فعال هستند.'
                  : 'All security layers are architected directly into the Flutter runtime and Supabase cloud infrastructure.'}
              </p>
            </div>

            {/* 6 Pillars in 2 Columns (Pink Boxes) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: 20,
                marginBottom: 36,
              }}
            >
              {safetyPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={i}
                    className="pink-box"
                    style={{
                      padding: 24,
                      borderRadius: 24,
                      background: 'rgba(13, 18, 30, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 6px 20px rgba(252, 70, 107, 0.08)',
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
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: '#FC466B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            boxShadow: '0 4px 15px rgba(252, 70, 107, 0.3)',
                          }}
                        >
                          <Icon size={22} />
                        </div>
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: 'rgba(13, 18, 30, 0.75)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#FC466B',
                          }}
                        >
                          {pillar.tag}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: 17,
                          fontWeight: 900,
                          color: '#FFFFFF',
                          marginBottom: 8,
                          lineHeight: 1.35,
                        }}
                      >
                        {pillar.title}
                      </h3>

                      <p
                        style={{
                          fontSize: 14,
                          color: '#94A3B8',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legal Commitments & Zero-Tolerance Box */}
            <div
              className="pink-box"
              style={{
                padding: '32px 32px',
                borderRadius: 28,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: 30,
                boxShadow: '0 10px 30px rgba(252, 70, 107, 0.1)',
              }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginBottom: 14 }}>
                {isFa ? 'تعهد قانونی و همکاری با سازمان‌های بین‌المللی' : 'Statutory Obligations & International Cooperation'}
              </h3>
              <p style={{ fontSize: 14.5, color: '#CBD5E1', lineHeight: 1.8, marginBottom: 20 }}>
                {isFa
                  ? 'بر اساس قوانین بین‌المللی و تعهدات ما نسبت به استانداردهای فروشگاه‌های Google Play و Apple App Store، هرگونه تخلف مرتبط با کودکان بلافاصله با تمام اطلاعات هویتی و ردپای فنی شامل آدرس‌های آی‌پی و مشخصات دستگاه‌ها ثبت شده و در اختیار مراجع قانونی صلاحیت‌دار قرار خواهد گرفت.'
                  : 'In compliance with international child welfare conventions and major application platform requirements, ZEV maintains non-negotiable logging protocols for illicit activities, expediting lawful submittal of forensic records to domestic and international child defense bodies.'}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 14,
                  padding: 18,
                  borderRadius: 18,
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={18} color="#FC466B" />
                  <span style={{ fontSize: 13.5, color: '#FFFFFF', fontWeight: 700 }}>
                    {isFa ? 'انطباق کامل با دستورالعمل NCMEC' : 'NCMEC Reporting Framework'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={18} color="#FC466B" />
                  <span style={{ fontSize: 13.5, color: '#FFFFFF', fontWeight: 700 }}>
                    {isFa ? 'مطابق با استاندارد COPPA' : 'COPPA Compliant Age Protection'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={18} color="#FC466B" />
                  <span style={{ fontSize: 13.5, color: '#FFFFFF', fontWeight: 700 }}>
                    {isFa ? 'پایش هوشمند فیلتر محتوا' : 'Automated Content Safety Guardrails'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={18} color="#FC466B" />
                  <span style={{ fontSize: 13.5, color: '#FFFFFF', fontWeight: 700 }}>
                    {isFa ? 'مسدودسازی سخت‌افزاری دستگاه' : 'Hardware & IMEI Device Banning'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Report Form & Direct Contact Info */}
          <div
            id="report-form"
            style={{
              position: 'sticky',
              top: 105,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            {/* Incident Report Box */}
            <div
              className="pink-box"
              style={{
                padding: 30,
                borderRadius: 28,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 12px 35px rgba(252, 70, 107, 0.15)',
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#FC466B',
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '4px 12px',
                    borderRadius: 999,
                    marginBottom: 8,
                  }}
                >
                  <ShieldAlert size={14} />
                  <span>{isFa ? 'فرم گزارش اورژانسی' : 'Emergency Report Desk'}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
                  {isFa ? 'گزارش تخلف یا سوءاستفاده' : 'Submit Safety Report'}
                </h3>
                <p style={{ fontSize: 13.5, color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>
                  {isFa
                    ? 'مشاهده هرگونه محتوا یا پروفایل مشکوک مرتبط با خردسالان را فوراً با لینک یا نام کاربری گزارش دهید.'
                    : 'Report suspicious behavior, predatory contact, or underage exploitation. All submittals are handled anonymously and promptly.'}
                </p>
              </div>

              {reportSubmitted ? (
                <div
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1.5px solid #FC466B',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 999,
                      background: '#FC466B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 14px',
                      color: '#FFFFFF',
                    }}
                  >
                    <Check size={26} />
                  </div>
                  <h4 style={{ fontSize: 17, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
                    {isFa ? 'گزارش شما با موفقیت دریافت شد' : 'Report Received Successfully'}
                  </h4>
                  <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                    {isFa
                      ? 'تیم حراست و کارشناسان امنیتی زو فوراً اطلاعات ارائه شده را ارزیابی و اقدامات لازم را اعمال خواهند کرد.'
                      : 'Our dedicated child safety unit is reviewing the evidence. High-priority interventions are being enacted.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                      {isFa ? 'لینک پست / استوری یا پروفایل متخلف' : 'Profile URL or Post Link'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://zevapp.com/@username..."
                      value={reportForm.url}
                      onChange={(e) => setReportForm({ ...reportForm, url: e.target.value })}
                      className="input-field"
                      style={{ fontSize: 14, padding: '11px 14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                      {isFa ? 'نام کاربری حساب مشکوک (اختیاری)' : 'Suspect Username (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder="@username"
                      value={reportForm.username}
                      onChange={(e) => setReportForm({ ...reportForm, username: e.target.value })}
                      className="input-field"
                      style={{ fontSize: 14, padding: '11px 14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                      {isFa ? 'توضیحات و نوع تخلف' : 'Incident Details'} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={isFa ? 'شرح مختصری از مورد مشاهده شده بنویسید...' : 'Please describe what you observed...'}
                      value={reportForm.details}
                      onChange={(e) => setReportForm({ ...reportForm, details: e.target.value })}
                      className="input-field"
                      style={{ fontSize: 14, padding: '11px 14px', resize: 'vertical' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                      {isFa ? 'ایمیل شما (جهت پیگیری وضعیت گزارش)' : 'Your Email (For Follow-up)'} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={reportForm.email}
                      onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                      className="input-field"
                      style={{ fontSize: 14, padding: '11px 14px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    <Send size={16} />
                    <span>{isFa ? 'ارسال گزارش با اولویت ۱' : 'Submit Priority 1 Report'}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Official Contact Cards (Pink Box) */}
            <div
              className="pink-box"
              style={{
                padding: 22,
                borderRadius: 24,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <h4 style={{ fontSize: 15, fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>
                {isFa ? 'کانال‌های مستقیم تماس امنیتی' : 'Direct Child Safety Desk'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href="mailto:safety@zevapp.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 14,
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontSize: 13.5,
                  }}
                >
                  <Mail size={18} color="#FC466B" />
                  <div>
                    <div style={{ fontWeight: 800, color: '#FFFFFF' }}>safety@zevapp.com</div>
                    <div style={{ fontSize: 11.5, color: '#64748B' }}>{isFa ? 'ایمیل مستقیم تیم امنیت' : 'Direct Escalation Email'}</div>
                  </div>
                </a>

                <a
                  href="mailto:legal@zevapp.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 14px',
                    borderRadius: 14,
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontSize: 13.5,
                  }}
                >
                  <FileCheck size={18} color="#FC466B" />
                  <div>
                    <div style={{ fontWeight: 800, color: '#FFFFFF' }}>legal@zevapp.com</div>
                    <div style={{ fontSize: 11.5, color: '#64748B' }}>{isFa ? 'واحد حقوقی و انطباق قوانین' : 'Compliance & Legal Counsel'}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
