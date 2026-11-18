'use client';

import React, { useState } from 'react';
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
import { isRtlLocale } from '@/dictionaries';

interface ChildSafetyClientProps {
  locale: string;
}

export const ChildSafetyClient: React.FC<ChildSafetyClientProps> = ({ locale }) => {
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
        ? 'افراد زیر ۱۳ سال مجاز به ایجاد حساب کاربری در زو نیستند. برای کاربران نوجوان (۱۳ تا ۱۷ سال)، پیام‌های مستقیم از افراد ناشناس به طور پیش‌فرض محدود و ریلزهای نمایش داده شده فیلتر می‌شوند.'
        : 'Users under 13 are prohibited from operating standalone accounts. For teenage accounts (ages 13-17), private direct messages from unverified adults are restricted by default.',
      tag: isFa ? 'حریم خصوصی پیش‌فرض نوجوان' : 'Teen Safe Default Mode',
    },
    {
      icon: ShieldCheck,
      title: isFa ? 'گزارش‌دهی فوری و پاسخ‌گویی زیر ۱ ساعت' : 'Priority Abuse Escalation (<1 Hour SLA)',
      desc: isFa
        ? 'تیم واکنش اضطراری ۲۴ ساعته زو گزارش‌های مربوط به سوءاستفاده از کودکان را ظرف کمتر از ۶۰ دقیقه بررسی کرده و دسترسی متخلفان را برای همیشه لغو می‌کند.'
        : 'Our round-the-clock safety division investigates reported violations involving minors within 60 minutes, immediately quarantining abusive accounts and preserving evidence.',
      tag: isFa ? 'بررسی اضطراری ۶۰ دقیقه‌ای' : '60-Minute Rapid Triage',
    },
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#07090E' }}>
      <div className="container">
        {/* Back Link */}
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
            textDecoration: 'none',
          }}
        >
          {isFa ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isFa ? 'بازگشت به صفحه اصلی' : 'Back to Home'}</span>
        </Link>

        {/* Hero Header */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 20,
              background: 'rgba(0, 212, 255, 0.08)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              marginBottom: 16,
            }}
          >
            <ShieldAlert size={14} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 800, color: '#00D4FF' }}>
              {isFa ? 'استاندارد جهانی حفاظت از کودکان و نوجوانان' : 'CHILD SAFETY & PROTECTION STANDARDS'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 50px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 18,
              color: '#FFFFFF',
            }}
          >
            {isFa ? 'تعهد بدون تسامح زِو به ایمنی کودکان' : 'Zero Tolerance for Child Exploitation'}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.65 }}>
            {isFa
              ? 'شبکه اجتماعی زو متعهد به سخت‌گیرانه‌ترین استانداردهای بین‌المللی در محافظت از کودکان در برابر سوءاستفاده، آزار آنلاین و استثمار جنسی (CSAM/CSAE) است.'
              : 'ZEV operates with zero tolerance against child sexual abuse material (CSAM) and online exploitation, in full alignment with global law enforcement.'}
          </p>
        </div>

        {/* Pillars */}
        <div style={{ maxWidth: 860, margin: '0 auto 60px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {safetyPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(13, 18, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 24,
                  padding: '28px 26px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00D4FF',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>{p.title}</h3>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: 'rgba(0, 212, 255, 0.1)',
                      color: '#00D4FF',
                      padding: '3px 8px',
                      borderRadius: 8,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <p style={{ fontSize: 14.5, color: '#94A3B8', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Emergency Report Form Box */}
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1.5px solid rgba(0, 212, 255, 0.3)',
            borderRadius: 28,
            padding: '36px 32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <BadgeAlert size={24} color="#00D4FF" />
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
              {isFa ? 'گزارش اضطراری محتوای مرتبط با ایمنی کودکان' : 'Urgent Child Safety Report Form'}
            </h2>
          </div>
          <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
            {isFa
              ? 'اگر محتوا یا کاربری را مشاهده کردید که سلامت کودکان را به مخاطره می‌اندازد، بلافاصله گزارش فرمایید تا اولویت فوری تیم ایمنی قرار گیرد.'
              : 'Reports regarding minors receive top triage routing and are preserved for international child protection authorities.'}
          </p>

          {reportSubmitted ? (
            <div
              style={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid #00D4FF',
                borderRadius: 18,
                padding: 24,
                textAlign: 'center',
              }}
            >
              <CheckCircle2 size={36} color="#00D4FF" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                {isFa ? 'گزارش شما با اولویت بحرانی ثبت گردید' : 'Critical Report Dispatched'}
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8' }}>
                {isFa
                  ? 'تیم ایمنی زو ظرف چند دقیقه محتوا را بررسی و در صورت تایید ایزوله خواهد کرد.'
                  : 'Our security operators are reviewing the referenced accounts and media.'}
              </div>
            </div>
          ) : (
            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>
                  {isFa ? 'آدرس پست یا نام کاربری متخلف' : 'Content URL or Target Username'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username or https://zevapp.com/reel/..."
                  value={reportForm.username}
                  onChange={(e) => setReportForm({ ...reportForm, username: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 14,
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>
                  {isFa ? 'جزئیات گزارش' : 'Description of Violation'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={isFa ? 'توضیحات تکمیلی...' : 'Provide specific details regarding the safety concern...'}
                  value={reportForm.details}
                  onChange={(e) => setReportForm({ ...reportForm, details: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 14,
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>
                  {isFa ? 'ایمیل شما (جهت پیگیری)' : 'Your Email (For Follow-up)'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="safety@example.com"
                  value={reportForm.email}
                  onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 14,
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '13px 22px',
                  borderRadius: 14,
                  background: '#00D4FF',
                  color: '#07090E',
                  fontSize: 14.5,
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 6px 20px rgba(0, 212, 255, 0.35)',
                  marginTop: 6,
                }}
              >
                <Send size={16} />
                <span>{isFa ? 'ارسال گزارش با اولویت فوری' : 'Submit Priority Report'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
