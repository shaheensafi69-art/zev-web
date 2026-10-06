'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Globe,
  Menu,
  X,
  Download,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Layers,
  Users,
  HelpCircle,
  FileText,
  Lock,
  ShieldAlert,
  Monitor,
  Heart,
  ChevronRight,
  ChevronLeft,
  UserX,
} from 'lucide-react';
import { languages, isRtlLocale, Dictionary } from '@/dictionaries';
import { DownloadModal } from './DownloadModal';

interface NavbarProps {
  locale: string;
  dict: Dictionary;
}

export const Navbar: React.FC<NavbarProps> = ({ locale, dict }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'platform' | 'legal' | 'lang' | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const isRtl = isRtlLocale(locale);
  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Switch locale while preserving the subpath
  const handleLocaleChange = (newLocale: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    document.cookie = `zev_locale=${newLocale}; path=/; max-age=31536000`;

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${newLocale}`);
    } else {
      segments[0] = newLocale;
      router.push(`/${segments.join('/')}`);
    }
  };

  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isPlatformActive = pathname.startsWith(`/${locale}/features`) || pathname.startsWith(`/${locale}/ecosystem`);
  const isAboutActive = pathname.startsWith(`/${locale}/about`);
  const isLegalActive =
    pathname.startsWith(`/${locale}/child-safety`) ||
    pathname.startsWith(`/${locale}/privacy`) ||
    pathname.startsWith(`/${locale}/terms`) ||
    pathname.startsWith(`/${locale}/delete-account`);
  const isSupportActive = pathname.startsWith(`/${locale}/support`);

  return (
    <>
      {/* Floating Header Wrapper */}
      <header
        ref={navContainerRef}
        className="navbar-floating-header"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="navbar-floating-bar">
          {/* Subtle bottom glowing line */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '15%',
              right: '15%',
              height: 1.5,
              background: 'linear-gradient(90deg, transparent, #FC466B, transparent)',
              opacity: 0.8,
            }}
          />

          {/* Logo */}
          <Link
            href={`/${locale}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              className="navbar-logo-icon"
              style={{
                position: 'relative',
                width: 42,
                height: 42,
                borderRadius: 14,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(252, 70, 107, 0.2)',
                flexShrink: 0,
              }}
            >
              <Image
                src="/assets/icon-clean.png"
                alt="ZEV Icon"
                width={30}
                height={30}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  className="navbar-logo-title"
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: '-0.5px',
                    color: '#FFFFFF',
                  }}
                >
                  ZEV
                </span>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: '#FC466B',
                    display: 'inline-block',
                    boxShadow: '0 0 8px #FC466B',
                  }}
                />
              </div>
              <span
                className="navbar-logo-sub"
                style={{
                  fontSize: 10,
                  letterSpacing: '1px',
                  fontWeight: 800,
                  color: '#FC466B',
                  textTransform: 'uppercase',
                  marginTop: -3,
                }}
              >
                zevapp.com
              </span>
            </div>
          </Link>

          {/* DESKTOP CATEGORIZED NAVIGATION */}
          <nav
            style={{
              alignItems: 'center',
              gap: 6,
            }}
            className="desktop-nav"
          >
            {/* 1. HOME LINK */}
            <Link
              href={`/${locale}`}
              style={{
                fontSize: 14,
                fontWeight: isHomeActive ? 900 : 700,
                color: isHomeActive ? '#FFFFFF' : '#CBD5E1',
                padding: '8px 16px',
                borderRadius: 18,
                background: isHomeActive ? '#FC466B' : 'transparent',
                boxShadow: isHomeActive ? '0 4px 15px rgba(252, 70, 107, 0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isHomeActive) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isHomeActive) {
                  e.currentTarget.style.color = '#CBD5E1';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {dict.nav.home}
            </Link>

            {/* 2. PLATFORM & FEATURES DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'platform' ? null : 'platform')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: isPlatformActive ? 900 : 700,
                  color: isPlatformActive ? '#FFFFFF' : activeDropdown === 'platform' ? '#FC466B' : '#CBD5E1',
                  padding: '8px 16px',
                  borderRadius: 18,
                  background: isPlatformActive ? '#FC466B' : activeDropdown === 'platform' ? 'rgba(252, 70, 107, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: isPlatformActive ? '0 4px 15px rgba(252, 70, 107, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isPlatformActive) {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPlatformActive && activeDropdown !== 'platform') {
                    e.currentTarget.style.color = '#CBD5E1';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Sparkles size={15} color={isPlatformActive ? '#FFFFFF' : '#FC466B'} />
                <span>{dict.nav.platform}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'platform' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: isPlatformActive ? '#FFFFFF' : '#FC466B',
                  }}
                />
              </button>

              {/* Platform Menu Flyout */}
              {activeDropdown === 'platform' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '125%',
                    left: isRtl ? 'auto' : 0,
                    right: isRtl ? 0 : 'auto',
                    width: 320,
                    backgroundColor: '#0C101A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 24,
                    padding: '12px 10px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(252, 70, 107, 0.1)',
                    zIndex: 210,
                    animation: 'scaleUp 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <Link
                      href={`/${locale}/features`}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: pathname.startsWith(`/${locale}/features`) ? 'rgba(252, 70, 107, 0.18)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => {
                        if (!pathname.startsWith(`/${locale}/features`)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: '#FC466B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>
                          {dict.nav.features}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.featuresDesc}
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`/${locale}/ecosystem`}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: pathname.startsWith(`/${locale}/ecosystem`) ? 'rgba(252, 70, 107, 0.18)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => {
                        if (!pathname.startsWith(`/${locale}/ecosystem`)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: '#FC466B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        <Layers size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>
                          {dict.nav.ecosystem}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.ecosystemDesc}
                        </div>
                      </div>
                    </Link>

                    <a
                      href="https://web.zevapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FC466B',
                          flexShrink: 0,
                        }}
                      >
                        <Monitor size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{dict.nav.webApp}</span>
                          <ExternalLink size={12} color="#FC466B" />
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.webAppDesc}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. ABOUT & TEAM (Direct Link) */}
            <Link
              href={`/${locale}/about`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: isAboutActive ? 900 : 700,
                color: isAboutActive ? '#FFFFFF' : '#CBD5E1',
                padding: '8px 16px',
                borderRadius: 18,
                background: isAboutActive ? '#FC466B' : 'transparent',
                boxShadow: isAboutActive ? '0 4px 15px rgba(252, 70, 107, 0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isAboutActive) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isAboutActive) {
                  e.currentTarget.style.color = '#CBD5E1';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Users size={15} color={isAboutActive ? '#FFFFFF' : '#FC466B'} />
              <span>{dict.nav.about}</span>
            </Link>

            {/* 4. TRUST & LEGAL DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'legal' ? null : 'legal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: isLegalActive ? 900 : 700,
                  color: isLegalActive ? '#FFFFFF' : activeDropdown === 'legal' ? '#FC466B' : '#CBD5E1',
                  padding: '8px 16px',
                  borderRadius: 18,
                  background: isLegalActive ? '#FC466B' : activeDropdown === 'legal' ? 'rgba(252, 70, 107, 0.15)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: isLegalActive ? '0 4px 15px rgba(252, 70, 107, 0.3)' : 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isLegalActive) {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLegalActive && activeDropdown !== 'legal') {
                    e.currentTarget.style.color = '#CBD5E1';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <ShieldCheck size={15} color={isLegalActive ? '#FFFFFF' : '#FC466B'} />
                <span>{dict.nav.trustSafety}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: activeDropdown === 'legal' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: isLegalActive ? '#FFFFFF' : '#FC466B',
                  }}
                />
              </button>

              {/* Legal Menu Flyout */}
              {activeDropdown === 'legal' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '125%',
                    left: isRtl ? 'auto' : 0,
                    right: isRtl ? 0 : 'auto',
                    width: 330,
                    backgroundColor: '#0C101A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 24,
                    padding: '12px 10px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(252, 70, 107, 0.1)',
                    zIndex: 210,
                    animation: 'scaleUp 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <Link
                      href={`/${locale}/child-safety`}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: pathname.startsWith(`/${locale}/child-safety`) ? 'rgba(252, 70, 107, 0.18)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => {
                        if (!pathname.startsWith(`/${locale}/child-safety`)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: '#FC466B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          flexShrink: 0,
                        }}
                      >
                        <ShieldAlert size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{dict.nav.childSafety}</span>
                          <span style={{ fontSize: 10, padding: '2px 6px', background: '#FC466B', color: '#FFFFFF', borderRadius: 999, fontWeight: 800 }}>P1</span>
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.childSafetyDesc}
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`/${locale}/privacy`}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: pathname.startsWith(`/${locale}/privacy`) ? 'rgba(252, 70, 107, 0.18)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => {
                        if (!pathname.startsWith(`/${locale}/privacy`)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FC466B',
                          flexShrink: 0,
                        }}
                      >
                        <Lock size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>
                          {dict.nav.privacy}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.privacyDesc}
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`/${locale}/terms`}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: pathname.startsWith(`/${locale}/terms`) ? 'rgba(252, 70, 107, 0.18)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => {
                        if (!pathname.startsWith(`/${locale}/terms`)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FC466B',
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>
                          {dict.nav.terms}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.termsDesc}
                        </div>
                      </div>
                    </Link>

                    <Link
                      href={`/${locale}/delete-account`}
                      onClick={() => setActiveDropdown(null)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 16,
                        background: pathname.startsWith(`/${locale}/delete-account`) ? 'rgba(252, 70, 107, 0.18)' : 'transparent',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
                      onMouseLeave={(e) => {
                        if (!pathname.startsWith(`/${locale}/delete-account`)) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 12,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FC466B',
                          flexShrink: 0,
                        }}
                      >
                        <UserX size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>
                          {dict.nav.deleteAccount || (locale === 'fa' ? 'حذف حساب کاربری' : 'Delete Account')}
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                          {dict.nav.deleteAccountDesc || (locale === 'fa' ? 'ثبت درخواست حذف دائمی اکانت و تمامی اطلاعات' : 'Permanent account and personal data deletion')}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 5. SUPPORT (Direct Link) */}
            <Link
              href={`/${locale}/support`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: isSupportActive ? 900 : 700,
                color: isSupportActive ? '#FFFFFF' : '#CBD5E1',
                padding: '8px 16px',
                borderRadius: 18,
                background: isSupportActive ? '#FC466B' : 'transparent',
                boxShadow: isSupportActive ? '0 4px 15px rgba(252, 70, 107, 0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isSupportActive) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSupportActive) {
                  e.currentTarget.style.color = '#CBD5E1';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <HelpCircle size={15} color={isSupportActive ? '#FFFFFF' : '#FC466B'} />
              <span>{dict.nav.support}</span>
            </Link>
          </nav>

          {/* RIGHT ACTION CLUSTER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* 19 LANGUAGES SELECTOR DROPDOWN */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="navbar-lang-btn"
                onClick={() => setActiveDropdown(activeDropdown === 'lang' ? null : 'lang')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 14px',
                  borderRadius: 20,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94A3B8',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FC466B';
                  e.currentTarget.style.background = '#FC466B';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  if (activeDropdown !== 'lang') {
                    e.currentTarget.style.borderColor = 'rgba(252, 70, 107, 0.35)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#94A3B8';
                  }
                }}
                aria-label="Select Language (19 Languages)"
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={currentLang.flagUrl}
                    alt={currentLang.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <span className="lang-text">{currentLang.native}</span>
                <ChevronDown
                  size={14}
                  className="lang-chevron"
                  style={{
                    transform: activeDropdown === 'lang' ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {/* 19 Languages Flyout Menu */}
              {activeDropdown === 'lang' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: isRtl ? 'auto' : 0,
                    left: isRtl ? 0 : 'auto',
                    width: 290,
                    maxHeight: 400,
                    overflowY: 'auto',
                    backgroundColor: '#0C101A',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 22,
                    padding: 8,
                    boxShadow: '0 20px 50px rgba(0,0,0,0.12), 0 0 30px rgba(252, 70, 107, 0.15)',
                    zIndex: 220,
                    animation: 'scaleUp 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      padding: '8px 12px 6px',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#FC466B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      borderBottom: '1px solid rgba(252, 70, 107, 0.15)',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>19 Official Languages</span>
                    <Globe size={13} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {languages.map((l) => {
                      const isSelected = l.code === locale;
                      return (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => handleLocaleChange(l.code)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: 12,
                            background: isSelected ? '#FC466B' : 'transparent',
                            border: isSelected ? '1px solid #FC466B' : '1px solid transparent',
                            color: isSelected ? '#FFFFFF' : '#CBD5E1',
                            fontSize: 13,
                            fontWeight: isSelected ? 800 : 600,
                            cursor: 'pointer',
                            textAlign: 'left',
                            width: '100%',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                              e.currentTarget.style.color = '#FFFFFF';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#CBD5E1';
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                              }}
                            >
                              <img
                                src={l.flagUrl}
                                alt={l.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                            <span>{l.native}</span>
                          </div>
                          <span style={{ fontSize: 11, color: isSelected ? '#FFFFFF' : '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>
                            {l.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Launch Web App Button */}
            <a
              href="https://web.zevapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary desktop-only"
              style={{
                padding: '9px 18px',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <span>{dict.nav.openWebApp}</span>
              <ExternalLink size={14} />
            </a>

            {/* Download CTA Button */}
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              className="navbar-download-btn btn-primary"
              style={{
                padding: '9px 18px',
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              <Download size={15} />
              <span className="desktop-text">{dict.nav.download}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1.5px solid rgba(252, 70, 107, 0.3)',
                borderRadius: 12,
                color: '#FC466B',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE CATEGORIZED DRAWER */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: 8,
              background: '#0C101A',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              padding: '20px 16px 24px',
              pointerEvents: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              maxHeight: 'calc(100vh - 85px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Quick 19-Language Selector inside Drawer */}
            <div
              style={{
                marginBottom: 18,
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 18,
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 900,
                    color: '#FC466B',
                    textTransform: 'uppercase',
                  }}
                >
                  <Globe size={14} />
                  <span>19 Languages / ۱۹ زبان</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#94A3B8',
                    background: '#0C101A',
                    padding: '2px 8px',
                    borderRadius: 999,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {currentLang.native}
                </span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                  gap: 6,
                  maxHeight: 140,
                  overflowY: 'auto',
                  paddingRight: 2,
                }}
              >
                {languages.map((l) => {
                  const isSel = l.code === locale;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => handleLocaleChange(l.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 8px',
                        borderRadius: 10,
                        background: isSel ? '#FC466B' : 'rgba(255, 255, 255, 0.05)',
                        color: isSel ? '#FFFFFF' : '#CBD5E1',
                        border: isSel ? '1px solid #FC466B' : '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: 11,
                        fontWeight: isSel ? 800 : 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <img
                        src={l.flagUrl}
                        alt={l.name}
                        style={{ width: 14, height: 14, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {l.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Group 1: Platform & Main */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#FC466B', textTransform: 'uppercase', marginBottom: 8, padding: '0 8px' }}>
                {dict.nav.platform}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: isHomeActive ? 900 : 700,
                    color: isHomeActive ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: isHomeActive ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                  }}
                >
                  {dict.nav.home}
                </Link>
                <Link
                  href={`/${locale}/features`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: pathname.startsWith(`/${locale}/features`) ? 900 : 700,
                    color: pathname.startsWith(`/${locale}/features`) ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: pathname.startsWith(`/${locale}/features`) ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Sparkles size={15} color={pathname.startsWith(`/${locale}/features`) ? '#FFFFFF' : '#FC466B'} />
                  <span>{dict.nav.features}</span>
                </Link>
                <Link
                  href={`/${locale}/ecosystem`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: pathname.startsWith(`/${locale}/ecosystem`) ? 900 : 700,
                    color: pathname.startsWith(`/${locale}/ecosystem`) ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: pathname.startsWith(`/${locale}/ecosystem`) ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Layers size={15} color={pathname.startsWith(`/${locale}/ecosystem`) ? '#FFFFFF' : '#FC466B'} />
                  <span>{dict.nav.ecosystem}</span>
                </Link>
              </div>
            </div>

            {/* Group 2: Company & Team */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#FC466B', textTransform: 'uppercase', marginBottom: 8, padding: '0 8px' }}>
                {dict.nav.about}
              </div>
              <Link
                href={`/${locale}/about`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 14,
                  fontWeight: isAboutActive ? 900 : 700,
                  color: isAboutActive ? '#FFFFFF' : '#CBD5E1',
                  padding: '9px 14px',
                  borderRadius: 12,
                  background: isAboutActive ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Users size={15} color={isAboutActive ? '#FFFFFF' : '#FC466B'} />
                <span>{dict.nav.about}</span>
              </Link>
            </div>

            {/* Group 3: Trust, Safety & Legal */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#FC466B', textTransform: 'uppercase', marginBottom: 8, padding: '0 8px' }}>
                {dict.nav.trustSafety}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Link
                  href={`/${locale}/child-safety`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: pathname.startsWith(`/${locale}/child-safety`) ? 900 : 700,
                    color: pathname.startsWith(`/${locale}/child-safety`) ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: pathname.startsWith(`/${locale}/child-safety`) ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <ShieldAlert size={15} color={pathname.startsWith(`/${locale}/child-safety`) ? '#FFFFFF' : '#FC466B'} />
                  <span>{dict.nav.childSafety}</span>
                </Link>
                <Link
                  href={`/${locale}/privacy`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: pathname.startsWith(`/${locale}/privacy`) ? 900 : 700,
                    color: pathname.startsWith(`/${locale}/privacy`) ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: pathname.startsWith(`/${locale}/privacy`) ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Lock size={15} color={pathname.startsWith(`/${locale}/privacy`) ? '#FFFFFF' : '#FC466B'} />
                  <span>{dict.nav.privacy}</span>
                </Link>
                <Link
                  href={`/${locale}/terms`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: pathname.startsWith(`/${locale}/terms`) ? 900 : 700,
                    color: pathname.startsWith(`/${locale}/terms`) ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: pathname.startsWith(`/${locale}/terms`) ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <FileText size={15} color={pathname.startsWith(`/${locale}/terms`) ? '#FFFFFF' : '#FC466B'} />
                  <span>{dict.nav.terms}</span>
                </Link>
                <Link
                  href={`/${locale}/delete-account`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 14,
                    fontWeight: pathname.startsWith(`/${locale}/delete-account`) ? 900 : 700,
                    color: pathname.startsWith(`/${locale}/delete-account`) ? '#FFFFFF' : '#CBD5E1',
                    padding: '9px 14px',
                    borderRadius: 12,
                    background: pathname.startsWith(`/${locale}/delete-account`) ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <UserX size={15} color={pathname.startsWith(`/${locale}/delete-account`) ? '#FFFFFF' : '#FC466B'} />
                  <span>{dict.nav.deleteAccount || (locale === 'fa' ? 'حذف حساب کاربری' : 'Delete Account')}</span>
                </Link>
              </div>
            </div>

            {/* Group 4: Support */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: '#FC466B', textTransform: 'uppercase', marginBottom: 8, padding: '0 8px' }}>
                {dict.nav.support}
              </div>
              <Link
                href={`/${locale}/support`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 14,
                  fontWeight: isSupportActive ? 900 : 700,
                  color: isSupportActive ? '#FFFFFF' : '#CBD5E1',
                  padding: '9px 14px',
                  borderRadius: 12,
                  background: isSupportActive ? '#FC466B' : 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <HelpCircle size={15} color={isSupportActive ? '#FFFFFF' : '#FC466B'} />
                <span>{dict.nav.support}</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 10, borderTop: '1px solid rgba(252, 70, 107, 0.2)' }}>
              <a
                href="https://web.zevapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>{dict.nav.openWebApp}</span>
                <ExternalLink size={16} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDownloadModalOpen(true);
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                <Download size={16} />
                <span>{dict.nav.download}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Download Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
};
