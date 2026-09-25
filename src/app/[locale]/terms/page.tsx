'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  Gavel,
  CheckSquare,
  Scale,
  ShieldAlert,
  AlertTriangle,
  Mail,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  UserCheck,
  Ban,
  Sparkles,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function LocalizedTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const sections = [
    {
      icon: UserCheck,
      id: 'eligibility',
      title: isFa ? '۱. شرایط عضویت و سن مجاز' : '1. Eligibility & Age Requirements',
      content: isFa
        ? 'استفاده از زو صرفاً برای افرادی که حداقل ۱۳ سال تمام دارند مجاز است. ایجاد حساب برای سنین پایین‌تر یا جعل هویت به نمایندگی از شخص دیگر تخلف صریح تلقی شده و منجر به مسدودسازی حساب خواهد شد.'
        : 'Access to ZEV is restricted to individuals aged 13 years and older. Establishing accounts on behalf of minors under 13 or impersonating third parties constitutes an immediate breach leading to automated account termination.',
    },
    {
      icon: ShieldAlert,
      id: 'prohibited-content',
      title: isFa ? '۲. محتوای ممنوعه و استانداردهای جامعه' : '2. Community Standards & Prohibited Content',
      content: isFa
        ? 'انتشار هرگونه محتوای حاوی خشونت شدید، پورنوگرافی، تهدید، کلاهبرداری، سخنان نفرت‌پراکن، یا نقض حقوق مالکیت معنوی دیگران مطلقاً ممنوع است. زو حق دارد محتوای ناقض را بدون اطلاع قبلی حذف نماید.'
        : 'Distribution of hate speech, graphic violence, harassment, non-consensual imagery, malware, or copyright-infringing assets is strictly prohibited. ZEV reserves unconditional authority to excise unlawful content without prior notification.',
    },
    {
      icon: Sparkles,
      id: 'creator-rights',
      title: isFa ? '۳. حقوق مالکیت معنوی تولیدکنندگان محتوا' : '3. Intellectual Property & Creator Rights',
      content: isFa
        ? 'مالکیت تمام ویدیوها، ریلزها و تصاویری که در زو منتشر می‌کنید متعلق به شما باقی می‌ماند. با انتشار محتوا، شما تنها مجوز فنی لازم جهت نمایش، میزبانی و استریم ویدیو در پلتفرم را به زو اعطا می‌کنید.'
        : 'You retain complete copyright ownership over all photos, reels, and original media authored on ZEV. You grant ZEV only a non-exclusive, worldwide, royalty-free license to host, cache, transcode, and stream your media across our interfaces.',
    },
    {
      icon: Scale,
      id: 'shared-ecosystem',
      title: isFa ? '۴. قوانین استفاده از اکوسیستم صفی و صافی‌پی' : '4. Safi Ecosystem Terms & SafiPay Monetization',
      content: isFa
        ? 'استفاده از خدمات پرداخت، شارژ کیف پول و تسویه حساب‌های مالی تولیدکنندگان محتوا مطابق با ضوابط مالی SafiPay و قوانین بین‌المللی مبارزه با پولشویی (AML/KYC) صورت می‌پذیرد.'
        : 'Creator payouts, in-app tipping, and wallet operations processed via SafiPay adhere strictly to international AML/KYC standards, requiring verified identity documentation for institutional disbursements.',
    },
    {
      icon: Ban,
      id: 'suspension',
      title: isFa ? '۵. تعلیق و مسدودسازی حساب‌های متخلف' : '5. Account Suspension & Banning Protocols',
      content: isFa
        ? 'ما حق داریم در صورت نقض مکرر قوانین، دریافت گزارش‌های تایید شده، یا تلاش برای نفوذ به زیرساخت‌های فنی، حساب‌های متخلف را موقتاً تعلیق یا به صورت دائمی مسدود نماییم.'
        : 'ZEV reserves the right to throttle, suspend, or permanently terminate accounts exhibiting repeated policy violations, abuse patterns, or security exploits targeted against our API endpoints.',
    },
    {
      icon: Gavel,
      id: 'liability',
      title: isFa ? '۶. سلب مسئولیت و مراجع قانونی حل اختلاف' : '6. Limitation of Liability & Governing Law',
      content: isFa
        ? 'پلتفرم زو بر مبنای اصل «همان‌گونه که هست» ارائه می‌گردد. هرگونه اختلاف حقوقی تابع قوانین بین‌المللی ثبت شرکت‌های هلدینگ بین‌المللی صفی در بریتانیا و مراجع داوری بین‌المللی خواهد بود.'
        : 'Services are delivered on an "as is" and "as available" basis. Legal disputes arising under these Terms fall under the judicial jurisdiction of Safi International Capital LTD registered corporate venues.',
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
              <Gavel size={15} />
              {isFa ? 'قوانین رسمی و شرایط الزام‌آور استفاده • ۲۰۲۶' : 'Official Terms of Service • 2026 Edition'}
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
              zevapp.com/terms
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
            {isFa ? 'قوانین، شرایط و استانداردهای جامعه زو (ZEV)' : 'ZEV Terms of Service & Community Standards'}
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
              ? 'پلتفرم اجتماعی زو با هدف ایجاد فضایی صمیمی، ایمن و محترمانه برای همه کاربران طراحی شده است. استفاده از خدمات، وب‌اپلیکیشن و اپ‌های موبایل و دسکتاپ زو به منزله پذیرش دقیق و متقابل این توافق‌نامه است.'
              : 'ZEV provides a vibrant, creative, and safe global platform. By utilizing our mobile apps, Flutter web client, or desktop software, you enter into a legally binding agreement governing acceptable usage, intellectual property, and community conduct.'}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.7fr) minmax(340px, 1fr)',
            gap: 36,
            alignItems: 'start',
          }}
          className="child-safety-grid"
        >
          {/* Main Content Articles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sections.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div
                  key={i}
                  id={sec.id}
                  className="pink-box"
                  style={{
                    padding: '30px clamp(20px, 2.5vw, 36px)',
                    borderRadius: 24,
                    background: '#FFF7F9',
                    border: '1.5px solid rgba(252, 70, 107, 0.3)',
                    boxShadow: '0 6px 20px rgba(252, 70, 107, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
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
                      <Icon size={22} />
                    </div>
                    <h2 style={{ fontSize: 19, fontWeight: 900, color: '#000000', margin: 0 }}>
                      {sec.title}
                    </h2>
                  </div>

                  <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.8, margin: 0 }}>
                    {sec.content}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 105, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Quick Outline (Pink Box) */}
            <div
              className="pink-box"
              style={{
                padding: 26,
                borderRadius: 24,
                background: '#FFFFFF',
                border: '1.5px solid rgba(252, 70, 107, 0.35)',
                boxShadow: '0 8px 25px rgba(252, 70, 107, 0.08)',
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#000000', marginBottom: 16 }}>
                {isFa ? 'سرفصل‌های قوانین زو' : 'Terms Table of Contents'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sections.map((sec, idx) => (
                  <a
                    key={idx}
                    href={`#${sec.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: '#334155',
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: 12,
                      background: '#FFF7F9',
                      border: '1px solid rgba(252, 70, 107, 0.2)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.background = '#FC466B';
                      e.currentTarget.style.borderColor = '#FC466B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#334155';
                      e.currentTarget.style.background = '#FFF7F9';
                      e.currentTarget.style.borderColor = 'rgba(252, 70, 107, 0.2)';
                    }}
                  >
                    <span style={{ color: '#FC466B', fontWeight: 800 }}>•</span>
                    <span className="truncate">{sec.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Questions Contact (Pink Box) */}
            <div
              className="pink-box"
              style={{
                padding: 26,
                borderRadius: 24,
                background: '#FFF1F4',
                border: '1.5px solid rgba(252, 70, 107, 0.4)',
                boxShadow: '0 8px 25px rgba(252, 70, 107, 0.1)',
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#000000', marginBottom: 10 }}>
                {isFa ? 'دایره حقوقی و قراردادها' : 'Legal & Compliance Desk'}
              </h4>
              <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.6, marginBottom: 16 }}>
                {isFa
                  ? 'جهت گزارش نقض کپی‌رایت، ارسال اخطاریه DMCA یا سوالات مربوط به قوانین با بخش حقوقی تماس بگیرید:'
                  : 'For DMCA copyright notifications, trademark inquiries, or regulatory counsel outreach:'}
              </p>
              <a
                href="mailto:legal@zevapp.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: '#FC466B',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 800,
                  boxShadow: '0 6px 18px rgba(252, 70, 107, 0.3)',
                }}
              >
                <Mail size={18} color="#FFFFFF" />
                <span>legal@zevapp.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
