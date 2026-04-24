import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Sample cart data - this will come from Supabase/cart state later
const cartItems = [
  {
    id: '1',
    title: 'SmartWatch Rose Gold Edition',
    price: 1499,
    originalPrice: 2199,
    image: '/api/placeholder/100/100',
    quantity: 1,
    sku: 'SW-RG-001'
  }
]

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal >= 500 ? 0 : 99
  const total = subtotal + shipping

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Link 
            href="/shop" 
            className="text-green-700 hover:text-green-800 font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/shop">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/product/${item.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-green-700 transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button className="p-2 hover:bg-gray-100 transition-colors">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button className="p-2 hover:bg-gray-100 transition-colors">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button className="text-red-500 hover:text-red-700 transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        R{(item.price * item.quantity).toLocaleString()}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          R{(item.originalPrice * item.quantity).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `R${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>R{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {subtotal < 500 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-700">
                      Add R{(500 - subtotal).toLocaleString()} more to your cart for free shipping!
                    </p>
                  </div>
                )}

                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                </Button>
                
                <div className="text-center text-sm text-gray-500">
                  <p className="flex items-center justify-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pay securely with Instant EFT via Ozow
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Quality Guarantee
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Fast Delivery
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Easy Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
