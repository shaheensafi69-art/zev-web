'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ExternalLink, Sparkles } from 'lucide-react';
import { isRtlLocale, Dictionary } from '@/dictionaries';
import { DownloadModal } from './DownloadModal';

// Official Google Play vector icon
const GooglePlayIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
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

interface NavbarProps {
  locale: string;
  dict: Dictionary;
}

export const Navbar: React.FC<NavbarProps> = ({ locale, dict }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isRtl = isRtlLocale(locale);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/features`, label: 'Features' },
    { href: `/${locale}/about`, label: 'About' },
    { href: `/${locale}/ecosystem`, label: 'Ecosystem' },
    { href: `/${locale}/press`, label: 'Newsroom' },
    { href: `/${locale}/jobs`, label: 'Careers' },
    { href: `/${locale}/support`, label: 'Support' },
  ];

  const isActiveLink = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Floating Minimalist Header */}
      <header
        style={{
          position: 'fixed',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1180px, 94%)',
          zIndex: 100,
          pointerEvents: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div
          style={{
            position: 'relative',
            height: 64,
            padding: '0 20px',
            background: scrolled
              ? 'rgba(7, 10, 18, 0.92)'
              : 'rgba(9, 13, 22, 0.82)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 212, 255, 0.08)',
            pointerEvents: 'auto',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Left: Clean Brand Logo */}
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
              style={{
                position: 'relative',
                width: 34,
                height: 34,
                borderRadius: 10,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #00D4FF 0%, #536DFE 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0, 212, 255, 0.35)',
              }}
            >
              <Image
                src="/assets/icon-clean.png"
                alt="ZEV Logo"
                width={34}
                height={34}
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 60%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                ZEV
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#00D4FF',
                  background: 'rgba(0, 212, 255, 0.12)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  padding: '2px 6px',
                  borderRadius: 6,
                  letterSpacing: 0.5,
                }}
              >
                v2.4
              </span>
            </div>
          </Link>

          {/* Center: Minimalist Desktop Navigation (Clean, flat text links) */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    padding: '8px 14px',
                    fontSize: 13.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? '#FFFFFF' : '#94A3B8',
                    textDecoration: 'none',
                    borderRadius: 20,
                    transition: 'all 0.2s ease',
                    background: active ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 3,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: '#00D4FF',
                        boxShadow: '0 0 6px #00D4FF',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (NO Language selector, pure clean CTAs) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
            }}
          >
            {/* Launch Web App Ghost Button */}
            <a
              href="https://zevapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="desktop-only"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 18,
                fontSize: 13,
                fontWeight: 600,
                color: '#CBD5E1',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#CBD5E1';
              }}
            >
              <span>Launch Web</span>
              <ExternalLink size={12} color="#00D4FF" />
            </a>

            {/* Download App / Google Play CTA Button */}
            <button
              type="button"
              onClick={() => setDownloadModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 800,
                color: '#07090E',
                background: '#00D4FF',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 212, 255, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#38E1FF';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#00D4FF';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <GooglePlayIcon size={16} />
              <span>Get App</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: 10,
              padding: 20,
              background: 'rgba(9, 13, 22, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 24,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 14,
                    fontSize: 15,
                    fontWeight: active ? 800 : 600,
                    color: active ? '#00D4FF' : '#E2E8F0',
                    background: active ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#00D4FF',
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <a
                href="https://zevapp.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textDecoration: 'none',
                }}
              >
                <span>Launch Web Application</span>
                <ExternalLink size={14} color="#00D4FF" />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.zevapp.app&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px',
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#07090E',
                  background: '#00D4FF',
                  textDecoration: 'none',
                }}
              >
                <GooglePlayIcon size={18} />
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </>
  );
};
