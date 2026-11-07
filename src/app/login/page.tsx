'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  RefreshCw,
  Send,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

function LoginContent() {
  const [authMode, setAuthMode] = useState<'magic' | 'password' | 'otp' | 'forgot'>('magic');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  // 1. Send Magic Link
  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessInfo(null);
    setIsLoading(true);

    try {
      const redirectUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback?type=magiclink`
          : 'https://www.zevapp.com/auth/callback?type=magiclink';

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'Failed to send magic link.');
      } else {
        setSuccessInfo(
          `We've sent a magic sign-in link and verification code to ${email.trim()}. Click the link in your email or enter the 6-digit code below.`
        );
        setAuthMode('otp');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verify 6-digit OTP code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: otpToken.trim(),
        type: 'email',
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid or expired OTP code.');
      } else if (data.session) {
        setSuccessInfo('Sign in verified! Welcome to ZEV.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Standard Email + Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(error.message || 'Invalid email or password.');
      } else if (data.session) {
        setSuccessInfo('Sign in successful! Welcome to ZEV.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Send Password Reset Link
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const redirectUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback?type=recovery`
          : 'https://www.zevapp.com/auth/callback?type=recovery';

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        setErrorMessage(error.message || 'Failed to send recovery email.');
      } else {
        setSuccessInfo(`Password recovery link sent to ${email.trim()}! Please check your inbox.`);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

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
      {/* Mobile App Handshake Banner */}
      <a
        href="zevapp://login"
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
        }}
      >
        <Smartphone size={16} />
        <span>Open in ZEV Mobile App</span>
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

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
            {authMode === 'forgot'
              ? 'Reset Password'
              : authMode === 'otp'
              ? 'Enter Verification Code'
              : 'Sign in to ZEV'}
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
            {authMode === 'forgot'
              ? "We'll send a password recovery link to your inbox"
              : authMode === 'otp'
              ? 'Check your email for the 6-digit confirmation code'
              : 'Connect, share and discover with your community'}
          </p>
        </div>

        {/* Navigation Tabs (Magic Link vs Password) */}
        {authMode !== 'otp' && authMode !== 'forgot' && (
          <div
            style={{
              display: 'flex',
              background: '#F1F5F9',
              borderRadius: '14px',
              padding: '4px',
              marginBottom: '20px',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setAuthMode('magic');
                setErrorMessage(null);
              }}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: 'none',
                borderRadius: '11px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                background: authMode === 'magic' ? '#FFFFFF' : 'transparent',
                color: authMode === 'magic' ? '#0F172A' : '#64748B',
                boxShadow: authMode === 'magic' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              <Sparkles size={15} color={authMode === 'magic' ? '#0072FF' : '#94A3B8'} />
              <span>Magic Link</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('password');
                setErrorMessage(null);
              }}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: 'none',
                borderRadius: '11px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                background: authMode === 'password' ? '#FFFFFF' : 'transparent',
                color: authMode === 'password' ? '#0F172A' : '#64748B',
                boxShadow: authMode === 'password' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              <Lock size={15} color={authMode === 'password' ? '#0072FF' : '#94A3B8'} />
              <span>Password</span>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FEF2F2',
              border: '1px solid #FEE2E2',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '18px',
              color: '#DC2626',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successInfo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#ECFDF5',
              border: '1px solid #D1FAE5',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '18px',
              color: '#059669',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{successInfo}</span>
          </div>
        )}

        {/* 1. MAGIC LINK FORM */}
        {authMode === 'magic' && (
          <form onSubmit={handleSendMagicLink}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '14px',
                    fontSize: '14px',
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2.5px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#FFFFFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
              ) : (
                <>
                  <Send size={17} />
                  <span>Send Magic Link & OTP</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. PASSWORD FORM */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '14px',
                    fontSize: '14px',
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('forgot');
                    setErrorMessage(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0284C7',
                    cursor: 'pointer',
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '14px',
                    fontSize: '14px',
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2.5px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#FFFFFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. OTP VERIFICATION FORM */}
        {authMode === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                6-Digit Email Code
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  maxLength={6}
                  value={otpToken}
                  onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '14px',
                    fontSize: '20px',
                    letterSpacing: '6px',
                    textAlign: 'center',
                    fontWeight: 700,
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otpToken.length !== 6}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isLoading || otpToken.length !== 6 ? 'not-allowed' : 'pointer',
                opacity: isLoading || otpToken.length !== 6 ? 0.6 : 1,
                boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2.5px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#FFFFFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
              ) : (
                <>
                  <KeyRound size={17} />
                  <span>Verify Code & Sign In</span>
                </>
              )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('magic');
                  setOtpToken('');
                  setErrorMessage(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Back to email input
              </button>
            </div>
          </form>
        )}

        {/* 4. FORGOT PASSWORD FORM */}
        {authMode === 'forgot' && (
          <form onSubmit={handleForgotPassword}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px',
                }}
              >
                Registered Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    background: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    borderRadius: '14px',
                    fontSize: '14px',
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px 20px',
                background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 8px 20px rgba(0, 114, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2.5px solid rgba(255,255,255,0.4)',
                    borderTopColor: '#FFFFFF',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
              ) : (
                <>
                  <RefreshCw size={17} />
                  <span>Send Recovery Email</span>
                </>
              )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('password');
                  setErrorMessage(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Back to sign in
              </button>
            </div>
          </form>
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

export default function LoginPage() {
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
      <LoginContent />
    </Suspense>
  );
}

