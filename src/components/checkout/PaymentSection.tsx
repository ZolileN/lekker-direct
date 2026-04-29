'use client';

import { Lock, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';
import { supportedBanks } from '../../config/navigation';

type PaymentSectionProps = {
  onPay?: () => void;
  isLoading?: boolean;
};

export function PaymentSection({ onPay, isLoading }: PaymentSectionProps) {
  const { total } = useCart();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 sticky top-8 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Payment</h2>
      
      <div className="mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Lock className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" />
            <span className="font-semibold text-green-900 dark:text-green-100">Instant EFT via Ozow</span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-400">
            You&apos;ll be redirected to Ozow&apos;s secure payment page to complete your purchase using your bank&apos;s EFT service. No credit card required.
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Secure payment processing
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Instant confirmation
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Bank-level security
        </div>
      </div>

      <Button 
        size="lg" 
        className="w-full text-lg py-3" 
        disabled={total === 0 || isLoading}
        onClick={onPay}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay R${total.toLocaleString()} with Ozow`
        )}
      </Button>
      
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        By completing this purchase, you agree to our Terms of Service and Privacy Policy.
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Supported Banks</p>
          <div className="grid grid-cols-3 gap-2">
            {supportedBanks.map((bank) => (
              <div key={bank} className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300">
                {bank}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
