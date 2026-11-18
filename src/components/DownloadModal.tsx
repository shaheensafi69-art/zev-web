'use client';

import React from 'react';
import { X, Smartphone, Globe, Monitor, Apple, ArrowRight, ShieldCheck, Download, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Official Google Play 4-color triangle vector icon
const GooglePlayIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M325.3 234.3L104.6 13.6C99.2 8.2 92.4 5.2 85 5.2c-5.5 0-10.8 1.6-15.4 4.7L325.3 234.3z"
      fill="#00D4FF"
    />
    <path
      d="M421.2 216.7l-95.9 55.4-85.7-85.7 85.7-85.7 96 55.4c16.3 9.4 26.7 26.8 26.7 45.3s-10.4 35.9-26.8 45.3z"
      fill="#FFD043"
    />
    <path
      d="M69.6 10C64.9 13.1 62 18.5 62 24.3v463.4c0 5.8 2.9 11.2 7.6 14.3l255.7-224.2L69.6 10z"
      fill="#00C3FF"
    />
    <path
      d="M325.3 277.7L69.6 502c4.6 3.1 9.9 4.7 15.4 4.7 7.4 0 14.2-3 19.6-8.4l220.7-220.6z"
      fill="#FF3A44"
    />
    <path
      d="M325.3 277.7l95.9-55.4-95.9-55.4-85.7 85.7 85.7 25.1z"
      fill="#536DFE"
      fillOpacity="0.8"
    />
  </svg>
);

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  const isFa = lang === 'fa';
  const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.zevapp.app&hl=en';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0C101A',
          color: '#CBD5E1',
          border: '1px solid rgba(0, 212, 255, 0.25)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 212, 255, 0.15)',
          maxWidth: 520,
          borderRadius: 28,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: isFa ? 'auto' : 20,
            left: isFa ? 20 : 'auto',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#00D4FF',
            width: 36,
            height: 36,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00D4FF';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = '#00D4FF';
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 20,
              background: 'rgba(0, 212, 255, 0.1)',
              marginBottom: 12,
              border: '1px solid rgba(0, 212, 255, 0.3)',
            }}
          >
            <Sparkles size={16} color="#00D4FF" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#00D4FF' }}>
              {isFa ? 'نسخه ۲.۴ رسمی منتشر شد' : 'Official Version 2.4 Available'}
            </span>
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
            {isFa ? 'دریافت برنامه زو (ZEV)' : 'Get ZEV Everywhere'}
          </h3>
          <p style={{ fontSize: 13.5, color: '#94A3B8' }}>
            {isFa
              ? 'مستقیماً از گوگل پلی استور دانلود کنید یا نسخه وب را بلافاصله اجرا نمایید.'
              : 'Download directly from Google Play or launch the instant web app.'}
          </p>
        </div>

        {/* Platform Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* 1. Official Google Play Store (TOP & FEATURED) */}
          <a
            href={googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 18px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(83, 109, 254, 0.12) 100%)',
              border: '1.5px solid #00D4FF',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(0, 212, 255, 0.18)',
              transition: 'all 0.25s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(0, 212, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0, 212, 255, 0.25)',
                }}
              >
                <GooglePlayIcon size={26} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: '#FFFFFF' }}>
                    {isFa ? 'فروشگاه گوگل پلی (رسمی)' : 'Google Play Store'}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      background: '#00D4FF',
                      color: '#07090E',
                      padding: '2px 6px',
                      borderRadius: 6,
                      textTransform: 'uppercase',
                    }}
                  >
                    {isFa ? 'پیشنهادی' : 'Official'}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: '#94A3B8', marginTop: 2 }}>
                  {isFa
                    ? 'دانلود مستقیم و امن از گوگل پلی • آپدیت خودکار'
                    : 'Verified Android build • Auto updates & Play Protect'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 12.5,
                fontWeight: 800,
                color: '#07090E',
                background: '#00D4FF',
                padding: '8px 14px',
                borderRadius: 20,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0, 212, 255, 0.35)',
              }}
            >
              <span>{isFa ? 'نصب از پلی‌استور' : 'Get on Google Play'}</span>
              <ExternalLink size={13} />
            </span>
          </a>

          {/* 2. Web Application */}
          <a
            href="https://zevapp.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: '16px',
              background: 'rgba(13, 18, 30, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(0, 212, 255, 0.12)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00D4FF',
                }}
              >
                <Globe size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>
                  {isFa ? 'نسخه وب (Web Application)' : 'Web Application'}
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>
                  {isFa ? 'اجرای فوری در مرورگر کامپیوتر و گوشی' : 'Instant 60fps Flutter Web • No download'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#FFFFFF',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '6px 12px',
                borderRadius: 20,
              }}
            >
              {isFa ? 'ورود به وب' : 'Launch Web'}
            </span>
          </a>

          {/* 3. Direct APK (For devices without Google Play) */}
          <a
            href="/downloads/zev-android.apk"
            download
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: '16px',
              background: 'rgba(13, 18, 30, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                }}
              >
                <Smartphone size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: '#FFFFFF' }}>
                  {isFa ? 'فایل مستقیم APK (اندروید)' : 'Direct APK Download'}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  {isFa ? 'برای دستگاه‌های هواوی و بدون گوگل پلی' : 'For Huawei & devices without Play Store'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '5px 11px',
                borderRadius: 20,
              }}
            >
              {isFa ? 'دانلود APK' : 'Direct APK'}
            </span>
          </a>

          {/* 4. iOS TestFlight / App Store */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 18px',
              borderRadius: '16px',
              background: '#090D15',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              opacity: 0.85,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                }}
              >
                <Apple size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: '#CBD5E1' }}>
                  {isFa ? 'نسخه آی‌او‌اس (Apple iOS)' : 'iOS TestFlight / App Store'}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  {isFa ? 'تست‌فلایت و به‌زودی در اپ‌استور اپل' : 'Apple TestFlight beta roll-out'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#64748B',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: 12,
              }}
            >
              {isFa ? 'به‌زودی' : 'Coming Soon'}
            </span>
          </div>

          {/* 5. Desktop Windows / Mac */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 18px',
              borderRadius: '16px',
              background: '#090D15',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              opacity: 0.85,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748B',
                }}
              >
                <Monitor size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14.5, color: '#CBD5E1' }}>
                  {isFa ? 'نسخه دسکتاپ (ویندوز / مک)' : 'Desktop Client (Windows / Mac)'}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  {isFa ? 'از طریق وب با نهایت عملکرد فلاتر' : 'Native Flutter Desktop Engine'}
                </div>
              </div>
            </div>
            <a
              href="https://zevapp.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#00D4FF',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.25)',
                padding: '4px 10px',
                borderRadius: 12,
                textDecoration: 'none',
              }}
            >
              {isFa ? 'ورود به وب' : 'Launch'}
            </a>
          </div>
        </div>

        {/* Security Footer Note */}
        <div
          style={{
            marginTop: 18,
            padding: '12px 14px',
            borderRadius: 14,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12,
            color: '#64748B',
          }}
        >
          <ShieldCheck size={16} color="#00D4FF" />
          <span>
            {isFa
              ? 'تمامی فایل‌ها به طور خودکار قبل از انتشار اسکن و امضای امنیتی SHA-256 شده‌اند.'
              : 'All packages are cryptographically signed with Google Play Protect verification.'}
          </span>
        </div>
      </div>
    </div>
  );
};
