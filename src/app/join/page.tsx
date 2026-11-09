'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Sparkles, Check, Copy, Download, Smartphone, ArrowRight, ShieldCheck, 
  Heart, Share2, AlertCircle, Users, QrCode, ExternalLink, Zap
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ReferrerProfile {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  is_verified?: boolean;
  bio?: string;
}

function JoinContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawRef = searchParams.get('ref') || '';
  const refCode = rawRef.trim().toLowerCase();

  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [referrer, setReferrer] = useState<ReferrerProfile | null>(null);
  const [loadingReferrer, setLoadingReferrer] = useState(true);
  const [showQr, setShowQr] = useState(false);

  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.zevapp.app';

  // Smart Deep Link URIs
  const zevSchemeUri = `zev://join?ref=${encodeURIComponent(refCode)}`;
  const androidIntentUri = `intent://join?ref=${encodeURIComponent(refCode)}#Intent;scheme=zev;package=com.zevapp.app;S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end;`;

  // Fetch real profile data of the inviter
  useEffect(() => {
    if (!refCode) {
      setLoadingReferrer(false);
      return;
    }

    // Save referral code in browser storage for session attribution
    try {
      localStorage.setItem('zev_referral_code', refCode);
    } catch (_) {}

    async function fetchReferrer() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, first_name, last_name, avatar_url, is_verified, bio')
          .or(`referral_code.eq.${refCode},username.eq.${refCode}`)
          .maybeSingle();

        if (data && !error) {
          setReferrer(data as ReferrerProfile);
        }
      } catch (err) {
        console.warn('Referrer lookup error:', err);
      } finally {
        setLoadingReferrer(false);
      }
    }

    fetchReferrer();
  }, [refCode]);

  // If accessed without a ref code, redirect to home
  if (!refCode) {
    if (typeof window !== 'undefined') {
      router.replace('/');
    }
    return (
      <div style={{
        minHeight: '100vh',
        background: '#07090E',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: 420,
          width: '100%',
          padding: 32,
          borderRadius: 24,
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#F59E0B',
          }}>
            <AlertCircle size={28} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: -0.5 }}>
            Invitation Required
          </h1>
          <p style={{ fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6, marginBottom: 24 }}>
            The ZEV VIP portal requires a valid invitation link from an existing member or creator.
          </p>
          <button
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #0284C7, #06B6D4)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 14,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.4)',
            }}
          >
            <span>Explore ZEV Homepage</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleOpenApp = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      // Android Intent URI: Launches app if installed, automatically falls back to Play Store if not!
      window.location.href = androidIntentUri;
    } else if (isIOS) {
      // iOS: Try custom scheme, fallback to Play Store or Web after timer
      const now = Date.now();
      window.location.href = zevSchemeUri;
      setTimeout(() => {
        if (Date.now() - now < 2000) {
          window.location.href = playStoreUrl;
        }
      }, 1500);
    } else {
      // Desktop: Show QR code or open Play Store
      setShowQr(true);
    }
  };

  const inviterFullName = referrer
    ? `${referrer.first_name || ''} ${referrer.last_name || ''}`.trim() || `@${referrer.username}`
    : `@${refCode}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : `https://www.zevapp.com/join?ref=${refCode}`
  )}&bgcolor=0A0F1D&color=38BDF8&margin=10`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07090E',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Dynamic Ambient Background Glows */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '20%',
        width: 480,
        height: 480,
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, transparent 70%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: 420,
        height: 420,
        background: 'radial-gradient(circle, rgba(252, 70, 107, 0.14) 0%, transparent 70%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      {/* Top Header Bar */}
      <header style={{
        padding: '20px 24px',
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #0284C7, #38BDF8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 22,
            color: '#FFFFFF',
            boxShadow: '0 8px 20px -4px rgba(2, 132, 199, 0.5)',
          }}>
            Z
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.4 }}>ZEV</div>
            <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: 0.5 }}>CALM SOCIAL</div>
          </div>
        </div>

        <a
          href={playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '9px 16px',
            borderRadius: 12,
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#E2E8F0',
            fontSize: 12.5,
            fontWeight: 700,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
        >
          <Download size={14} color="#38BDF8" />
          <span>Get ZEV</span>
        </a>
      </header>

      {/* Main VIP Invitation Container */}
      <main style={{
        maxWidth: 580,
        margin: '0 auto',
        width: '100%',
        padding: '16px 20px 32px',
        zIndex: 10,
      }}>
        <div style={{
          padding: '36px 28px',
          borderRadius: 32,
          background: 'rgba(12, 16, 26, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
        }}>

          {/* Invitation Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 9999,
            background: 'rgba(2, 132, 199, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            marginBottom: 24,
          }}>
            <Sparkles size={13} color="#38BDF8" />
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#38BDF8',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
            }}>
              VIP Community Invitation
            </span>
          </div>

          {/* Inviter Profile Card */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 22,
          }}>
            {/* Avatar with Verified Ring */}
            <div style={{
              position: 'relative',
              width: 84,
              height: 84,
              borderRadius: '50%',
              padding: 3,
              background: 'linear-gradient(135deg, #0284C7, #38BDF8, #FC466B)',
              boxShadow: '0 12px 28px -6px rgba(2, 132, 199, 0.45)',
              marginBottom: 14,
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#0F172A',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {referrer?.avatar_url ? (
                  <img
                    src={referrer.avatar_url}
                    alt={inviterFullName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    fontSize: 30,
                    fontWeight: 900,
                    color: '#38BDF8',
                    textTransform: 'uppercase',
                  }}>
                    {refCode.charAt(0)}
                  </div>
                )}
              </div>

              {referrer?.is_verified && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#0284C7',
                  border: '2.5px solid #07090E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                }}>
                  <Check size={14} color="#FFFFFF" strokeWidth={3.5} />
                </div>
              )}
            </div>

            {/* Inviter Name & Handle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              justifyContent: 'center',
              marginBottom: 4,
            }}>
              <h2 style={{
                fontSize: 20,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: -0.4,
                margin: 0,
              }}>
                {inviterFullName}
              </h2>
              {referrer?.is_verified && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 900,
                  padding: '2px 7px',
                  borderRadius: 6,
                  background: 'rgba(2, 132, 199, 0.16)',
                  color: '#38BDF8',
                  letterSpacing: 0.5,
                }}>
                  VERIFIED
                </span>
              )}
            </div>

            <p style={{
              fontSize: 13,
              color: '#94A3B8',
              margin: 0,
              fontWeight: 500,
            }}>
              has invited you to join <strong style={{ color: '#F1F5F9' }}>ZEV</strong>
            </p>

            {referrer?.bio && (
              <p style={{
                fontSize: 12,
                color: '#64748B',
                marginTop: 8,
                maxWidth: 380,
                lineHeight: 1.45,
                fontStyle: 'italic',
              }}>
                &ldquo;{referrer.bio}&rdquo;
              </p>
            )}
          </div>

          {/* Description */}
          <p style={{
            fontSize: 14,
            color: '#CBD5E1',
            lineHeight: 1.6,
            maxWidth: 440,
            margin: '0 auto 24px',
          }}>
            Experience an authentic social space designed for high-resolution 4K reels,
            real conversations, zero toxic algorithms, and genuine connections.
          </p>

          {/* Invitation Code Box with 1-Click Copy */}
          <div style={{
            padding: '16px 18px',
            borderRadius: 18,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(56, 189, 248, 0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 20,
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: 10,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                color: '#64748B',
                marginBottom: 2,
              }}>
                Invitation Code
              </div>
              <div style={{
                fontSize: 19,
                fontWeight: 900,
                fontFamily: 'monospace',
                color: '#38BDF8',
                letterSpacing: 1.2,
              }}>
                {refCode}
              </div>
            </div>

            <button
              onClick={handleCopyCode}
              style={{
                padding: '9px 16px',
                borderRadius: 12,
                background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(30, 41, 59, 0.8)',
                border: copied ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
                color: copied ? '#10B981' : '#FFFFFF',
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} color="#10B981" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} color="#94A3B8" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {/* Open in App Button */}
            <button
              onClick={handleOpenApp}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 18,
                background: 'linear-gradient(135deg, #0284C7, #06B6D4)',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: 15,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 12px 30px -6px rgba(2, 132, 199, 0.5)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              <Smartphone size={20} />
              <span>Open in ZEV App</span>
            </button>

            {/* Download on Google Play */}
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: 18,
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#E2E8F0',
                fontWeight: 800,
                fontSize: 13.5,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s',
              }}
            >
              <Download size={16} color="#38BDF8" />
              <span>Download on Google Play</span>
            </a>
          </div>

          {/* Secondary Actions: QR & Share */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            paddingTop: 12,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontSize: 12,
            color: '#94A3B8',
          }}>
            <button
              onClick={() => setShowQr(!showQr)}
              style={{
                background: 'none',
                border: 'none',
                color: showQr ? '#38BDF8' : '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                padding: '4px 8px',
              }}
            >
              <QrCode size={15} />
              <span>{showQr ? 'Hide QR Code' : 'Scan QR Code'}</span>
            </button>

            <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>•</span>

            <button
              onClick={handleCopyLink}
              style={{
                background: 'none',
                border: 'none',
                color: copiedLink ? '#10B981' : '#94A3B8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                padding: '4px 8px',
              }}
            >
              {copiedLink ? <Check size={14} color="#10B981" /> : <Share2 size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Collapsible QR Code Viewer for Desktop / Mirroring */}
          {showQr && (
            <div style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 20,
              background: '#0A0F1D',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <p style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#38BDF8',
                marginBottom: 10,
              }}>
                Scan with your phone camera to open in ZEV
              </p>
              <img
                src={qrImageUrl}
                alt="ZEV Invitation QR Code"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 14,
                  background: '#FFFFFF',
                  padding: 8,
                }}
              />
            </div>
          )}

        </div>

        {/* Feature Highlights Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 12,
          marginTop: 20,
        }}>
          <div style={{
            padding: 16,
            borderRadius: 20,
            background: 'rgba(12, 16, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
          }}>
            <ShieldCheck size={20} color="#38BDF8" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 2 }}>
              Zero Toxicity
            </div>
            <div style={{ fontSize: 11, color: '#64748B' }}>
              Calm, mindful social space
            </div>
          </div>

          <div style={{
            padding: 16,
            borderRadius: 20,
            background: 'rgba(12, 16, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
          }}>
            <Zap size={20} color="#A855F7" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 2 }}>
              4K HDR Reels
            </div>
            <div style={{ fontSize: 11, color: '#64748B' }}>
              Ultra crisp video and audio
            </div>
          </div>

          <div style={{
            padding: 16,
            borderRadius: 20,
            background: 'rgba(12, 16, 26, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center',
          }}>
            <Heart size={20} color="#FC466B" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', marginBottom: 2 }}>
              100% Free Core
            </div>
            <div style={{ fontSize: 11, color: '#64748B' }}>
              All social features unlocked
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px 20px',
        textAlign: 'center',
        fontSize: 12,
        color: '#475569',
        zIndex: 10,
      }}>
        © {new Date().getFullYear()} ZEV Social Network. All rights reserved.
      </footer>
    </div>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: '#07090E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#38BDF8',
        fontWeight: 700,
        fontSize: 14,
      }}>
        Loading invitation...
      </div>
    }>
      <JoinContent />
    </Suspense>
  );
}
