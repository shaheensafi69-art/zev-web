'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Smartphone,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState<string>(initialEmail);
  const [digits, setDigits] = useState<string[]>(Array(8).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState<number>(0);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleDigitChange = (index: number, value: string) => {
    setErrorMessage(null);
    const cleaned = value.replace(/[^0-9]/g, '');

    if (cleaned.length > 1) {
      // Handle paste directly inside a single input
      handlePasteString(cleaned);
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = cleaned;
    setDigits(nextDigits);

    if (cleaned && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePasteString = (pasteData: string) => {
    const cleaned = pasteData.replace(/[^0-9]/g, '').slice(0, 8);
    if (!cleaned) return;

    const nextDigits = [...digits];
    for (let i = 0; i < cleaned.length; i++) {
      nextDigits[i] = cleaned[i];
    }
    setDigits(nextDigits);

    const nextFocusIndex = Math.min(cleaned.length, 7);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    handlePasteString(paste);
  };

  const fullCode = digits.join('');
  const isCodeComplete = fullCode.length === 8;

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isCodeComplete) {
      setErrorMessage('Please enter the full 8-digit verification code.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Attempt signup OTP verification first
      let res = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: fullCode,
        type: 'signup',
      });

      // 2. If signup fails, attempt email_change OTP
      if (res.error) {
        res = await supabase.auth.verifyOtp({
          email: email.trim().toLowerCase(),
          token: fullCode,
          type: 'email_change',
        });
      }

      if (res.error) {
        throw res.error;
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid or expired verification code.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email) return;
    setErrorMessage(null);
    setResendNotice(null);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim().toLowerCase(),
      });

      if (error) throw error;

      setResendNotice('A new 8-digit code has been sent to your email.');
      setResendCooldown(60);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to resend code.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[720px] bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-10 w-[480px] h-[480px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-black text-cyan-400">Z</span>
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            ZEV
          </span>
        </Link>

        <a
          href="https://zevapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10"
        >
          <span>Launch Web App</span>
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
        </a>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
            {/* Subtle top edge highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            {!isSuccess ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4 shadow-inner">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                    Verify Your Email
                  </h1>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Enter the 8-digit verification code sent to your email address.
                  </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                  {/* Email input field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  {/* 8-Digit OTP Boxes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      8-Digit Code
                    </label>
                    <div className="grid grid-cols-8 gap-1.5 sm:gap-2">
                      {digits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleDigitChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          className="w-full h-12 sm:h-14 text-center text-lg sm:text-xl font-extrabold bg-slate-950/70 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl text-white outline-none transition-all shadow-inner"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Error & Info Alerts */}
                  {errorMessage && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {resendNotice && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{resendNotice}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !isCodeComplete || !email}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify & Continue</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Resend Link */}
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || !email}
                      className="text-xs text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
                    >
                      {resendCooldown > 0
                        ? `Resend code in ${resendCooldown}s`
                        : "Didn't receive the code? Resend"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-5 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Email Verified!
                </h2>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed mb-8">
                  Your email has been confirmed successfully. You can now access all features of ZEV.
                </p>

                <div className="space-y-3">
                  <a
                    href="https://zevapp.com"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Open ZEV Web App</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.zevapp.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4 text-cyan-400" />
                    <span>Download Android App</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
            <span>Encrypted & Verified by ZEV Security</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-slate-500">
        © 2026 ZEV Platform. All rights reserved.
      </footer>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
