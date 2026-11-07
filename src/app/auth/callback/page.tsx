'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Smartphone,
  RefreshCw,
  Home,
  ShieldCheck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'recovery'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('Your account has been successfully verified.');

  useEffect(() => {
    let isMounted = true;

    async function handleAuth() {
      try {
        // 1. Check for explicit error parameters in the URL
        const error = searchParams.get('error');
        const errorDesc = searchParams.get('error_description');
        if (error || errorDesc) {
          if (isMounted) {
            setStatus('error');
            setErrorMessage(errorDesc || error || 'Authentication link is invalid or expired.');
          }
          return;
        }

        // 2. Parse URL parameters (Query & Hash)
        const code = searchParams.get('code');
        const type = searchParams.get('type');
        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
        const hashType = hashParams.get('type');
        const effectiveType = type || hashType;

        // 3. Handle PKCE Code Exchange
        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            if (isMounted) {
              setStatus('error');
              setErrorMessage(exchangeError.message || 'Unable to exchange verification code.');
            }
            return;
          }

          if (effectiveType === 'recovery' || data.session?.user) {
            if (effectiveType === 'recovery') {
              if (isMounted) {
                setStatus('recovery');
                setTimeout(() => router.replace('/reset-password'), 1200);
              }
              return;
            }
          }
        }

        // 4. Handle Implicit Hash Tokens (access_token, refresh_token)
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            if (isMounted) {
              setStatus('error');
              setErrorMessage(sessionError.message);
            }
            return;
          }

          if (effectiveType === 'recovery') {
            if (isMounted) {
              setStatus('recovery');
              setTimeout(() => router.replace('/reset-password'), 1200);
            }
            return;
          }
        }

        // 5. Check if user has an active session right now
        const { data: { session } } = await supabase.auth.getSession();

        if (effectiveType === 'recovery') {
          if (isMounted) {
            setStatus('recovery');
            setTimeout(() => router.replace('/reset-password'), 1200);
          }
          return;
        }

        if (effectiveType === 'signup') {
          if (isMounted) {
            setSuccessMessage('Welcome to ZEV! Your email address has been confirmed.');
            setStatus('success');
          }
        } else if (effectiveType === 'magiclink') {
          if (isMounted) {
            setSuccessMessage('Welcome back! You have successfully signed in with your magic link.');
            setStatus('success');
          }
        } else if (session) {
          if (isMounted) {
            setSuccessMessage('Authentication complete! Your session is active.');
            setStatus('success');
          }
        } else {
          // If no code, no tokens, and no session, show graceful error
          if (isMounted) {
            setStatus('error');
            setErrorMessage('No valid authentication token found in this link. It may have expired.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setStatus('error');
          setErrorMessage(err?.message || 'An unexpected error occurred during authentication.');
        }
      }
    }

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [searchParams, router]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(circle at 50% 20%, #E0F2FE 0%, #F0F4F8 100%)',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Mobile App Smart Banner */}
      <a
        href="zevapp://auth/callback"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #E2E8F0',
          borderRadius: '9999px',
          padding: '8px 18px',
          marginBottom: '20px',
          color: '#0284C7',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(0, 198, 255, 0.08)',
          transition: 'all 0.2s ease',
        }}
      >
        <Smartphone size={16} />
        <span>Tap to open in the ZEV Mobile App</span>
      </a>

      {/* Main Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 40px -15px rgba(0, 114, 255, 0.08), 0 0 1px rgba(0,0,0,0.05)',
          padding: '36px 32px',
          textAlign: 'center',
        }}
      >
        {/* Brand Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #060913 0%, #10182E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 198, 255, 0.2)',
              overflow: 'hidden',
              padding: '6px',
            }}
          >
            <Image
              src="/assets/logo-without-b.png"
              alt="ZEV Logo"
              width={52}
              height={52}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        {/* 1. LOADING STATE */}
        {status === 'loading' && (
          <div>
            <div
              style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 18px',
                border: '3.5px solid #E2E8F0',
                borderTopColor: '#00C6FF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Verifying Credentials
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
              Please hold on while we safely verify your secure authentication link...
            </p>
          </div>
        )}

        {/* 2. RECOVERY REDIRECTING */}
        {status === 'recovery' && (
          <div>
            <div
              style={{
                width: '52px',
                height: '52px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'rgba(0, 198, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0072FF',
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Reset Link Verified
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', marginBottom: '20px' }}>
              Redirecting you to choose a new secure password...
            </p>
            <Link
              href="/reset-password"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '13px 20px',
                background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                color: '#FFFFFF',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
              }}
            >
              <span>Continue to Set Password</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* 3. SUCCESS STATE */}
        {status === 'success' && (
          <div>
            <div
              style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Verification Successful!
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', marginBottom: '24px' }}>
              {successMessage}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="zevapp://feed"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '13px 20px',
                  background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
                }}
              >
                <Smartphone size={16} />
                <span>Open in ZEV Mobile App</span>
              </a>

              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px 20px',
                  background: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Home size={16} />
                <span>Go to Homepage</span>
              </Link>
            </div>
          </div>
        )}

        {/* 4. ERROR STATE */}
        {status === 'error' && (
          <div>
            <div
              style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444',
              }}
            >
              <AlertCircle size={32} />
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Verification Failed
            </h1>
            <p
              style={{
                fontSize: '13.5px',
                color: '#64748B',
                lineHeight: '1.5',
                marginBottom: '24px',
                background: '#FEF2F2',
                border: '1px solid #FEE2E2',
                borderRadius: '12px',
                padding: '12px',
              }}
            >
              {errorMessage}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                href="/login"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '13px 20px',
                  background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
                }}
              >
                <RefreshCw size={16} />
                <span>Request New Link</span>
              </Link>

              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px 20px',
                  background: '#F8FAFC',
                  color: '#475569',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Home size={16} />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Slogan Footer */}
      <p style={{ marginTop: '24px', fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
        Connect. Share. Discover. A new space for everyone.
      </p>

      {/* Embedded Spinner Keyframes */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F0F4F8',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid #E2E8F0',
              borderTopColor: '#00C6FF',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}

