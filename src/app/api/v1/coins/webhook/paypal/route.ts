import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const eventType = event.event_type;

    // Supported events: PAYMENT.CAPTURE.COMPLETED, CHECKOUT.ORDER.APPROVED
    if (eventType === 'PAYMENT.CAPTURE.COMPLETED' || eventType === 'CHECKOUT.ORDER.APPROVED') {
      const resource = event.resource;
      let targetUserId = '';
      let coinsToAdd = 0;

      // Extract from custom_id if present
      if (resource.custom_id) {
        try {
          const parsed = JSON.parse(resource.custom_id);
          targetUserId = parsed.target_user_id;
          coinsToAdd = Number(parsed.coins);
        } catch {
          targetUserId = resource.custom_id;
        }
      }

      // Fallback check in purchase_units
      if (!targetUserId && resource.purchase_units?.[0]?.custom_id) {
        try {
          const parsed = JSON.parse(resource.purchase_units[0].custom_id);
          targetUserId = parsed.target_user_id;
          coinsToAdd = Number(parsed.coins);
        } catch {
          targetUserId = resource.purchase_units[0].custom_id;
        }
      }

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

          console.log(`[PayPal Webhook] Credited ${coinsToAdd} coins to user ${targetUserId}. New balance: ${updatedBalance}`);
        }
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (err: any) {
    console.error('PayPal Webhook error:', err);
    return NextResponse.json({ error: err.message || 'Webhook error' }, { status: 500 });
  }
}
