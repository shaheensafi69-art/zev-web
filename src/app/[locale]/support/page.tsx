'use client';

import React, { useState, use } from 'react';
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
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function LocalizedSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
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
  ];

  return (
    <div style={{ padding: '40px 0 100px', minHeight: '85vh', backgroundColor: '#FFFFFF' }}>
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
            color: '#475569',
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
            background: '#FFF1F4',
            border: '1.5px solid rgba(252, 70, 107, 0.4)',
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
                background: '#FFFFFF',
                border: '1.5px solid rgba(252, 70, 107, 0.4)',
                fontSize: 13,
                fontWeight: 800,
                color: '#FC466B',
              }}
            >
              <LifeBuoy size={15} />
              {isFa ? 'مرکز ۲۴ ساعته راهنمایی و پشتیبانی زو' : 'ZEV 24/7 Global Support & Help Center'}
            </span>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: 999,
                background: '#FFFFFF',
                border: '1px solid rgba(252, 70, 107, 0.25)',
                fontSize: 12,
                fontWeight: 700,
                color: '#475569',
              }}
            >
              zevapp.com/support
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 900,
              lineHeight: 1.2,
              color: '#000000',
              marginBottom: 16,
              letterSpacing: '-0.5px',
            }}
          >
            {isFa ? 'چگونه می‌توانیم به شما کمک کنیم؟' : 'How Can the ZEV Engineering Team Assist You?'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              color: '#334155',
              maxWidth: 1200,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {isFa
              ? 'تیم مهندسی و پشتیبانی فنی زو به صورت شبانه‌روزی آماده پاسخگویی به سوالات، پیگیری مشکلات فنی، گزارش‌های امنیتی و راهنمایی تولیدکنندگان محتوا در تمامی نسخه‌هاست.'
              : 'Our global developer support team is on standby 24/7 to address account authentication challenges, mobile app inquiries, creator monetization via SafiPay, and platform security feedback.'}
          </p>
        </div>

        {/* 3 Support Channels Strip (Pink Boxes) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div className="pink-box" style={{ padding: 24, borderRadius: 24, background: '#FFF7F9', border: '1.5px solid rgba(252, 70, 107, 0.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
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
                <Mail size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#000000', margin: 0 }}>
                  {isFa ? 'پشتیبانی فنی عمومی' : 'General Tech Support'}
                </h3>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{isFa ? 'پاسخ کمتر از ۲۴ ساعت' : 'Sub-24h turnaround'}</span>
              </div>
            </div>
            <a href="mailto:support@zevapp.com" style={{ fontSize: 14, color: '#FC466B', fontWeight: 800 }}>
              support@zevapp.com
            </a>
          </div>

          <div className="pink-box" style={{ padding: 24, borderRadius: 24, background: '#FFF7F9', border: '1.5px solid rgba(252, 70, 107, 0.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
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
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#000000', margin: 0 }}>
                  {isFa ? 'حفاظت و امنیت اضطراری' : 'Emergency Safety Desk'}
                </h3>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{isFa ? 'رسیدگی فوری کمتر از ۱ ساعت' : 'Urgent sub-60m triage'}</span>
              </div>
            </div>
            <a href="mailto:safety@zevapp.com" style={{ fontSize: 14, color: '#FC466B', fontWeight: 800 }}>
              safety@zevapp.com
            </a>
          </div>

          <div className="pink-box" style={{ padding: 24, borderRadius: 24, background: '#FFF7F9', border: '1.5px solid rgba(252, 70, 107, 0.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
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
                <Database size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 900, color: '#000000', margin: 0 }}>
                  {isFa ? 'اکوسیستم صفی و اکادمی' : 'Safi Ecosystem Help'}
                </h3>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{isFa ? 'هماهنگی اکانت و دوره‌ها' : 'Student & Instructor sync'}</span>
              </div>
            </div>
            <a href="mailto:info@safiacademy.org" style={{ fontSize: 14, color: '#FC466B', fontWeight: 800 }}>
              info@safiacademy.org
            </a>
          </div>
        </div>

        {/* 2-Column Main Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: 36,
            alignItems: 'start',
          }}
          className="child-safety-grid"
        >
          {/* Interactive Form */}
          <div
            className="pink-box"
            style={{
              padding: '36px clamp(20px, 3vw, 40px)',
              borderRadius: 28,
              border: '1.5px solid rgba(252, 70, 107, 0.4)',
              background: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(252, 70, 107, 0.1)',
            }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#000000', marginBottom: 8 }}>
              {isFa ? 'ثبت درخواست یا گزارش مشکل فنی' : 'Open an Engineering Support Ticket'}
            </h2>
            <p style={{ fontSize: 14.5, color: '#475569', marginBottom: 24 }}>
              {isFa
                ? 'فرم زیر را تکمیل کنید تا کارشناسان ما مستقیماً به ایمیل شما پاسخ دهند.'
                : 'Fill out the form below and our engineers will investigate your inquiry.'}
            </p>

            {submitted ? (
              <div
                style={{
                  padding: 32,
                  borderRadius: 20,
                  background: '#FFF1F4',
                  border: '1.5px solid #FC466B',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: '#FC466B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#FFFFFF',
                  }}
                >
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: '#000000', marginBottom: 8 }}>
                  {isFa ? 'تیکت شما با موفقیت ثبت شد' : 'Ticket Submitted Successfully'}
                </h3>
                <p style={{ fontSize: 14.5, color: '#334155', lineHeight: 1.7, margin: 0 }}>
                  {isFa
                    ? 'کد پیگیری برای ایمیل شما ارسال شد. همکاران فنی ما در اسرع وقت پاسخ کامل را ارسال خواهند نمود.'
                    : 'A confirmation reference has been dispatched to your email address. Our engineering team is currently triaging your ticket.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Category Picker */}
                <div>
                  <label style={{ display: 'block', fontSize: 13.5, fontWeight: 800, color: '#000000', marginBottom: 10 }}>
                    {isFa ? 'موضوع اصلی درخواست' : 'Inquiry Category'} *
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.id;
                      return (
                        <button
                          type="button"
                          key={cat.id}
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '10px 16px',
                            borderRadius: 14,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            background: isSelected ? '#FC466B' : '#FFF7F9',
                            color: isSelected ? '#FFFFFF' : '#000000',
                            border: isSelected ? '1.5px solid #FC466B' : '1.5px solid rgba(252, 70, 107, 0.3)',
                            boxShadow: isSelected ? '0 4px 15px rgba(252, 70, 107, 0.3)' : 'none',
                          }}
                        >
                          <Icon size={15} />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#000000', marginBottom: 6 }}>
                      {isFa ? 'نام و تخلص شما' : 'Your Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isFa ? 'شاهین صفی' : 'John Doe'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#000000', marginBottom: 6 }}>
                      {isFa ? 'ایمیل شما (جهت دریافت پاسخ)' : 'Your Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#000000', marginBottom: 6 }}>
                    {isFa ? 'عنوان تیکت' : 'Subject'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isFa ? 'عنوان مختصر مشکل...' : 'Brief summary of issue...'}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 800, color: '#000000', marginBottom: 6 }}>
                    {isFa ? 'شرح کامل پیام یا باگ مشاهده شده' : 'Detailed Message'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={isFa ? 'توضیحات تکمیلی و هرگونه اطلاعات مرتبط...' : 'Explain the issue in detail...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    fontSize: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <Send size={18} />
                  <span>{isFa ? 'ارسال درخواست به تیم فنی' : 'Submit Ticket to Engineers'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Knowledge Base & FAQs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              className="pink-box"
              style={{
                padding: '30px clamp(20px, 2.5vw, 36px)',
                borderRadius: 28,
                background: '#FFF7F9',
                border: '1.5px solid rgba(252, 70, 107, 0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <FileQuestion size={20} color="#FC466B" />
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#000000', margin: 0 }}>
                  {isFa ? 'پرسش‌های متداول راهنمایی' : 'Frequently Asked Questions'}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      style={{
                        borderRadius: 18,
                        background: '#FFFFFF',
                        border: '1.5px solid rgba(252, 70, 107, 0.25)',
                        overflow: 'hidden',
                        transition: 'all 0.2s',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        style={{
                          width: '100%',
                          padding: '15px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 12,
                          background: 'none',
                          border: 'none',
                          color: '#000000',
                          fontSize: 14.5,
                          fontWeight: 800,
                          textAlign: isFa ? 'right' : 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          style={{
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s',
                            flexShrink: 0,
                            color: '#FC466B',
                          }}
                        />
                      </button>

                      {isOpen && (
                        <div
                          style={{
                            padding: '0 18px 16px',
                            color: '#334155',
                            fontSize: 13.5,
                            lineHeight: 1.75,
                            borderTop: '1px solid rgba(252, 70, 107, 0.15)',
                            paddingTop: 10,
                          }}
                        >
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Social Links (Pink Box) */}
            <div
              className="pink-box"
              style={{
                padding: 24,
                borderRadius: 24,
                background: '#FFF1F4',
                border: '1.5px solid rgba(252, 70, 107, 0.4)',
              }}
            >
              <h4 style={{ fontSize: 15, fontWeight: 900, color: '#000000', marginBottom: 10 }}>
                {isFa ? 'شبکه ارتباطات اکوسیستم صفی' : 'Safi Ecosystem Channels'}
              </h4>
              <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.6, marginBottom: 14 }}>
                {isFa
                  ? 'اخبار و گزارش وضعیت سرورها در کانال‌های رسمی گروه صفی در دسترس است.'
                  : 'Platform uptime reports and release announcements are mirrored across Safi properties.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <a
                  href="https://safiacademy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 12.5, padding: '8px 16px' }}
                >
                  safiacademy.org
                </a>
                <a
                  href="https://safipay.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: 12.5, padding: '8px 16px' }}
                >
                  safipay.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
