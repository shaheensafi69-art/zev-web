'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  Trash2,
  Fingerprint,
  Server,
  Mail,
  ArrowLeft,
  ArrowRight,
  Database,
  CheckCircle2,
  FileText,
  Key,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function LocalizedPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  const sections = [
    {
      icon: Eye,
      id: 'data-collection',
      title: isFa ? '۱. اطلاعاتی که جمع‌آوری می‌کنیم' : '1. Information We Collect',
      content: isFa
        ? 'ما صرفاً داده‌های ضروری برای عملکرد پلتفرم را جمع‌آوری می‌نماییم: اطلاعات پروفایل (نام کاربری، نام، بیو، عکس پروفایل)، اطلاعات تماس (ایمیل)، داده‌های رسانه‌ای بارگذاری شده (عکس، ویدیو، ریلز) و اطلاعات فنی دستگاه (مدل دستگاه، نسخه سیستم‌عامل، زبان جهت تنظیم خودکار اپلیکیشن). زو هرگز بدون اجازه شما به میکروفون یا موقعیت مکانی دسترسی نخواهد داشت.'
        : 'We strictly gather essential operational metadata: profile identifiers (username, bio, avatar), contact info (verified email), user-generated media (photos, reels, comments), and standard device telemetry (hardware model, OS build, locale preferences). We never access location or hardware peripherals without explicit, granular runtime consent.',
    },
    {
      icon: Database,
      id: 'unified-database',
      title: isFa ? '۲. معماری دیتابیس مشترک با اکادمی صفی' : '2. Shared Database Architecture with Safi Academy',
      content: isFa
        ? 'پلتفرم زو و اکادمی صفی بر روی یک زیرساخت دیتابیس ابری واحد (Supabase Cloud با رمزنگاری سرتاسری AES-256) میزبانی می‌شوند. این به کاربران اجازه می‌دهد با یک نام کاربری و رمز عبور وارد هر دو پلتفرم شوند. اطلاعات دانشجویی و کیف پول صافی‌پی شما در محیطی کاملاً ایزوله و امن نگهداری شده و هرگز در فید عمومی افشا نمی‌گردد.'
        : 'ZEV and Safi Academy operate over an enterprise-grade unified cloud database cluster (Supabase Enterprise with AES-256 at-rest encryption). This enables single sign-on across the Safi Ecosystem. Student records and SafiPay balance tokens remain strictly isolated from public social feeds.',
    },
    {
      icon: Lock,
      id: 'encryption-security',
      title: isFa ? '۳. امنیت و رمزنگاری پیشرفته داده‌ها' : '3. Bank-Grade Encryption & Data Storage',
      content: isFa
        ? 'تمامی تبادلات داده بین دستگاه کاربر و سرورهای زو با استفاده از پروتکل‌های رمزنگاری پیشرفته TLS 1.3 و HTTPS محافظت می‌شوند. رمزهای عبور کاربران به صورت هش‌شده غیرقابل بازگشت با الگوریتم Argon2/Bcrypt ذخیره می‌شوند و حتی مدیران سیستم نیز به رمز عبور خام شما دسترسی ندارند.'
        : 'All transport channels utilize TLS 1.3 with rigorous forward secrecy. User credentials and authorization hashes are stored using salted cryptographic one-way hashing algorithms (Argon2 / Bcrypt). Plaintext credentials never exist on our persistence tiers.',
    },
    {
      icon: Fingerprint,
      id: 'biometrics',
      title: isFa ? '۴. حفاظت بیومتریک و کد PIN محلی' : '4. On-Device Biometrics & Local PIN',
      content: isFa
        ? 'در صورت فعال‌سازی قفل بیومتریک (اثر انگشت یا Face ID) در اپلیکیشن زو، داده‌های بیومتریک صرفاً روی سخت‌افزار دستگاه شما (Secure Enclave) پردازش شده و به هیچ عنوان به سرورهای زو ارسال یا مخابره نمی‌گردند.'
        : 'Biometric verification (Face ID / Fingerprint sensor) and App-Lock PIN codes reside entirely within your local device Secure Enclave. Biometric tokens are never transmitted to ZEV servers or stored remotely.',
    },
    {
      icon: Server,
      id: 'third-parties',
      title: isFa ? '۵. عدم فروش داده‌ها به اشخاص ثالث' : '5. Zero Data Brokering & No Third-Party Sales',
      content: isFa
        ? 'زو هرگز اطلاعات شخصی، رفتار کاربری، یا تاریخچه پیام‌ها و فعالیت‌های شما را به شرکت‌های تبلیغاتی یا واسطه‌های داده (Data Brokers) نخواهد فروخت. پلتفرم ما متعهد به اصول استقلال داده و حریم خصوصی مطلق است.'
        : 'ZEV will never sell, lease, or broker your personal behavioral telemetry or communication records to third-party ad networks or marketing intermediaries. Privacy is our foundational architectural promise.',
    },
    {
      icon: Trash2,
      id: 'deletion-rights',
      title: isFa ? '۶. حق فراموشی و حذف دائمی حساب' : '6. Complete Account & Data Deletion Rights',
      content: isFa
        ? 'شما در هر لحظه اختیار کامل دارید تا از بخش تنظیمات اپلیکیشن، حساب کاربری خود را به همراه تمامی عکس‌ها، ریلزها، پیام‌ها و دنبال‌کنندگان به طور دائمی و غیرقابل بازگشت حذف نمایید. پس از تایید، داده‌های شما در کمتر از ۷ روز کاری از تمامی بک‌آپ‌های سرور پاکسازی خواهند شد.'
        : 'In compliance with GDPR and modern privacy standards, users possess the absolute right to request irreversible account and media deletion via in-app preferences or by contacting our data protection officer. Residual cached backups are purged within 7 business days.',
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
              <ShieldCheck size={15} />
              {isFa ? 'سند رسمی شفافیت و حریم خصوصی • نسخه ۲.۴' : 'Official Privacy Policy • Revision 2.4'}
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
              zevapp.com/privacy
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
            {isFa ? 'سیاست حفظ حریم خصوصی و امنیت داده‌ها در زو (ZEV)' : 'ZEV Privacy & Data Protection Policy'}
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
              ? 'در زو (zevapp.com)، حریم خصوصی و امنیت اطلاعات کاربران بالاترین اولویت ماست. ما معتقدیم اطلاعات شما متعلق به خود شماست. این سند نحوه جمع‌آوری، رمزنگاری و حفاظت از اطلاعات شما را در تمامی نسخه‌های اپلیکیشن به صورت کاملاً شفاف و مستند بیان می‌کند.'
              : 'At ZEV (zevapp.com), user data sovereignty is our central design pillar. This document details how your personal information is encrypted, managed, and safeguarded across all client applications and cloud subsystems.'}
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
                    background: 'rgba(13, 18, 30, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
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
                    <h2 style={{ fontSize: 19, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                      {sec.title}
                    </h2>
                  </div>

                  <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.8, margin: 0 }}>
                    {sec.content}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 105, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Quick Index (Pink Box) */}
            <div
              className="pink-box"
              style={{
                padding: 26,
                borderRadius: 24,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 25px rgba(252, 70, 107, 0.08)',
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF', marginBottom: 16 }}>
                {isFa ? 'فهرست سرفصل‌های این سند' : 'Document Outline'}
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
                      color: '#94A3B8',
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: 12,
                      background: 'rgba(13, 18, 30, 0.75)',
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

            {/* Privacy Officer Contact (Pink Box) */}
            <div
              className="pink-box"
              style={{
                padding: 26,
                borderRadius: 24,
                background: 'rgba(13, 18, 30, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 25px rgba(252, 70, 107, 0.1)',
              }}
            >
              <h4 style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
                {isFa ? 'مسئول حفاظت از داده‌ها (DPO)' : 'Data Protection Officer'}
              </h4>
              <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6, marginBottom: 16 }}>
                {isFa
                  ? 'جهت درخواست استخراج اطلاعات، حذف دائمی حساب، یا هرگونه سوال حقوقی پیرامون حریم خصوصی با ایمیل مستقیم مسئول حفاظت از داده‌ها تماس حاصل فرمایید:'
                  : 'For subject access requests, complete deletion certifications, or compliance questions, reach our global Data Protection unit:'}
              </p>
              <a
                href="mailto:privacy@zevapp.com"
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
                <span>privacy@zevapp.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
