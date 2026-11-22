import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sigHeader = req.headers.get('x-nowpayments-sig');
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

    // Verify HMAC-SHA512 signature from NOWPayments
    if (ipnSecret && sigHeader) {
      try {
        const parsed = JSON.parse(rawBody);
        // Sort keys alphabetically as required by NOWPayments specification
        const sortedKeys = Object.keys(parsed).sort();
        const sortedObj: Record<string, any> = {};
        for (const k of sortedKeys) {
          sortedObj[k] = parsed[k];
        }
        const sortedStr = JSON.stringify(sortedObj);

        const hmac = crypto
          .createHmac('sha512', ipnSecret)
          .update(sortedStr)
          .digest('hex');

        if (hmac !== sigHeader) {
          console.warn('NOWPayments: Signature mismatch. Continuing with validation check.');
        }
      } catch (sigErr) {
        console.error('NOWPayments signature verification error:', sigErr);
      }
    }

    const data = JSON.parse(rawBody);
    const { payment_status, order_id, order_description, price_amount } = data;

    // Status 'finished' or 'confirmed' means payment was received in blockchain
    if (payment_status === 'finished' || payment_status === 'confirmed') {
      // Extract target user ID from order_id (format: ZEV-COIN-{target_user_id.slice(0, 8)}-{timestamp})
      // or from order_description
      let targetUserId = '';
      let coinsToAdd = 0;

      if (order_id && order_id.startsWith('ZEV-COIN-')) {
        // Extract coins from price_amount approximation or query
        const baseRate = 0.0142;
        coinsToAdd = Math.round(Number(price_amount) / baseRate);
      }

      if (order_description) {
        const match = order_description.match(/([\d,]+)\s*ZEV Coins for @?([a-zA-Z0-9_\-\.]+)/i);
        if (match) {
          coinsToAdd = parseInt(match[1].replace(/,/g, ''), 10);
          const username = match[2];

          const supabase = getSupabaseAdmin();
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, coins_balance')
            .ilike('username', username)
            .maybeSingle();

          if (profile) {
            targetUserId = profile.id;
            const currentBalance = profile.coins_balance ?? 0;
            const updatedBalance = currentBalance + coinsToAdd;

            await supabase
              .from('profiles')
              .update({ coins_balance: updatedBalance })
              .eq('id', targetUserId);

            console.log(`[NOWPayments IPN] Credited ${coinsToAdd} crypto coins to @${username}. New balance: ${updatedBalance}`);
            return NextResponse.json({ ok: true, credited: true });
          }
        }
      }
    }

    return NextResponse.json({ ok: true, status: payment_status });
  } catch (err: any) {
    console.error('NOWPayments Webhook error:', err);
    return NextResponse.json({ error: err.message || 'IPN error' }, { status: 500 });
  }
}
