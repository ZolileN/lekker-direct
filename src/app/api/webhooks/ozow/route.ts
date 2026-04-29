import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Ozow sends these fields back on webhook:
    // SiteCode, TransactionId, TransactionReference, Amount, Status, Optional1-5, CurrencyCode, IsTest, HashCheck
    
    const siteCode = data.SiteCode as string;
    const transactionId = data.TransactionId as string;
    const transactionReference = data.TransactionReference as string;
    const amount = data.Amount as string;
    const status = data.Status as string;
    const optional1 = (data.Optional1 as string) || '';
    const optional2 = (data.Optional2 as string) || '';
    const optional3 = (data.Optional3 as string) || '';
    const optional4 = (data.Optional4 as string) || '';
    const optional5 = (data.Optional5 as string) || '';
    const currencyCode = data.CurrencyCode as string;
    const isTest = data.IsTest as string;
    const statusMessage = (data.StatusMessage as string) || '';
    const hashCheck = data.HashCheck as string;

    const privateKey = process.env.OZOW_PRIVATE_KEY || '';

    // Verify Hash
    const concatenatedString = `${siteCode}${transactionId}${transactionReference}${amount}${status}${optional1}${optional2}${optional3}${optional4}${optional5}${currencyCode}${isTest}${statusMessage}${privateKey}`;
    
    const calculatedHash = crypto
      .createHash('sha512')
      .update(concatenatedString.toLowerCase())
      .digest('hex');

    if (calculatedHash !== hashCheck) {
      console.error('Invalid Ozow HashCheck in Webhook');
      return NextResponse.json({ error: 'Invalid hash' }, { status: 400 });
    }

    // Process the payment status
    let paymentStatus = 'pending';
    let orderStatus = 'pending';

    if (status === 'Complete') {
      paymentStatus = 'completed';
      orderStatus = 'paid';
    } else if (status === 'Cancelled' || status === 'Error' || status === 'Abandoned') {
      paymentStatus = 'failed';
      orderStatus = 'cancelled';
    }

    const supabase = createClient(true); // Need admin permissions to update order

    // Update order
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: paymentStatus,
        status: orderStatus,
        ozow_payment_id: transactionId,
        updated_at: new Date().toISOString()
      })
      .eq('order_number', transactionReference);

    if (error) {
      console.error('Failed to update order status:', error);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Ozow webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
