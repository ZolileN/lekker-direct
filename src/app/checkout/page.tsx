import { Button } from '@/components/ui/Button'
import { Lock } from 'lucide-react'

// Sample order data - this will come from cart state/Supabase later
const orderData = {
  items: [
    {
      id: '1',
      title: 'SmartWatch Rose Gold Edition',
      price: 1499,
      quantity: 1
    }
  ],
  subtotal: 1499,
  shipping: 0,
  total: 1499
}

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Details</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+27 12 345 6789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Johannesburg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="">Select Province</option>
                      <option value="gauteng">Gauteng</option>
                      <option value="western-cape">Western Cape</option>
                      <option value="kwazulu-natal">KwaZulu-Natal</option>
                      <option value="eastern-cape">Eastern Cape</option>
                      <option value="free-state">Free State</option>
                      <option value="mpumalanga">Mpumalanga</option>
                      <option value="limpopo">Limpopo</option>
                      <option value="north-west">North West</option>
                      <option value="northern-cape">Northern Cape</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span>{item.title} x {item.quantity}</span>
                    <span>R{item.price.toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R{orderData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-2">
                    <span>Total</span>
                    <span>R{orderData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment</h2>
              
              <div className="mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Lock className="h-5 w-5 text-green-700 mr-2" />
                    <span className="font-semibold text-green-900">Instant EFT via Ozow</span>
                  </div>
                  <p className="text-sm text-green-700">
                    You'll be redirected to Ozow's secure payment page to complete your purchase using your bank's EFT service. No credit card required.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Secure payment processing
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Instant confirmation
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-5 w-5 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Bank-level security
                </div>
              </div>

              <Button size="lg" className="w-full text-lg py-3">
                Pay R{orderData.total.toLocaleString()} with Ozow
              </Button>
              
              <div className="mt-4 text-center text-xs text-gray-500">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Supported Banks</p>
                  <div className="grid grid-cols-3 gap-2">
                    {['FNB', 'Standard Bank', 'Absa', 'Nedbank', 'Capitec', 'Discovery'].map((bank) => (
                      <div key={bank} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">
                        {bank}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
