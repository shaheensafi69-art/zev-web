import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const sigHeader = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Verify Stripe signature if secret is configured
    if (webhookSecret && sigHeader) {
      try {
        const parts = sigHeader.split(',').reduce((acc: any, part) => {
          const [key, val] = part.split('=');
          acc[key.trim()] = val?.trim();
          return acc;
        }, {});

        const timestamp = parts['t'];
        const signature = parts['v1'];
        const expectedSig = crypto
          .createHmac('sha256', webhookSecret)
          .update(`${timestamp}.${rawBody}`, 'utf8')
          .digest('hex');

        if (signature !== expectedSig) {
          console.error('Stripe webhook: Invalid signature match');
          return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }
      } catch (e) {
        console.error('Stripe webhook verification error:', e);
        return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    // Primary events: checkout.session.completed, payment_intent.succeeded
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const targetUserId = session.metadata?.target_user_id || session.client_reference_id;
      const coinsToAdd = parseInt(session.metadata?.coins || '0', 10);

      if (targetUserId && coinsToAdd > 0) {
        const supabase = getSupabaseAdmin();
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, coins_balance')
          .eq('id', targetUserId)
          .single();

        if (profile) {
          const currentBalance = profile.coins_balance ?? 0;
          const updatedBalance = currentBalance + coinsToAdd;

          await supabase
            .from('profiles')
            .update({ coins_balance: updatedBalance })
            .eq('id', targetUserId);

          console.log(`[Stripe Webhook] Credited ${coinsToAdd} coins to user ${targetUserId}. New balance: ${updatedBalance}`);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Stripe Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Webhook handler error' }, { status: 500 });
  }
}
