'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

function ResetPasswordContent() {
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Verify active session or recovery auth state
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setHasSession(!!session);
      } catch {
        setHasSession(false);
      }
    }

    checkAuth();

    // Listen for auth state change in case of late hash parsing
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasSession(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 2. Password Strength Evaluation
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = calculateStrength(password);
  const getStrengthLabel = () => {
    if (password.length === 0) return { label: '', color: '#CBD5E1', percent: '0%' };
    if (strengthScore <= 2) return { label: 'Weak', color: '#EF4444', percent: '33%' };
    if (strengthScore <= 4) return { label: 'Good', color: '#F59E0B', percent: '66%' };
    return { label: 'Strong', color: '#10B981', percent: '100%' };
  };

  const strength = getStrengthLabel();

  // 3. Handle Update Password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setErrorMessage(error.message || 'Failed to update password.');
      } else {
        setIsSuccess(true);
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

        {/* Loading session check */}
        {hasSession === null && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                margin: '0 auto 16px',
                border: '3px solid #E2E8F0',
                borderTopColor: '#00C6FF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <p style={{ fontSize: '14px', color: '#64748B' }}>Checking security session...</p>
          </div>
        )}

        {/* No active recovery session */}
        {hasSession === false && !isSuccess && (
          <div style={{ textAlign: 'center' }}>
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
              Reset Link Expired
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', marginBottom: '24px' }}>
              For your account safety, password recovery links are time-sensitive. Please request a new link to proceed.
            </p>
            <Link
              href="/login"
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
              <RefreshCw size={16} />
              <span>Request Password Reset</span>
            </Link>
          </div>
        )}

        {/* Success confirmation */}
        {isSuccess && (
          <div style={{ textAlign: 'center' }}>
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
              Password Updated!
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.5', marginBottom: '24px' }}>
              Your new password has been securely saved. You can now log in to your ZEV account across all devices.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="zevapp://login"
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
                <span>Open ZEV Mobile App</span>
              </a>

              <Link
                href="/login"
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
                <span>Proceed to Web Login</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Set password form */}
        {hasSession === true && !isSuccess && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                Set New Password
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
                Choose a strong password to protect your ZEV account
              </p>
            </div>

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

            <form onSubmit={handleSubmit}>
              {/* New Password */}
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
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
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
                      transition: 'border-color 0.2s ease',
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

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '4px',
                        background: '#E2E8F0',
                        borderRadius: '2px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: strength.percent,
                          height: '100%',
                          background: strength.color,
                          transition: 'width 0.3s ease, background 0.3s ease',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: '#64748B',
                        marginTop: '4px',
                      }}
                    >
                      <span>Password strength:</span>
                      <span style={{ fontWeight: 600, color: strength.color }}>{strength.label}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '6px',
                  }}
                >
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
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
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
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
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
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
                  transition: 'opacity 0.2s ease, transform 0.1s ease',
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
                    <ShieldCheck size={18} />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
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

export default function ResetPasswordPage() {
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
      <ResetPasswordContent />
    </Suspense>
  );
}

