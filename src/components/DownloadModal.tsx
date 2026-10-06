'use client';

import React from 'react';
import { X, Smartphone, Globe, Monitor, Apple, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  const isFa = lang === 'fa';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: '#0C101A', color: '#CBD5E1', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: isFa ? 'auto' : 20,
            left: isFa ? 20 : 'auto',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#FC466B',
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
            e.currentTarget.style.background = '#FC466B';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FFF1F4';
            e.currentTarget.style.color = '#FC466B';
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '10px 14px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              marginBottom: 12,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Download size={26} color="#FC466B" />
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF', marginBottom: 6 }}>
            {isFa ? 'دریافت برنامه زو (ZEV)' : 'Get ZEV Everywhere'}
          </h3>
          <p style={{ fontSize: 14, color: '#94A3B8' }}>
            {isFa
              ? 'پلتفرم مورد نظر خود را انتخاب کنید یا مستقیماً از وب استفاده کنید'
              : 'Choose your platform or launch the instant web app'}
          </p>
        </div>

        {/* Platform Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Web Version */}
          <a
            href="https://web.zevapp.com"
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
                  background: '#FC466B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(252, 70, 107, 0.3)',
                }}
              >
                <Globe size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>
                  {isFa ? 'نسخه وب (Web App)' : 'Web Application'}
                </div>
                <div style={{ fontSize: 12.5, color: '#94A3B8' }}>
                  {isFa ? 'اجرای فوری در مرورگر کامپیوتر' : 'Instant in browser • No installation'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#FFFFFF',
                background: '#FC466B',
                padding: '6px 12px',
                borderRadius: 20,
              }}
            >
              {isFa ? 'ورود به وب' : 'Launch'}
            </span>
          </a>

          {/* Android APK */}
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
                  background: '#FC466B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(252, 70, 107, 0.3)',
                }}
              >
                <Smartphone size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>
                  {isFa ? 'دانلود نسخه اندروید (APK)' : 'Android Direct APK'}
                </div>
                <div style={{ fontSize: 12.5, color: '#94A3B8' }}>
                  {isFa ? 'فایل مستقیم با سرعت بالا • نسخه ۲.۴' : 'Fast direct download • Version 2.4'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#FFFFFF',
                background: '#FC466B',
                padding: '6px 12px',
                borderRadius: 20,
              }}
            >
              {isFa ? 'دانلود APK' : 'Download'}
            </span>
          </a>

          {/* iOS App Store */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: '16px',
              background: '#0C101A',
              border: '1px solid rgba(255, 255, 255, 0.08)',
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
                  color: '#FC466B',
                }}
              >
                <Apple size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>
                  {isFa ? 'نسخه آی‌او‌اس (Apple iOS)' : 'iOS TestFlight / App Store'}
                </div>
                <div style={{ fontSize: 12.5, color: '#64748B' }}>
                  {isFa ? 'تست‌فلایت و به‌زودی در اپ استور' : 'TestFlight Beta • Coming soon'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#FC466B',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: 12,
              }}
            >
              {isFa ? 'به‌زودی' : 'Soon'}
            </span>
          </div>

          {/* Desktop Windows/Mac/Linux */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: '16px',
              background: '#0C101A',
              border: '1px solid rgba(255, 255, 255, 0.08)',
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
                  color: '#FC466B',
                }}
              >
                <Monitor size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>
                  {isFa ? 'نسخه دسکتاپ (ویندوز / مک)' : 'Desktop Client (Windows / Mac)'}
                </div>
                <div style={{ fontSize: 12.5, color: '#64748B' }}>
                  {isFa ? 'کد بیلد فلاتر دسکتاپ' : 'Native Flutter Desktop Engine'}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#FC466B',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: 12,
              }}
            >
              {isFa ? 'از وب استفاده کنید' : 'Use Web'}
            </span>
          </div>
        </div>

        {/* Security Footer Note */}
        <div
          style={{
            marginTop: 20,
            padding: '12px 14px',
            borderRadius: 14,
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 12.5,
            color: '#334155',
          }}
        >
          <ShieldCheck size={16} color="#FC466B" />
          <span>
            {isFa
              ? 'تمامی فایل‌ها به طور خودکار قبل از انتشار اسکن و امضای امنیتی شده‌اند.'
              : 'All installation packages are digitally signed and cryptographically verified.'}
          </span>
        </div>
      </div>
    </div>
  );
};
