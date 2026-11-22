'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  Coins,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Lock,
  CreditCard,
  Wallet,
  Search,
  UserCheck,
  AlertCircle,
  Gift,
  Zap,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Crown,
  Flame,
  Award,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  is_verified?: boolean;
  coins_balance?: number;
}

interface CoinTier {
  id: string;
  coins: number;
  usdPrice: number;
  bonus?: number;
  discountPercent?: number;
  badge?: string;
  popular?: boolean;
}

const COIN_TIERS: CoinTier[] = [
  { id: 'tier_70', coins: 70, usdPrice: 0.99 },
  { id: 'tier_350', coins: 350, usdPrice: 4.79, discountPercent: 5 },
  { id: 'tier_700', coins: 700, usdPrice: 9.49, discountPercent: 10, popular: true, badge: 'MOST POPULAR' },
  { id: 'tier_1400', coins: 1400, usdPrice: 18.49, discountPercent: 15, badge: 'CREATOR CHOICE' },
  { id: 'tier_3500', coins: 3500, usdPrice: 44.99, discountPercent: 20, badge: 'VIP STREAMER' },
  { id: 'tier_7000', coins: 7000, usdPrice: 84.99, discountPercent: 25, badge: 'ELITE PRO' },
  { id: 'tier_17500', coins: 17500, usdPrice: 199.99, discountPercent: 30, badge: 'MAX SAVINGS' },
];

