import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Sample product data - this will come from Supabase later
const sampleProduct = {
  id: '1',
  title: 'SmartWatch Rose Gold Edition',
  description: 'Premium smartwatch with health tracking, GPS, and 5-day battery life. Features include heart rate monitoring, sleep tracking, water resistance, and smartphone notifications.',
  price: 1499,
  originalPrice: 2199,
  category: 'Electronics',
  image: '/api/placeholder/600/600',
  images: [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ],
  inStock: true,
  stockCount: 15,
  sku: 'SW-RG-001',
  features: [
    '1.4" AMOLED Display',
    'Heart Rate & SpO2 Monitoring',
    'GPS Tracking',
    '5-Day Battery Life',
    'Water Resistant (5ATM)',
    'Bluetooth 5.0',
    'Compatible with iOS & Android'
  ]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, this would fetch from Supabase based on params.id
  const product = sampleProduct
  
  if (!product) {
    notFound()
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-8 text-sm text-gray-500">
          <a href="/" className="hover:text-green-700">Home</a>
          <span className="mx-2">/</span>
          <a href="/shop" className="hover:text-green-700">Shop</a>
          <span className="mx-2">/</span>
          <a href={`/category/${product.category.toLowerCase()}`} className="hover:text-green-700">
            {product.category}
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="w-full rounded-lg shadow-lg"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </span>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full rounded border-2 border-gray-200 hover:border-green-700 cursor-pointer transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-green-700">R{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    R{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                    Save R{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className={`flex items-center ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-600' : 'bg-red-600'}`}></span>
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
                <span>SKU: {product.sku}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-green-700 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Free shipping on orders over R500</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure checkout powered by Ozow
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full text-lg py-3"
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full text-lg py-3 mt-3"
              >
                Buy Now
              </Button>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <svg className="h-8 w-8 mx-auto mb-2 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm font-semibold">Quality Guaranteed</p>
                </div>
                <div>
                  <svg className="h-8 w-8 mx-auto mb-2 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm font-semibold">Fast Delivery</p>
                </div>
                <div>
                  <svg className="h-8 w-8 mx-auto mb-2 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <p className="text-sm font-semibold">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
