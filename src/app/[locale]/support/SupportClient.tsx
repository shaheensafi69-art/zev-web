'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Bug,
  KeyRound,
  FileQuestion,
  ArrowLeft,
  ArrowRight,
  LifeBuoy,
  ChevronDown,
  Database,
  Smartphone,
  Check,
  ExternalLink,
} from 'lucide-react';
import { isRtlLocale } from '@/dictionaries';

interface SupportClientProps {
  locale: string;
}

export const SupportClient: React.FC<SupportClientProps> = ({ locale }) => {
  const isFa = isRtlLocale(locale);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'account',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const categories = [
    { id: 'account', label: isFa ? 'ورود و حساب کاربری مشترک' : 'Account & Unified Login', icon: KeyRound },
    { id: 'reels', label: isFa ? 'مشکل در بارگذاری ریلز و ویدیو' : 'Reels & Video Upload', icon: MessageSquare },
    { id: 'bug', label: isFa ? 'گزارش باگ یا خطای فنی' : 'Technical Bug Report', icon: Bug },
    { id: 'safety', label: isFa ? 'امنیت و گزارش محتوا' : 'Safety & Content Moderation', icon: ShieldCheck },
    { id: 'other', label: isFa ? 'پیشنهاد یا سوال عمومی' : 'General Inquiry & Feedback', icon: FileQuestion },
  ];

  const faqs = [
    {
      q: isFa ? 'چگونه با حساب اکادمی صفی در زو لاگین کنم؟' : 'How do I log into ZEV using my Safi Academy account?',
      a: isFa
        ? 'به دلیل اشتراک دیتابیس متمرکز زو با اکادمی صفی، شما نیازی به ثبت‌نام مجدد ندارید. کافیست همان ایمیل و رمز عبوری که در safiacademy.org استفاده می‌کنید را در زو وارد کنید تا فوراً حساب شما فعال گردد.'
        : 'Because ZEV shares a unified cloud database with Safi Academy, no duplicate sign-up is required. Simply use your existing Safi Academy credentials (email & password) to authenticate directly into ZEV.',
    },
    {
      q: isFa ? 'چگونه می‌توانم نشان تایید دانشجو یا مربی دریافت کنم؟' : 'How do I earn student or instructor verification badges?',
      a: isFa
        ? 'سیستم احراز هویت خودکار وضعیت ثبت‌نام شما در اکادمی صفی را شناسایی کرده و نشان ویژه «دانشجوی رسمی صفی» یا «استاد تایید شده» را به همراه تیک رنگی در پروفایل زو نمایش می‌دهد.'
        : 'Our background sync automatically detects your active enrolled courses or instructor portfolio in Safi Academy, granting an official Academy verified badge beside your profile name.',
    },
    {
      q: isFa ? 'تسویه درآمدهای تولیدکنندگان محتوا چگونه انجام می‌شود؟' : 'How are creator payouts processed via SafiPay?',
      a: isFa
        ? 'درآمدهای حاصل از هدایای ریلز، فالوورهای ویژه و پاداش‌های تولید محتوا مستقیماً به کیف پول متصل به SafiPay شما واریز شده و امکان برداشت بین‌المللی یا حواله بانکی را فراهم می‌کند.'
        : 'Creator rewards, tips, and subscription shares accumulate in your linked SafiPay digital wallet, eligible for automated bank transfer or fiat currency disbursement.',
    },
    {
      q: isFa ? 'آیا امکان استفاده از زو در کامپیوتر بدون نصب اپ وجود دارد؟' : 'Can I use ZEV on desktop without installing software?',
      a: isFa
        ? 'بله! نسخه تحت وب زو با فریم‌ورک Flutter Web پیاده‌سازی شده و تمامی قابلیت‌های اپلیکیشن شامل تماشای ریلز ۶۰ فریم، چت و بارگذاری پست را در مرورگر کروم، اج و سافاری فراهم می‌کند.'
        : 'Yes! ZEV Web is compiled using Flutter Web Engine with canvas rendering, delivering smooth 60fps reels playback, direct messaging, and posting right within your browser.',
    },
    {
      q: isFa ? 'لینک دانلود رسمی برنامه زو در اندروید کجاست؟' : 'Where can I download the official ZEV Android app?',
      a: isFa
        ? 'برنامه زو در گوگل پلی استور به صورت رسمی منتشر شده است (com.zevapp.app) و همچنین فایل مستقیم APK در صفحه اصلی zevapp.com در دسترس است.'
        : 'ZEV is officially distributed on Google Play (com.zevapp.app) and via direct signed APK on zevapp.com.',
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

        {/* Hero Banner */}
        <div
          style={{
            padding: '40px clamp(20px, 3.5vw, 48px)',
            borderRadius: 32,
            background: 'linear-gradient(145deg, rgba(13, 18, 30, 0.85) 0%, rgba(8, 13, 26, 0.95) 100%)',
            border: '1.5px solid rgba(0, 212, 255, 0.25)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.08)',
            marginBottom: 44,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: 20,
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                fontSize: 13,
                fontWeight: 800,
                color: '#00D4FF',
              }}
            >
              <LifeBuoy size={15} />
              {isFa ? 'مرکز ۲۴ ساعته پشتیبانی و راهنمایی زو' : 'ZEV 24/7 Global Help & Support Desk'}
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: 12,
                fontWeight: 700,
                color: '#94A3B8',
              }}
            >
              support@zevapp.com
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#FFFFFF',
              marginBottom: 16,
            }}
          >
            {isFa ? 'چگونه می‌توانیم به شما کمک کنیم؟' : 'How Can We Assist You Today?'}
          </h1>

          <p style={{ fontSize: 16.5, color: '#94A3B8', lineHeight: 1.65, maxWidth: 760 }}>
            {isFa
              ? 'پاسخ سوالات متداول درباره ورود با اکادمی صفی، تماس‌های صوتی و تصویری، دانلود از گوگل پلی و ثبت تیکت پشتیبانی ۲۴ ساعته.'
              : 'Find direct solutions for SSO authentication with Safi Academy, video call troubleshooting, Google Play downloads, or open an official ticket.'}
          </p>
        </div>

        {/* Support Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
          }}
        >
          {/* FAQ Accordion Side */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 20 }}>
              {isFa ? 'پرسش‌های متداول و راهنمای فوری' : 'Frequently Asked Questions'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(13, 18, 30, 0.75)',
                      border: isOpen ? '1px solid #00D4FF' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 20,
                      padding: 20,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                      <h3 style={{ fontSize: 15.5, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.4 }}>
                        {faq.q}
                      </h3>
                      <ChevronDown
                        size={18}
                        color={isOpen ? '#00D4FF' : '#64748B'}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    {isOpen && (
                      <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.65, marginTop: 12 }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Submission Form */}
          <div>
            <div
              style={{
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 28,
                padding: '36px 30px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginBottom: 8 }}>
                {isFa ? 'ارسال تیکت به تیم فنی زِو' : 'Submit a Support Ticket'}
              </h2>
              <p style={{ fontSize: 13.5, color: '#94A3B8', marginBottom: 24 }}>
                {isFa
                  ? 'کارشناسان ما ظرف کمتر از ۴ ساعت به درخواست شما پاسخ خواهند داد.'
                  : 'Our response team will follow up via email within 4 business hours.'}
              </p>

              {submitted ? (
                <div
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid #00D4FF',
                    borderRadius: 20,
                    padding: 28,
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle2 size={40} color="#00D4FF" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 6 }}>
                    {isFa ? 'تیکت شما با موفقیت ثبت گردید' : 'Ticket Submitted Successfully'}
                  </h3>
                  <p style={{ fontSize: 13.5, color: '#94A3B8' }}>
                    {isFa
                      ? 'کد رهگیری به ایمیل شما ارسال شد. همکاران ما به زودی با شما در ارتباط خواهند بود.'
                      : 'Confirmation email and tracking ID have been dispatched to your inbox.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>
                      {isFa ? 'نام و تخلص' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isFa ? 'مثال: شاهین صافی' : 'Shaheen Safi'}
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
                      {isFa ? 'آدرس ایمیل' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
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
                      {isFa ? 'دسته‌بندی موضوع' : 'Support Category'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 14,
                        background: '#07090E',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>
                      {isFa ? 'شرح پیام' : 'Message'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isFa ? 'لطفاً جزئیات مشکل یا سوال خود را بنویسید...' : 'Describe your inquiry or issue in detail...'}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 14,
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFFFFF',
                        fontSize: 14,
                        outline: 'none',
                        resize: 'vertical',
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
                      padding: '13px 20px',
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
                    <span>{isFa ? 'ثبت و ارسال تیکت' : 'Submit Ticket'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