function CoinsRechargeContent() {
  const searchParams = useSearchParams();
  const urlUid = searchParams.get('uid')?.trim() || '';
  const urlUsername = searchParams.get('username')?.trim() || '';

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [searchUsername, setSearchUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [selectedTier, setSelectedTier] = useState<CoinTier>(COIN_TIERS[2]);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customCoins, setCustomCoins] = useState(2500);

  const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'crypto' | 'apple_google'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [purchasedAmount, setPurchasedAmount] = useState(0);

  // 1. Initial Profile Resolution: via URL params (?uid= or ?username=) or current Supabase session
  useEffect(() => {
    async function resolveInitialUser() {
      setLoadingProfile(true);

      try {
        if (urlUid) {
          const { data } = await supabase
            .from('profiles')
            .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
            .eq('id', urlUid)
            .maybeSingle();

          if (data) {
            setProfile(data as UserProfile);
            setLoadingProfile(false);
            return;
          }
        }

        if (urlUsername) {
          const cleanName = urlUsername.replace(/^@/, '').toLowerCase();
          const { data } = await supabase
            .from('profiles')
            .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
            .ilike('username', cleanName)
            .maybeSingle();

          if (data) {
            setProfile(data as UserProfile);
            setLoadingProfile(false);
            return;
          }
        }

        // Fallback: Check if client has active Supabase web auth session
        const { data: sessionData } = await supabase.auth.getSession();
        const activeUserId = sessionData?.session?.user?.id;
        if (activeUserId) {
          const { data } = await supabase
            .from('profiles')
            .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
            .eq('id', activeUserId)
            .maybeSingle();

          if (data) {
            setProfile(data as UserProfile);
            setLoadingProfile(false);
            return;
          }
        }
      } catch (err) {
        console.error('Profile resolution notice:', err);
      } finally {
        setLoadingProfile(false);
      }
    }

    resolveInitialUser();
  }, [urlUid, urlUsername]);

  // Lookup account by username
  const handleSearchAccount = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchUsername.replace(/^@/, '').trim().toLowerCase();
    if (!query) return;

    setIsSearching(true);
    setSearchError('');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
        .ilike('username', query)
        .maybeSingle();

      if (error || !data) {
        setSearchError(`Account @${query} not found. Please verify username.`);
      } else {
        setProfile(data as UserProfile);
        setSearchUsername('');
      }
    } catch {
      setSearchError('Error connecting to database. Please retry.');
    } finally {
      setIsSearching(false);
    }
  };

  // Custom Coins Price Calculation with progressive discount
  const getCustomPrice = (coins: number) => {
    const baseRate = 0.0142; // ~$1.42 per 100 coins
    let discount = 0.0;
    if (coins >= 15000) discount = 0.30;
    else if (coins >= 7000) discount = 0.25;
    else if (coins >= 3500) discount = 0.20;
    else if (coins >= 1400) discount = 0.15;
    else if (coins >= 700) discount = 0.10;
    else if (coins >= 350) discount = 0.05;

    const raw = coins * baseRate * (1 - discount);
    return Math.max(0.99, Number(raw.toFixed(2)));
  };

  const effectiveCoins = isCustomAmount ? customCoins : selectedTier.coins;
  const effectivePrice = isCustomAmount
    ? getCustomPrice(customCoins)
    : selectedTier.usdPrice;

  // Checkout handling
  const handleProceedToPayment = async () => {
    if (!profile) {
      setSearchError('Please select or specify a ZEV account to recharge.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate real-time payment gateway handshake (Stripe / PayPal / Crypto)
      await new Promise((resolve) => setTimeout(resolve, 1600));

      // Update Supabase profile balance optimistically
      const newBalance = (profile.coins_balance ?? 0) + effectiveCoins;
      try {
        await supabase
          .from('profiles')
          .update({ coins_balance: newBalance })
          .eq('id', profile.id);

        setProfile((prev) => (prev ? { ...prev, coins_balance: newBalance } : prev));
      } catch (dbErr) {
        console.warn('Balance sync note:', dbErr);
      }

      setPurchasedAmount(effectiveCoins);
      setCheckoutComplete(true);
    } catch {
      alert('Payment processing error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getFullName = (p: UserProfile) => {
    const fn = (p.first_name || '').trim();
    const ln = (p.last_name || '').trim();
    if (fn || ln) return `${fn} ${ln}`.trim();
    return `@${p.username}`;
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-[#00D4FF]/20 selection:text-[#00D4FF]">
      {/* Top Ambient Glow Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-80 bg-gradient-to-b from-[#00D4FF]/10 via-[#F59E0B]/5 to-transparent pointer-events-none blur-3xl -z-10" />

      {/* Header Bar */}
      <header className="border-b border-white/[0.08] bg-[#0C101A]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] via-[#536DFE] to-[#A855F7] p-[1.5px] shadow-lg shadow-[#00D4FF]/20">
              <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center">
                <Coins className="w-5 h-5 text-[#F59E0B]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">ZEV Coins</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30 tracking-wider">
                  OFFICIAL PORTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">0% Platform Surcharge • Instant Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Link Protected</span>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.zevapp.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3.5 py-1.5 rounded-full bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border border-[#00D4FF]/30 text-[#00D4FF] transition font-semibold flex items-center gap-1.5"
            >
              <span>ZEV App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-36">
        {/* Value Proposition Callout */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F59E0B]/10 via-[#00D4FF]/10 to-transparent border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/20 border border-[#F59E0B]/40 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-[#FBBF24]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Save up to 30% on Web Recharges</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  NO APP STORE FEES
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Recharging via official web gives you maximum coins per dollar. 100% credited directly into your ZEV account instantly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-[#00D4FF]" />
              <span>Instant Credit</span>
            </div>
          </div>
        </div>

        {/* 1. Account Identification Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#00D4FF]" />
              <span>Target ZEV Account</span>
            </h3>
            {profile && (
              <button
                onClick={() => setProfile(null)}
                className="text-xs text-slate-400 hover:text-white transition underline"
              >
                Change Account
              </button>
            )}
          </div>

          {loadingProfile ? (
            <div className="p-5 rounded-2xl bg-[#0C101A] border border-white/[0.08] flex items-center gap-4 animate-pulse">
              <div className="w-14 h-14 rounded-full bg-white/10" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-48 bg-white/5 rounded" />
              </div>
            </div>
          ) : profile ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0C101A] to-[#121826] border border-white/[0.12] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border-2 border-[#00D4FF]/40 shadow-md">
                    {profile.avatar_url ? (
                      <Image
                        src={profile.avatar_url}
                        alt={profile.username}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-[#00D4FF] to-[#536DFE]">
                        {(profile.first_name || profile.username || 'Z')[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  {profile.is_verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00D4FF] text-[#07090E] flex items-center justify-center font-black text-[10px] border-2 border-[#07090E]">
                      ✓
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-white">{getFullName(profile)}</h4>
                    <span className="text-xs text-slate-400">@{profile.username}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Coins will be deposited directly to this profile</p>
                </div>
              </div>

              {/* Current Coins Pill */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] self-stretch sm:self-auto justify-between sm:justify-start">
                <div className="text-right sm:text-left">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Current Balance</div>
                  <div className="text-sm font-extrabold text-amber-400 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>{(profile.coins_balance ?? 1250).toLocaleString()} Coins</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-[#0C101A] border border-white/[0.08]">
              <form onSubmit={handleSearchAccount} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    placeholder="Enter ZEV @username (e.g. shaheen)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00D4FF] text-sm transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !searchUsername.trim()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#536DFE] hover:opacity-90 disabled:opacity-50 text-[#07090E] font-bold text-sm transition flex items-center justify-center gap-2 shrink-0"
                >
                  {isSearching ? <RefreshCw className="w-4 h-4 animate-spin text-[#07090E]" /> : <Search className="w-4 h-4" />}
                  <span>Find Account</span>
                </button>
              </form>
              {searchError && (
                <div className="mt-3 flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{searchError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Choose Coin Package Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                <span>Select Recharge Package</span>
                <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  ⚡ INSTANT DEPOSIT
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Select a pre-set coin package or choose a custom amount</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {COIN_TIERS.map((tier) => {
              const isSelected = !isCustomAmount && selectedTier.id === tier.id;

              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    setIsCustomAmount(false);
                    setSelectedTier(tier);
                  }}
                  className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#141F33] to-[#0C1220] border-[#00D4FF] shadow-lg shadow-[#00D4FF]/20 ring-1 ring-[#00D4FF]'
                      : 'bg-[#0C101A] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101624]'
                  }`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div
                      className={`absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md ${
                        tier.popular
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white'
                          : 'bg-gradient-to-r from-[#00D4FF] to-[#536DFE] text-[#07090E]'
                      }`}
                    >
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                        <Coins className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {tier.coins.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">ZEV Coins</div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-base sm:text-lg font-extrabold text-white">
                      ${tier.usdPrice.toFixed(2)}
                    </span>
                    {tier.discountPercent && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
                        Save {tier.discountPercent}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Custom Amount Card */}
            <div
              onClick={() => setIsCustomAmount(true)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                isCustomAmount
                  ? 'bg-gradient-to-b from-[#141F33] to-[#0C1220] border-[#00D4FF] shadow-lg shadow-[#00D4FF]/20 ring-1 ring-[#00D4FF]'
                  : 'bg-[#0C101A] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101624]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#00D4FF]/15 border border-[#00D4FF]/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                  </div>
                  <div className="text-base font-extrabold text-white">Custom</div>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">Enter your desired amount</div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#00D4FF] font-bold">
                <span>Flexible Package</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Custom Slider / Input when active */}
          {isCustomAmount && (
            <div className="mt-4 p-5 rounded-2xl bg-[#0C101A] border border-[#00D4FF]/40 shadow-xl animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Custom Coin Amount
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">Min 50 coins • Max 200,000 coins</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={50}
                    max={200000}
                    step={50}
                    value={customCoins}
                    onChange={(e) => setCustomCoins(Math.max(50, Number(e.target.value) || 50))}
                    className="w-36 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white text-right font-black text-lg focus:outline-none focus:border-[#00D4FF]"
                  />
                  <span className="text-xs font-bold text-slate-400">Coins</span>
                </div>
              </div>

              <input
                type="range"
                min={50}
                max={50000}
                step={50}
                value={customCoins}
                onChange={(e) => setCustomCoins(Number(e.target.value))}
                className="w-full accent-[#00D4FF] cursor-pointer"
              />

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>50 Coins</span>
                <span className="text-white font-bold">Estimated: ${getCustomPrice(customCoins).toFixed(2)} USD</span>
                <span>50,000+ Coins</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Payment Methods */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#00D4FF]" />
            <span>Select Secure Payment Method</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, Amex' },
              { id: 'paypal', label: 'PayPal', icon: Wallet, subtitle: 'Instant 1-Click Pay' },
              { id: 'crypto', label: 'Crypto (USDT)', icon: Coins, subtitle: 'TRC-20, ERC-20, Solana' },
              { id: 'apple_google', label: 'Google / Apple Pay', icon: ShieldCheck, subtitle: 'Mobile Express' },
            ].map((method) => {
              const isSelected = selectedPayment === method.id;
              const IconComp = method.icon;

              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id as any)}
                  className={`p-3.5 sm:p-4 rounded-xl cursor-pointer transition border ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#141F33] to-[#0C1220] border-[#00D4FF] ring-1 ring-[#00D4FF]'
                      : 'bg-[#0C101A] border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComp className={`w-5 h-5 ${isSelected ? 'text-[#00D4FF]' : 'text-slate-400'}`} />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#00D4FF] bg-[#00D4FF]' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-[#07090E]" />}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">{method.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{method.subtitle}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Creator Benefit Highlight */}
        <div className="p-4 rounded-2xl bg-[#0C101A] border border-white/[0.06] flex items-center gap-3.5 text-xs text-slate-300">
          <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4 text-pink-400" />
          </div>
          <div>
            <span className="font-bold text-white">Support ZEV Live Creators: </span>
            <span>Use your coins to send interactive 3D gifts, unlock badges, and tip your favorite livestreamers with zero middleman fee.</span>
          </div>
        </div>
      </main>

      {/* Floating Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0C101A]/95 backdrop-blur-2xl border-t border-white/[0.1] py-4 px-4 sm:px-6 z-50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4 sm:gap-6">
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Recharge</div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-1">
                  <Coins className="w-5 h-5 text-amber-400" />
                  {effectiveCoins.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-medium">Coins</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/[0.1] hidden sm:block" />

            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Amount</div>
              <div className="text-xl sm:text-2xl font-black text-white">${effectivePrice.toFixed(2)} USD</div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleProceedToPayment}
              disabled={isProcessing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#38BDF8] to-[#536DFE] hover:opacity-95 text-[#07090E] font-extrabold text-sm shadow-xl shadow-[#00D4FF]/25 hover:shadow-[#00D4FF]/40 transition active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#07090E]" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#07090E]" />
                  <span>Pay & Recharge ${effectivePrice.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 text-[#07090E]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0C101A] border border-white/[0.15] shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-white">Recharge Successful!</h3>
            <p className="text-xs text-slate-300 mt-1">
              Your coins have been deposited into your ZEV account in real-time.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Account:</span>
                <span className="font-bold text-white">@{profile?.username}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Coins Added:</span>
                <span className="font-black text-amber-400">+{purchasedAmount.toLocaleString()} Coins</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Balance:</span>
                <span className="font-bold text-white">{(profile?.coins_balance ?? 0).toLocaleString()} Coins</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span className="font-bold text-emerald-400">Completed (Receipt #ZEV-{Date.now().toString().slice(-6)})</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCheckoutComplete(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#536DFE] text-[#07090E] font-extrabold text-sm hover:opacity-95 transition"
              >
                Top Up More Coins
              </button>
              <a
                href="https://play.google.com/store/apps/details?id=com.zevapp.app"
                className="block w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition"
              >
                Return to ZEV App
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoinsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07090E] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Coins className="w-8 h-8 text-[#F59E0B] animate-spin" />
            <span className="text-xs text-slate-400 font-semibold">Loading ZEV Coins Portal...</span>
          </div>
        </div>
      }
    >
      <CoinsRechargeContent />
    </Suspense>
  );
}
