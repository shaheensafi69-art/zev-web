'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  UserX,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  HelpCircle,
  Clock,
  Database,
  ArrowRight,
  ArrowLeft,
  Mail,
  Copy,
  Lock,
  Smartphone,
  Globe,
  FileText,
  AlertCircle,
  Send,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';

export default function LocalizedDeleteAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);

  // Form State
  const [identifier, setIdentifier] = useState('');
  const [reason, setReason] = useState('privacy');
  const [feedback, setFeedback] = useState('');
  const [confirmDataLoss, setConfirmDataLoss] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    ticketId: string;
    message: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim() || identifier.trim().length < 3) {
      setErrorMsg(
        isFa
          ? 'لطفاً نام کاربری، ایمیل ثبت‌نامی یا شماره موبایل حساب زِو خود را وارد کنید.'
          : 'Please enter your ZEV username, registered email, or phone number.'
      );
      return;
    }

    if (!confirmDataLoss) {
      setErrorMsg(
        isFa
          ? 'جهت ثبت درخواست، باید تیک آگاهی از حذف دائمی اطلاعات را فعال کنید.'
          : 'You must acknowledge that account and data deletion is irreversible.'
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          reason,
          feedback: feedback.trim(),
          confirmDataLoss: true,
          locale,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || (isFa ? 'خطایی در ثبت درخواست رخ داد.' : 'Failed to submit request.'));
      }

      setSubmittedData({
        ticketId: data.ticketId,
        message: data.message,
      });
    } catch (err: any) {
      setErrorMsg(err.message || (isFa ? 'خطای ناشناخته در برقراری ارتباط با سرور.' : 'An unexpected error occurred.'));
    } finally {
      setSubmitting(false);
    }
  };

  const copyTicket = () => {
    if (submittedData?.ticketId) {
      navigator.clipboard.writeText(submittedData.ticketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const reasonsList = [
    {
      value: 'privacy',
      label: isFa ? 'نگرانی‌های مربوط به حریم خصوصی و امنیت داده‌ها' : 'Privacy or data security concerns',
    },
    {
      value: 'break',
      label: isFa ? 'نیاز به استراحت از شبکه‌های اجتماعی (سم‌زدایی دیجیتال)' : 'Taking a break from social media (Digital detox)',
    },
    {
      value: 'another_platform',
      label: isFa ? 'استفاده از اپلیکیشن یا پلتفرم اجتماعی دیگر' : 'Using a different social media platform',
    },
    {
      value: 'duplicate',
      label: isFa ? 'داشتن حساب کاربری دیگر در زِو' : 'I have a duplicate or secondary account',
    },
    {
      value: 'technical_issues',
      label: isFa ? 'مشکلات فنی، خطاها یا باگ‌های عملکردی' : 'Technical issues, errors, or performance problems',
    },
    {
      value: 'too_many_notifications',
      label: isFa ? 'تعداد بیش از حد پیام‌ها و اعلان‌ها' : 'Too many notifications or messages',
    },
    {
      value: 'other',
      label: isFa ? 'سایر دلایل شخصی' : 'Other personal reasons',
    },
  ];

  const deletedItems = [
    {
      icon: UserX,
      title: isFa ? 'مشخصات حساب و هویت' : 'Profile & Identity',
      desc: isFa
        ? 'نام، بیو، عکس پروفایل، نام کاربری، ایمیل و شماره تماس به طور کامل و غیرقابل بازگشت پاک می‌شوند.'
        : 'Display name, biography, avatar, username, registered email, and mobile phone will be permanently removed.',
    },
    {
      icon: Database,
      title: isFa ? 'محتوا، عکس‌ها و ریلزها' : 'Media, Posts & 60fps Reels',
      desc: isFa
        ? 'تمامی ویدیوهای ریلز، استوری‌های ذخیره شده، پست‌های فید، تصاویر و کپشن‌ها از کلاستر ابری حذف می‌گردند.'
        : 'All 60fps video reels, archived highlights, feed imagery, captions, and comments are purged from cloud storage.',
    },
    {
      icon: Lock,
      title: isFa ? 'پیام‌های خصوصی و چت‌ها' : 'Direct Messages & Chats',
      desc: isFa
        ? 'تاریخچه چت‌های خصوصی، پیام‌های صوتی و اطلاعات تماس‌های صوتی و تصویری رمزنگاری‌شده شما منقضی و حذف می‌شوند.'
        : 'All direct messaging threads, voice recordings, and end-to-end encrypted call session metadata are purged.',
    },
    {
      icon: Clock,
      title: isFa ? 'روابط و تعاملات اجتماعی' : 'Social Graph & Engagement',
      desc: isFa
        ? 'فهرست دنبال‌کنندگان، دنبال‌شونده‌ها، لایک‌ها، کامنت‌ها و لیست سیاه حساب‌های مسدود شده به صفر می‌رسد.'
        : 'Followers, following relations, likes, comments, bookmarks, and block lists are permanently wiped out.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#07090E', minHeight: '100vh', paddingTop: 100 }}>
      {/* Top Banner & Breadcrumbs */}
      <section
        style={{
          width: '97%',
          maxWidth: 2150,
          margin: '0 auto',
          padding: '24px 20px 40px',
        }}
        dir={isFa ? 'rtl' : 'ltr'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748B', marginBottom: 20 }}>
          <Link href={`/${locale}`} style={{ color: '#CBD5E1', fontWeight: 600 }}>
            {dict.nav.home}
          </Link>
          <span>/</span>
          <span style={{ color: '#64748B' }}>{dict.nav.trustSafety}</span>
          <span>/</span>
          <span style={{ color: '#FC466B', fontWeight: 700 }}>
            {dict.nav.deleteAccount || (isFa ? 'حذف حساب کاربری' : 'Delete Account')}
          </span>
        </div>

        {/* Hero Card */}
        <div
          style={{
            position: 'relative',
            borderRadius: 36,
            background: 'linear-gradient(135deg, #FFF1F4 0%, #FFFFFF 100%)',
            border: '2px solid rgba(252, 70, 107, 0.35)',
            padding: '48px 36px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(252, 70, 107, 0.1)',
            marginBottom: 48,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -60,
              right: isFa ? 'auto' : -60,
              left: isFa ? -60 : 'auto',
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(252, 70, 107, 0.18) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: 1000, position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 999,
                backgroundColor: '#FC466B',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 800,
                marginBottom: 20,
                boxShadow: '0 4px 15px rgba(252, 70, 107, 0.3)',
              }}
            >
              <Trash2 size={16} />
              <span>
                {isFa
                  ? 'مرکز رسمی مدیریت و حذف حساب کاربری • مطابق با استانداردهای گوگل و اپل'
                  : 'Official Account Deletion Portal • Google Play & App Store Compliant'}
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.25,
                marginBottom: 18,
                letterSpacing: '-0.5px',
              }}
            >
              {isFa ? (
                <>
                  درخواست حذف دائمی <span style={{ color: '#FC466B' }}>حساب کاربری و اطلاعات</span> در زِو
                </>
              ) : (
                <>
                  Delete Your <span style={{ color: '#FC466B' }}>ZEV Account</span> & Personal Data
                </>
              )}
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: '#94A3B8',
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              {isFa
                ? 'ما در زو بر حق حاکمیت کاربر بر داده‌های شخصی تأکید داریم. در صورتی که تصمیم به ترک پلتفرم زو گرفته‌اید، می‌توانید به سادگی از داخل برنامه تلفن همراه یا از طریق فرم رسمی زیر، درخواست حذف کامل حساب و تمام داده‌های مرتبط با آن را ثبت فرمایید.'
                : 'At ZEV, you retain absolute ownership of your personal information. If you decide to close your account, you can initiate immediate deletion directly within the mobile application or submit your verified web request below.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              <a
                href="#request-form"
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                <Send size={18} />
                <span>{isFa ? 'رفتن به فرم درخواست آنلاین' : 'Go to Online Request Form'}</span>
              </a>

              <a
                href="https://web.zevapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  padding: '14px 26px',
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                <Globe size={18} />
                <span>{isFa ? 'ورود به نسخه وب (web.zevapp.com)' : 'Visit Web App (web.zevapp.com)'}</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Data Deletion Breakdown & Compliance Details */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: 'center', maxWidth: 850, margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 12 }}>
              {isFa ? 'چه اطلاعاتی در فرایند حذف پاک می‌شوند؟' : 'What Data is Permanently Purged?'}
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7 }}>
              {isFa
                ? 'پس از تایید درخواست، تمامی سوابق هویتی، فایل‌های چندرسانه‌ای و پیام‌های شما طبق برنامه زیر به صورت کامل و غیرقابل بازگشت پاک خواهند شد.'
                : 'Upon deletion verification, all your identity records, multimedia files, and messaging history will be permanently eliminated.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {deletedItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#07090E',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 24,
                    padding: '28px 24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FC466B';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(252, 70, 107, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(252, 70, 107, 0.25)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      backgroundColor: '#FFF1F4',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FC466B',
                      marginBottom: 18,
                    }}
                  >
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.75 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance Box: 30-Day Grace Period & Legal Retention Policy */}
        <div
          style={{
            backgroundColor: '#07090E',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 28,
            padding: '36px 32px',
            marginBottom: 56,
            boxShadow: '0 15px 40px rgba(252, 70, 107, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#FC466B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={20} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
              {isFa ? 'مهلت بازیابی ۳۰ روزه و سیاست نگهداری قانونی' : '30-Day Grace Period & Legal Data Retention Policy'}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, fontSize: 14.5, color: '#94A3B8', lineHeight: 1.8 }}>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} color="#FC466B" />
                <span>{isFa ? 'مهلت ۳۰ روزه برای لغو انصراف' : '30-Day Cancellation Window'}</span>
              </h4>
              <p>
                {isFa
                  ? 'پس از ثبت درخواست، حساب شما بلافاصله از دید عموم مخفی و غیرفعال می‌شود. برای جلوگیری از حذف تصادفی یا سوءاستفاده، یک مهلت ۳۰ روزه وجود دارد. اگر در این مدت مجدداً وارد حساب خود در اپلیکیشن یا نسخه وب شوید، درخواست حذف به طور خودکار لغو خواهد شد.'
                  : 'After submission, your profile is instantly hidden from all feeds. We maintain a 30-day grace period to prevent accidental loss or malicious takeovers. Logging back in on web or mobile automatically revokes the deletion request.'}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldAlert size={16} color="#FC466B" />
                <span>{isFa ? 'حذف قطعی و الزامات مالیاتی / قانونی' : 'Permanent Deletion & Legal Compliance'}</span>
              </h4>
              <p>
                {isFa
                  ? 'پس از پایان ۳۰ روز، کلیه داده‌ها از پایگاه داده سوپابیس (Supabase) و سرورهای فضای ابری به طور برگشت‌ناپذیر پاک می‌شوند. سوابق تراکنش‌های مالی صفی‌پای (در صورت فعالیت در سیستم پاداش و پرداخت) صرفاً به مدت تعیین شده در قوانین مالیاتی بین‌المللی آرشیو خواهد بود.'
                  : 'After 30 days, all personal data is irreversibly wiped from our Supabase clusters and cloud buckets. Financial transaction logs tied to SafiPay or creator payouts may be retained strictly as mandated by international financial and anti-fraud regulations.'}
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Mobile In-App Instructions */}
        <div
          style={{
            backgroundColor: '#FFF7F9',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 28,
            padding: '36px 32px',
            marginBottom: 56,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: '#FC466B',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Smartphone size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                {isFa ? 'روش اول: حذف مستقیم از طریق اپلیکیشن موبایل زِو' : 'Method 1: Direct In-App Account Deletion'}
              </h3>
              <p style={{ fontSize: 13.5, color: '#64748B' }}>
                {isFa ? 'اگر به تلفن همراه خود دسترسی دارید، این سریع‌ترین روش است:' : 'If you currently have the ZEV app installed on your smartphone:'}
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {[
              {
                step: '۱',
                title: isFa ? 'ورود به پروفایل' : 'Open Profile',
                desc: isFa ? 'اپلیکیشن ZEV را باز کرده و به تب پروفایل کاربری خود بروید.' : 'Launch ZEV and tap your Profile icon on the bottom navigation bar.',
              },
              {
                step: '۲',
                title: isFa ? 'تنظیمات ⚙️' : 'Settings ⚙️',
                desc: isFa ? 'آیکون چرخ‌دنده تنظیمات را در گوشه بالا لمس نمایید.' : 'Tap the gear icon in the top corner to open Application Settings.',
              },
              {
                step: '۳',
                title: isFa ? 'امنیت و حساب' : 'Account & Security',
                desc: isFa ? 'وارد بخش «حساب کاربری و امنیت» (Account Security) شوید.' : 'Navigate into the "Account & Privacy" security management tab.',
              },
              {
                step: '۴',
                title: isFa ? 'حذف حساب کاربری' : 'Delete Account',
                desc: isFa ? 'گزینه قرمز رنگ «حذف حساب» را انتخاب و با گذرواژه خود تایید کنید.' : 'Tap "Delete Account", enter your password/PIN to confirm.',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#07090E',
                  borderRadius: 20,
                  padding: '20px 18px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: '#FC466B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: 14,
                    marginBottom: 12,
                  }}
                >
                  {s.step}
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF', marginBottom: 6 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Method 2: Online Request Submission Form (Google Play & Web Requirements) */}
        <div
          id="request-form"
          style={{
            backgroundColor: '#07090E',
            border: '2.5px solid #FC466B',
            borderRadius: 36,
            padding: '48px 36px',
            boxShadow: '0 25px 60px rgba(252, 70, 107, 0.12)',
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 999,
                  backgroundColor: '#FFF1F4',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FC466B',
                  fontSize: 12.5,
                  fontWeight: 800,
                  marginBottom: 12,
                }}
              >
                <Globe size={14} />
                <span>{isFa ? 'روش دوم: ثبت فرم آنلاین وب‌سایت' : 'Method 2: Official Web Request Form'}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
                {isFa ? 'فرم رسمی درخواست حذف حساب کاربری' : 'Submit Account Deletion Request'}
              </h2>
              <p style={{ fontSize: 14.5, color: '#64748B' }}>
                {isFa
                  ? 'اگر اپلیکیشن را حذف کرده‌اید یا به آن دسترسی ندارید، مشخصات حساب خود را در فرم زیر وارد کنید تا درخواست شما فوراً پردازش شود.'
                  : 'If you have uninstalled the app or lost access to your device, verify your details below to schedule deletion.'}
              </p>
            </div>

            {submittedData ? (
              /* Success Card */
              <div
                style={{
                  backgroundColor: '#FFF1F4',
                  border: '2px solid #FC466B',
                  borderRadius: 28,
                  padding: '36px 30px',
                  textAlign: 'center',
                  animation: 'scaleUp 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: '50%',
                    backgroundColor: '#FC466B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 25px rgba(252, 70, 107, 0.4)',
                  }}
                >
                  <CheckCircle2 size={38} />
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
                  {isFa ? 'درخواست حذف با موفقیت ثبت شد' : 'Deletion Request Successfully Filed'}
                </h3>

                <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.8, marginBottom: 24 }}>
                  {submittedData.message}
                </p>

                {/* Ticket ID Display */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '12px 24px',
                    borderRadius: 16,
                    backgroundColor: '#07090E',
                    border: '1.5px solid rgba(252, 70, 107, 0.5)',
                    marginBottom: 24,
                  }}
                >
                  <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>
                    {isFa ? 'کد پیگیری رسمی:' : 'Tracking Ticket:'}
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: '#FC466B', letterSpacing: '1px' }}>
                    {submittedData.ticketId}
                  </span>
                  <button
                    type="button"
                    onClick={copyTicket}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: copied ? '#059669' : '#FC466B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    <Copy size={16} />
                    <span>{copied ? (isFa ? 'کپی شد!' : 'Copied!') : isFa ? 'کپی' : 'Copy'}</span>
                  </button>
                </div>

                <div
                  style={{
                    padding: '16px 20px',
                    borderRadius: 16,
                    backgroundColor: '#07090E',
                    fontSize: 13.5,
                    color: '#94A3B8',
                    lineHeight: 1.7,
                    textAlign: isFa ? 'right' : 'left',
                    marginBottom: 24,
                  }}
                >
                  <strong>{isFa ? 'نکات مهم مرحله بعد:' : 'Next Steps & Reminders:'}</strong>
                  <ul style={{ marginTop: 8, paddingInlineStart: 20 }}>
                    <li>
                      {isFa
                        ? 'حساب شما اکنون در صف تعلیق و حذف قرار گرفته است.'
                        : 'Your account is now queued for deactivation and secure deletion.'}
                    </li>
                    <li>
                      {isFa
                        ? 'در صورت ورود به حساب در ۳۰ روز آینده از طریق سایت web.zevapp.com، این درخواست لغو خواهد شد.'
                        : 'Logging in at web.zevapp.com within the next 30 days will cancel this request.'}
                    </li>
                    <li>
                      {isFa
                        ? 'تیم پشتیبانی ما گزارش درخواست را در سیستم تلگرام و دیتابیس ثبت کرده است.'
                        : 'Our administration team has logged the request and will handle data purge tasks.'}
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedData(null);
                    setIdentifier('');
                    setFeedback('');
                    setConfirmDataLoss(false);
                  }}
                  className="btn-secondary"
                  style={{ padding: '10px 24px', fontSize: 14 }}
                >
                  <span>{isFa ? 'ثبت درخواست جدید' : 'Submit Another Request'}</span>
                </button>
              </div>
            ) : (
              /* Request Form */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {errorMsg && (
                  <div
                    style={{
                      padding: '14px 18px',
                      borderRadius: 16,
                      backgroundColor: '#FEF2F2',
                      border: '1.5px solid #EF4444',
                      color: '#B91C1C',
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <AlertCircle size={20} style={{ flexShrink: 0 }} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Input: Username, Email or Phone */}
                <div>
                  <label
                    htmlFor="identifier"
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 8,
                    }}
                  >
                    {isFa
                      ? 'نام کاربری (Username)، ایمیل یا شماره موبایل حساب زِو *'
                      : 'ZEV Username, Registered Email, or Phone Number *'}
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      isFa
                        ? 'مثال: @username یا user@example.com یا 0799000000'
                        : 'e.g. @username or name@domain.com or +937...'
                    }
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 16,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: 15,
                      color: '#FFFFFF',
                      backgroundColor: '#07090E',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#FC466B')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(252, 70, 107, 0.35)')}
                  />
                </div>

                {/* Select: Reason */}
                <div>
                  <label
                    htmlFor="reason"
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 8,
                    }}
                  >
                    {isFa ? 'دلیل شما برای حذف حساب کاربری چیست؟ *' : 'Reason for Leaving ZEV *'}
                  </label>
                  <select
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 16,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: 14.5,
                      color: '#FFFFFF',
                      backgroundColor: '#07090E',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {reasonsList.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Textarea: Additional Feedback */}
                <div>
                  <label
                    htmlFor="feedback"
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: 8,
                    }}
                  >
                    {isFa
                      ? 'توضیحات تکمیلی یا بازخورد برای بهبود زِو (اختیاری)'
                      : 'Additional Feedback or Suggestions (Optional)'}
                  </label>
                  <textarea
                    id="feedback"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={
                      isFa
                        ? 'اگر تجربه نامناسبی داشته‌اید، لطفاً با ما در میان بگذارید تا تیم ما در جهت رفع آن بکوشد...'
                        : 'Tell us how we could have done better or any specific issue you encountered...'
                    }
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 16,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: 14.5,
                      color: '#FFFFFF',
                      backgroundColor: '#07090E',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#FC466B')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(252, 70, 107, 0.35)')}
                  />
                </div>

                {/* Confirmation Checkbox */}
                <div
                  style={{
                    backgroundColor: '#FFF1F4',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 18,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    cursor: 'pointer',
                  }}
                  onClick={() => setConfirmDataLoss(!confirmDataLoss)}
                >
                  <input
                    type="checkbox"
                    id="confirmLoss"
                    checked={confirmDataLoss}
                    onChange={(e) => setConfirmDataLoss(e.target.checked)}
                    style={{
                      width: 20,
                      height: 20,
                      accentColor: '#FC466B',
                      cursor: 'pointer',
                      marginTop: 2,
                    }}
                  />
                  <label
                    htmlFor="confirmLoss"
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.6,
                      cursor: 'pointer',
                    }}
                  >
                    {isFa
                      ? 'آگاهی کامل دارم که با این اقدام، تمامی ریلزها، استوری‌ها، پیام‌ها، لیست دوستان و اطلاعات حساب من به طور دائمی پاک شده و پس از مهلت ۳۰ روزه هرگز قابل بازیابی نخواهد بود.'
                      : 'I acknowledge that by submitting this request, all my reels, stories, direct messages, followers, and profile assets will be permanently deleted and cannot be restored after the 30-day window.'}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{
                    padding: '16px 32px',
                    fontSize: 16,
                    fontWeight: 900,
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: 8,
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>{isFa ? 'در حال ثبت در سامانه و اطلاع‌رسانی...' : 'Submitting & Dispatching...'}</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={20} />
                      <span>{isFa ? 'تایید و ثبت درخواست حذف حساب' : 'Confirm & Submit Deletion Request'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Support & Legal Desk Contacts */}
        <div
          style={{
            backgroundColor: '#07090E',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 28,
            padding: '36px 32px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF', marginBottom: 10 }}>
            {isFa ? 'به کمک نیاز دارید یا سوالی در خصوص داده‌ها دارید؟' : 'Need Assistance or Have Data Inquiries?'}
          </h3>
          <p style={{ fontSize: 14.5, color: '#64748B', maxWidth: 700, margin: '0 auto 20px', lineHeight: 1.7 }}>
            {isFa
              ? 'تیم حریم خصوصی و پشتیبانی زِو در ۲۴ ساعت شبانه‌روز آماده پاسخگویی به درخواست‌ها و سوالات کاربران گرامی است.'
              : 'Our data protection officer and customer support desk are available 24/7 to address any compliance questions.'}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
            <a
              href="mailto:support@zevapp.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 16,
                backgroundColor: '#FFF1F4',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FC466B',
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <Mail size={16} />
              <span>support@zevapp.com</span>
            </a>

            <a
              href="mailto:privacy@zevapp.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 16,
                backgroundColor: '#FFF1F4',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FC466B',
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <Lock size={16} />
              <span>privacy@zevapp.com</span>
            </a>

            <Link
              href={`/${locale}/support`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 16,
                backgroundColor: '#FC466B',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              <HelpCircle size={16} />
              <span>{dict.nav.support}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
