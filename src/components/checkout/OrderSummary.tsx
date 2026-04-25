'use client';

import { useCart } from '../../hooks/useCart';

export function OrderSummary() {
  const { items, subtotal, shipping, total } = useCart();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 transition-colors">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{item.title} x {item.quantity}</span>
            <span>R{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-2">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>R{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `R${shipping.toLocaleString()}`}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100 border-t border-gray-100 dark:border-gray-800 pt-2">
            <span>Total</span>
            <span>R{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
