'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';

export function CartSummary() {
  const { subtotal, shipping, total, itemCount } = useCart();

  if (itemCount === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 sticky top-8 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>R{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `R${shipping.toLocaleString()}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax</span>
          <span>Included</span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100">
            <span>Total</span>
            <span>R{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {subtotal < 500 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-700 dark:text-green-400">
            Add R{(500 - subtotal).toLocaleString()} more to your cart for free shipping!
          </p>
        </div>
      )}

      <Link href="/checkout">
        <Button size="lg" className="w-full mb-3">
          Proceed to Checkout
        </Button>
      </Link>
      
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center justify-center">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Pay securely with Instant EFT via Ozow
        </p>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Quality Guarantee
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Fast Delivery
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Easy Returns
          </div>
        </div>
      </div>
    </div>
  );
}
