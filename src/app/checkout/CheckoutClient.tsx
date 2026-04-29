'use client';

import { useState } from 'react';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { PaymentSection } from '@/components/checkout/PaymentSection';
import { useCart } from '@/hooks/useCart';

export type ShippingData = {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
};

export function CheckoutClient() {
  const { items, total, shipping } = useCart();
  const [shippingData, setShippingData] = useState<ShippingData>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ozowPayload, setOzowPayload] = useState<Record<string, string> | null>(null);

  const handleInputChange = (field: keyof ShippingData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    // Basic validation
    if (!shippingData.fullName || !shippingData.email || !shippingData.streetAddress || !shippingData.city) {
      setError('Please fill in all required shipping fields');
      return;
    }
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingData,
          items,
          total,
          shippingCost: shipping,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout');
      }

      // We received the Ozow payload, now we auto-submit the form
      setOzowPayload(data.ozowPayload);
      
      // Give React a tick to render the form, then submit it
      setTimeout(() => {
        const form = document.getElementById('ozow-payment-form') as HTMLFormElement;
        if (form) form.submit();
      }, 100);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          <ShippingForm data={shippingData} onChange={handleInputChange} />
          <OrderSummary />
        </div>

        <div className="lg:col-span-1">
          <PaymentSection 
            onPay={handleCheckout} 
            isLoading={isLoading} 
          />
        </div>
      </div>

      {ozowPayload && (
        <form 
          id="ozow-payment-form" 
          action="https://pay.ozow.com/" 
          method="POST" 
          className="hidden"
        >
          {Object.entries(ozowPayload).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value as string} />
          ))}
        </form>
      )}
    </>
  );
}
