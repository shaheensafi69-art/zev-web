import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { target_user_id, target_username, coins, usd_amount, gateway } = body;

    if (!target_user_id || !coins || !usd_amount || !gateway) {
      return NextResponse.json(
        { error: 'Missing required checkout parameters.' },
        { status: 400 }
      );
    }

    const orderId = `ZEV-COIN-${target_user_id.slice(0, 8)}-${Date.now()}`;
    const returnUrl = `https://web.zevapp.com/coins?status=success&orderId=${orderId}&uid=${target_user_id}`;
    const cancelUrl = `https://web.zevapp.com/coins?status=cancelled&uid=${target_user_id}`;

    // 1. STRIPE GATEWAY
    if (gateway === 'stripe') {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        return NextResponse.json({
          status: 'pending_keys',
          message: 'Stripe keys are being configured.',
          order_id: orderId,
        });
      }

      // Create Stripe Checkout Session via Stripe REST API
      const params = new URLSearchParams();
      params.append('payment_method_types[0]', 'card');
      params.append('line_items[0][price_data][currency]', 'usd');
      params.append('line_items[0][price_data][product_data][name]', `ZEV Coins (${coins.toLocaleString()} Coins)`);
      params.append('line_items[0][price_data][product_data][description]', `Instant deposit to @${target_username || target_user_id}`);
      params.append('line_items[0][price_data][unit_amount]', Math.round(usd_amount * 100).toString());
      params.append('line_items[0][quantity]', '1');
      params.append('mode', 'payment');
      params.append('success_url', returnUrl);
      params.append('cancel_url', cancelUrl);
      params.append('client_reference_id', target_user_id);
      params.append('metadata[target_user_id]', target_user_id);
      params.append('metadata[coins]', coins.toString());
      params.append('metadata[order_id]', orderId);

      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const session = await stripeRes.json();
      if (session.url) {
        return NextResponse.json({ redirect_url: session.url, order_id: orderId });
      }
      return NextResponse.json({ error: session.error?.message || 'Stripe initialization failed' }, { status: 500 });
    }

    // 2. NOWPAYMENTS (CRYPTO) GATEWAY
    if (gateway === 'nowpayments') {
      const apiKey = process.env.NOWPAYMENTS_API_KEY;
      if (!apiKey) {
        return NextResponse.json({
          status: 'pending_keys',
          message: 'NOWPayments keys are being configured.',
          order_id: orderId,
        });
      }

      const invoiceRes = await fetch('https://api.nowpayments.io/v1/invoice', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount: usd_amount,
          price_currency: 'usd',
          order_id: orderId,
          order_description: `${coins.toLocaleString()} ZEV Coins for @${target_username || target_user_id}`,
          ipn_callback_url: 'https://web.zevapp.com/api/v1/coins/webhook/nowpayments',
          success_url: returnUrl,
          cancel_url: cancelUrl,
        }),
      });

      const invoice = await invoiceRes.json();
      if (invoice.invoice_url) {
        return NextResponse.json({ redirect_url: invoice.invoice_url, order_id: orderId });
      }
      return NextResponse.json({ error: invoice.message || 'NOWPayments initialization failed' }, { status: 500 });
    }

    // 3. PAYPAL GATEWAY
    if (gateway === 'paypal') {
      const clientId = process.env.PAYPAL_CLIENT_ID;
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
      const isLive = process.env.PAYPAL_MODE === 'live';

      if (!clientId || !clientSecret) {
        return NextResponse.json({
          status: 'pending_keys',
          message: 'PayPal keys are being configured.',
          order_id: orderId,
        });
      }

      const baseUrl = isLive
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com';

      // 1. Get OAuth token
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) {
        return NextResponse.json({ error: 'PayPal authorization failed.' }, { status: 500 });
      }

      // 2. Create Order
      const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              reference_id: orderId,
              description: `${coins.toLocaleString()} ZEV Coins`,
              custom_id: JSON.stringify({ target_user_id, coins }),
              amount: {
                currency_code: 'USD',
                value: usd_amount.toFixed(2),
              },
            },
          ],
          application_context: {
            brand_name: 'ZEV Platform',
            return_url: returnUrl,
            cancel_url: cancelUrl,
            user_action: 'PAY_NOW',
          },
        }),
      });

      const orderData = await orderRes.json();
      const approveLink = orderData.links?.find((l: any) => l.rel === 'approve')?.href;

      if (approveLink) {
        return NextResponse.json({ redirect_url: approveLink, order_id: orderId });
      }

      return NextResponse.json({ error: 'Failed to create PayPal approval link.' }, { status: 500 });
    }

    return NextResponse.json({ error: 'Unsupported payment gateway.' }, { status: 400 });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
