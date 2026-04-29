'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when they reach the success page
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow p-8 text-center transition-colors">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          Payment Successful!
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Thank you for your order. We are processing it and will send you an email confirmation shortly.
        </p>
        
        {orderNumber && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 mb-8 border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
            <p className="text-lg font-mono font-semibold text-gray-900 dark:text-gray-100">{orderNumber}</p>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <Link 
            href="/"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="bg-gray-50 min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
