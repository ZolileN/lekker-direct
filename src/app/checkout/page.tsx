import { ShippingForm } from '@/components/checkout/ShippingForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { PaymentSection } from '@/components/checkout/PaymentSection';

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Details Form and Order Summary */}
          <div className="lg:col-span-2">
            <ShippingForm />
            <OrderSummary />
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <PaymentSection />
          </div>
        </div>
      </div>
    </div>
  );
}
