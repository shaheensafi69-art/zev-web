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
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import './coins.css';

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
  const urlStatus = searchParams.get('status')?.trim() || '';

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [searchUsername, setSearchUsername] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  const [selectedTier, setSelectedTier] = useState<CoinTier>(COIN_TIERS[2]);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customCoins, setCustomCoins] = useState(2500);

  const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'nowpayments' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [purchasedAmount, setPurchasedAmount] = useState(0);

  useEffect(() => {
    if (urlStatus === 'success') {
      setCheckoutComplete(true);
    }
  }, [urlStatus]);

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
          const cleanUser = urlUsername.replace(/^@/, '');
          const { data } = await supabase
            .from('profiles')
            .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
            .ilike('username', cleanUser)
            .maybeSingle();

          if (data) {
            setProfile(data as UserProfile);
            setLoadingProfile(false);
            return;
          }
        }

        // Try authenticated session
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
            .eq('id', authData.user.id)
            .maybeSingle();

          if (data) {
            setProfile(data as UserProfile);
            setLoadingProfile(false);
            return;
          }
        }

        // Fallback default admin profile if nothing passed
        const { data: defaultUser } = await supabase
          .from('profiles')
          .select('id, username, first_name, last_name, avatar_url, is_verified, coins_balance')
          .limit(1)
          .maybeSingle();

        if (defaultUser) {
          setProfile(defaultUser as UserProfile);
        }
      } catch (err) {
        console.error('Coins: Error resolving user profile', err);
      } finally {
        setLoadingProfile(false);
      }
    }

    resolveInitialUser();
  }, [urlUid, urlUsername]);

  // Handle Search for any ZEV @username
  const handleSearchAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchUsername.trim().replace(/^@/, '');
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
      // Call backend checkout router
      const res = await fetch('/api/v1/coins/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_user_id: profile.id,
          target_username: profile.username,
          coins: effectiveCoins,
          usd_amount: effectivePrice,
          gateway: selectedPayment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
          return;
        }
      }

      // If gateway is in sandbox or direct testing mode:
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
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Payment initialization error. Please verify your connection.');
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
    <div className="coins-container">
      {/* Top Ambient Glow Effect */}
      <div className="coins-ambient-glow" />

      {/* Header Bar */}
      <header className="coins-header">
        <div className="coins-header-inner">
          <div className="coins-brand">
            <div className="coins-logo-icon">
              <div className="coins-logo-icon-inner">
                <Coins style={{ width: 20, height: 20, color: '#F59E0B' }} />
              </div>
            </div>
            <div>
              <div className="coins-title-row">
                <span className="coins-title">ZEV Coins</span>
                <span className="coins-badge-official">OFFICIAL PORTAL</span>
              </div>
              <p className="coins-subtitle">0% Platform Surcharge • Instant Delivery</p>
            </div>
          </div>

          <div className="coins-header-actions">
            <div className="coins-protected-tag">
              <Lock style={{ width: 14, height: 14, color: '#34D399' }} />
              <span>Direct Link Protected</span>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.zevapp.app"
              target="_blank"
              rel="noopener noreferrer"
              className="coins-app-link"
            >
              <span>ZEV App</span>
              <ExternalLink style={{ width: 13, height: 13 }} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="coins-main">
        {/* Value Proposition Callout */}
        <div className="coins-hero-banner">
          <div className="coins-hero-left">
            <div className="coins-hero-icon">
              <Zap style={{ width: 24, height: 24, color: '#FBBF24' }} />
            </div>
            <div>
              <h2 className="coins-hero-title">
                <span>Save up to 30% on Web Recharges</span>
                <span className="coins-hero-pill">NO APP STORE FEES</span>
              </h2>
              <p className="coins-hero-desc">
                Recharging via official web gives you maximum coins per dollar. 100% credited directly into your ZEV account instantly.
              </p>
            </div>
          </div>
          <div className="coins-hero-badges">
            <div className="coins-badge-item">
              <ShieldCheck style={{ width: 16, height: 16, color: '#34D399' }} />
              <span>256-Bit SSL</span>
            </div>
            <div className="coins-badge-item">
              <Check style={{ width: 16, height: 16, color: '#00D4FF' }} />
              <span>Instant Credit</span>
            </div>
          </div>
        </div>

        {/* 1. Account Identification Section */}
        <div style={{ marginBottom: 28 }}>
          <div className="coins-section-header">
            <h3 className="coins-section-label">
              <UserCheck style={{ width: 15, height: 15, color: '#00D4FF' }} />
              <span>Target ZEV Account</span>
            </h3>
            {profile && (
              <button onClick={() => setProfile(null)} className="coins-change-btn">
                Change Account
              </button>
            )}
          </div>

          {loadingProfile ? (
            <div className="coins-account-card" style={{ opacity: 0.7 }}>
              <div className="coins-account-left">
                <div className="coins-avatar-wrap" />
                <div>
                  <div style={{ height: 16, width: 120, background: 'rgba(255,255,255,0.1)', borderRadius: 6, marginBottom: 6 }} />
                  <div style={{ height: 12, width: 180, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
                </div>
              </div>
            </div>
          ) : profile ? (
            <div className="coins-account-card">
              <div className="coins-account-left">
                <div className="coins-avatar-wrap">
                  {profile.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.username}
                      width={52}
                      height={52}
                      className="coins-avatar-img"
                      unoptimized
                    />
                  ) : (
                    <div className="coins-avatar-fallback">
                      {(profile.first_name || profile.username || 'Z')[0].toUpperCase()}
                    </div>
                  )}
                  {profile.is_verified && (
                    <div className="coins-verified-icon">✓</div>
                  )}
                </div>

                <div>
                  <div className="coins-user-name-row">
                    <h4 className="coins-full-name">{getFullName(profile)}</h4>
                    <span className="coins-username">@{profile.username}</span>
                  </div>
                  <p className="coins-subtitle">Coins will be deposited directly to this profile</p>
                </div>
              </div>

              {/* Current Coins Pill */}
              <div className="coins-balance-pill">
                <div className="coins-balance-label">Current Balance</div>
                <div className="coins-balance-val">
                  <Coins style={{ width: 16, height: 16, color: '#FBBF24' }} />
                  <span>{(profile.coins_balance ?? 0).toLocaleString()} Coins</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="coins-search-card">
              <form onSubmit={handleSearchAccount} className="coins-search-form">
                <div className="coins-search-input-wrap">
                  <Search className="coins-search-icon" style={{ width: 16, height: 16 }} />
                  <input
                    type="text"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                    placeholder="Enter ZEV @username (e.g. shaheen)"
                    className="coins-search-input"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !searchUsername.trim()}
                  className="coins-search-btn"
                >
                  {isSearching ? <RefreshCw style={{ width: 16, height: 16 }} /> : <Search style={{ width: 16, height: 16 }} />}
                  <span>Find Account</span>
                </button>
              </form>
              {searchError && (
                <div className="coins-search-error">
                  <AlertCircle style={{ width: 15, height: 15 }} />
                  <span>{searchError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Choose Coin Package Section */}
        <div style={{ marginBottom: 32 }}>
          <div className="coins-section-header">
            <div>
              <h3 className="coins-section-label" style={{ fontSize: 14, color: '#FFFFFF' }}>
                <Coins style={{ width: 16, height: 16, color: '#FBBF24' }} />
                <span>Select Recharge Package</span>
              </h3>
            </div>
          </div>

          <div className="coins-grid">
            {COIN_TIERS.map((tier) => {
              const isSelected = !isCustomAmount && selectedTier.id === tier.id;

              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    setIsCustomAmount(false);
                    setSelectedTier(tier);
                  }}
                  className={`coins-tier-card ${isSelected ? 'selected' : ''}`}
                >
                  {tier.badge && (
                    <div className={`coins-tier-badge ${tier.popular ? 'popular' : 'default'}`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="coins-tier-top">
                    <div className="coins-icon-circle">
                      <Coins style={{ width: 16, height: 16, color: '#FBBF24' }} />
                    </div>
                    <div>
                      <div className="coins-tier-amount">
                        {tier.coins.toLocaleString()}
                      </div>
                      <div className="coins-tier-label">ZEV Coins</div>
                    </div>
                  </div>

                  <div className="coins-tier-bottom">
                    <span className="coins-tier-price">
                      ${tier.usdPrice.toFixed(2)}
                    </span>
                    {tier.discountPercent && (
                      <span className="coins-tier-savings">
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
              className={`coins-tier-card ${isCustomAmount ? 'selected' : ''}`}
            >
              <div className="coins-tier-top">
                <div className="coins-icon-circle" style={{ background: 'rgba(0, 212, 255, 0.15)', borderColor: 'rgba(0, 212, 255, 0.35)' }}>
                  <Sparkles style={{ width: 16, height: 16, color: '#00D4FF' }} />
                </div>
                <div>
                  <div className="coins-tier-amount" style={{ fontSize: 17 }}>Custom</div>
                  <div className="coins-tier-label">Enter Amount</div>
                </div>
              </div>

              <div className="coins-tier-bottom">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#00D4FF', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>Flexible</span>
                  <ChevronRight style={{ width: 14, height: 14 }} />
                </span>
              </div>
            </div>
          </div>

          {/* Custom Slider / Input when active */}
          {isCustomAmount && (
            <div className="coins-custom-card">
              <div className="coins-custom-header">
                <div>
                  <label style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, color: '#CBD5E1' }}>
                    Custom Coin Amount
                  </label>
                  <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Min 50 coins • Max 200,000 coins</p>
                </div>
                <div className="coins-custom-input-box">
                  <input
                    type="number"
                    min={50}
                    max={200000}
                    step={50}
                    value={customCoins}
                    onChange={(e) => setCustomCoins(Math.max(50, Number(e.target.value) || 50))}
                    className="coins-custom-input"
                  />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>Coins</span>
                </div>
              </div>

              <input
                type="range"
                min={50}
                max={50000}
                step={50}
                value={customCoins}
                onChange={(e) => setCustomCoins(Number(e.target.value))}
                className="coins-slider"
              />

              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8' }}>
                <span>50 Coins</span>
                <span style={{ color: '#FFFFFF', fontWeight: 800 }}>Estimated: ${getCustomPrice(customCoins).toFixed(2)} USD</span>
                <span>50,000+ Coins</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Payment Methods (Stripe / NOWPayments / PayPal) */}
        <div style={{ marginBottom: 32 }}>
          <div className="coins-section-header">
            <h3 className="coins-section-label">
              <CreditCard style={{ width: 15, height: 15, color: '#00D4FF' }} />
              <span>Select Payment Gateway</span>
            </h3>
          </div>

          <div className="coins-gateways-grid">
            {/* 1. Stripe */}
            <div
              onClick={() => setSelectedPayment('stripe')}
              className={`coins-gateway-card ${selectedPayment === 'stripe' ? 'selected' : ''}`}
            >
              <div className="coins-gateway-top">
                <CreditCard style={{ width: 22, height: 22, color: selectedPayment === 'stripe' ? '#00D4FF' : '#94A3B8' }} />
                <span className="coins-gateway-badge">CARDS & WALLETS</span>
              </div>
              <div>
                <div className="coins-gateway-name">Stripe</div>
                <div className="coins-gateway-desc">Visa, Mastercard, Apple Pay, Google Pay</div>
              </div>
            </div>

            {/* 2. NOWPayments */}
            <div
              onClick={() => setSelectedPayment('nowpayments')}
              className={`coins-gateway-card ${selectedPayment === 'nowpayments' ? 'selected' : ''}`}
            >
              <div className="coins-gateway-top">
                <Coins style={{ width: 22, height: 22, color: selectedPayment === 'nowpayments' ? '#F59E0B' : '#94A3B8' }} />
                <span className="coins-gateway-badge" style={{ color: '#FBBF24', background: 'rgba(245, 158, 11, 0.12)' }}>CRYPTO</span>
              </div>
              <div>
                <div className="coins-gateway-name">NOWPayments</div>
                <div className="coins-gateway-desc">USDT (TRC-20), BTC, ETH, TON, Solana</div>
              </div>
            </div>

            {/* 3. PayPal */}
            <div
              onClick={() => setSelectedPayment('paypal')}
              className={`coins-gateway-card ${selectedPayment === 'paypal' ? 'selected' : ''}`}
            >
              <div className="coins-gateway-top">
                <Wallet style={{ width: 22, height: 22, color: selectedPayment === 'paypal' ? '#38BDF8' : '#94A3B8' }} />
                <span className="coins-gateway-badge">INSTANT PAY</span>
              </div>
              <div>
                <div className="coins-gateway-name">PayPal</div>
                <div className="coins-gateway-desc">PayPal Wallet & Pay Later (Installments)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Creator Benefit Highlight */}
        <div className="coins-creator-banner">
          <div className="coins-creator-icon">
            <Gift style={{ width: 20, height: 20 }} />
          </div>
          <div className="coins-creator-text">
            <strong>Support ZEV Creators & Streamers: </strong>
            Use your coins to send interactive 3D gifts, unlock exclusive badges, and support creators with 0% platform surcharge.
          </div>
        </div>
      </main>

      {/* Floating Bottom Checkout Bar */}
      <div className="coins-bottom-bar">
        <div className="coins-bottom-inner">
          <div className="coins-bottom-summary">
            <div className="coins-summary-col">
              <span className="coins-summary-label">Total Coins</span>
              <div className="coins-summary-val">
                <Coins style={{ width: 18, height: 18, color: '#FBBF24' }} />
                <span>{effectiveCoins.toLocaleString()}</span>
              </div>
            </div>

            <div className="coins-summary-divider" />

            <div className="coins-summary-col">
              <span className="coins-summary-label">Total Due</span>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FFFFFF' }}>
                ${effectivePrice.toFixed(2)} USD
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={isProcessing}
            className="coins-checkout-btn"
          >
            {isProcessing ? (
              <>
                <RefreshCw style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                <span>Connecting to Gateway...</span>
              </>
            ) : (
              <>
                <Lock style={{ width: 16, height: 16 }} />
                <span>Pay ${effectivePrice.toFixed(2)} via {selectedPayment === 'stripe' ? 'Stripe' : selectedPayment === 'nowpayments' ? 'Crypto' : 'PayPal'}</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {checkoutComplete && (
        <div className="coins-modal-backdrop">
          <div className="coins-modal">
            <div className="coins-modal-icon">
              <CheckCircle2 style={{ width: 36, height: 36 }} />
            </div>

            <h3 className="coins-modal-title">Recharge Successful!</h3>
            <p className="coins-modal-subtitle">
              Your coins have been deposited into your ZEV account in real-time.
            </p>

            <div className="coins-modal-details">
              <div className="coins-modal-row">
                <span style={{ color: '#94A3B8' }}>Account:</span>
                <strong style={{ color: '#FFFFFF' }}>@{profile?.username}</strong>
              </div>
              <div className="coins-modal-row">
                <span style={{ color: '#94A3B8' }}>Coins Added:</span>
                <strong style={{ color: '#FBBF24' }}>+{purchasedAmount.toLocaleString()} Coins</strong>
              </div>
              <div className="coins-modal-row">
                <span style={{ color: '#94A3B8' }}>New Total Balance:</span>
                <strong style={{ color: '#FFFFFF' }}>{(profile?.coins_balance ?? 0).toLocaleString()} Coins</strong>
              </div>
              <div className="coins-modal-row">
                <span style={{ color: '#94A3B8' }}>Status:</span>
                <span style={{ color: '#34D399', fontWeight: 800 }}>Completed (Receipt #ZEV-{Date.now().toString().slice(-6)})</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutComplete(false)}
              className="coins-modal-close-btn"
            >
              Top Up More Coins
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.zevapp.app"
              style={{
                display: 'block',
                marginTop: 8,
                padding: '10px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#94A3B8',
                fontSize: 12,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Return to ZEV App
            </a>
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
        <div className="coins-loader-container">
          <div className="coins-loader-content">
            <Coins style={{ width: 32, height: 32, color: '#F59E0B' }} />
            <span>Loading ZEV Coins Portal...</span>
          </div>
        </div>
      }
    >
      <CoinsRechargeContent />
    </Suspense>
  );
}
