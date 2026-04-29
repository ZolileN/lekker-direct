import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import crypto from 'crypto';

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { shippingData, items, total, shippingCost, userId } = body;

    if (!shippingData || !items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: 'Missing required checkout data' },
        { status: 400 }
      );
    }

    // We use the admin client since order creation might need admin privileges
    // depending on RLS (if RLS prevents unauthenticated inserts).
    // Actually, RLS says "Users can create own orders" with check auth.uid() = user_id.
    // Since there's no auth yet, we might need the service role key to insert guest orders.
    const supabase = createClient(true);

    // 1. Calculate subtotal
    const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    // 2. Insert order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId ?? null,
        total_amount: total,
        subtotal: subtotal,
        shipping_cost: shippingCost || 0,
        status: 'pending',
        payment_status: 'pending',
        shipping_address: shippingData,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Failed to create order in database' }, { status: 500 });
    }

    // 3. Insert order items
    const orderItems = items.map((item: CartItem) => ({
      order_id: order.id,
      product_id: item.id,
      product_title: item.title,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Order items creation error:', itemsError);
      // We don't rollback manually here but in production we should or use RPC
    }

    // 4. Generate Ozow Payload
    const siteCode = process.env.OZOW_SITE_CODE || '';
    const privateKey = process.env.OZOW_PRIVATE_KEY || '';
    const isTestMode = process.env.OZOW_IS_TEST_MODE === 'true';
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';

    const countryCode = 'ZA';
    const currencyCode = 'ZAR';
    const amount = Number(total).toFixed(2); // Must be exactly 2 decimal places
    const transactionReference = order.order_number;
    const bankReference = order.order_number;
    const cancelUrl = `${baseUrl}/checkout`;
    const errorUrl = `${baseUrl}/checkout`;
    const successUrl = `${baseUrl}/checkout/success?order=${order.order_number}`;
    const notifyUrl = `${baseUrl}/api/webhooks/ozow`;
    const isTest = isTestMode ? 'true' : 'false';

    // Concatenate exactly in this order
    const concatenatedString = `${siteCode}${countryCode}${currencyCode}${amount}${transactionReference}${bankReference}${cancelUrl}${errorUrl}${successUrl}${notifyUrl}${isTest}${privateKey}`;

    // Convert to lowercase and hash
    const hashCheck = crypto
      .createHash('sha512')
      .update(concatenatedString.toLowerCase())
      .digest('hex');

    const ozowPayload = {
      SiteCode: siteCode,
      CountryCode: countryCode,
      CurrencyCode: currencyCode,
      Amount: amount,
      TransactionReference: transactionReference,
      BankReference: bankReference,
      CancelUrl: cancelUrl,
      ErrorUrl: errorUrl,
      SuccessUrl: successUrl,
      NotifyUrl: notifyUrl,
      IsTest: isTest,
      HashCheck: hashCheck,
    };

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      ozowPayload,
    });
  } catch (error: unknown) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error during checkout' }, { status: 500 });
  }
}
