'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Product } from '../../domain/models/product';
import { useCart } from '../../hooks/useCart';

export function ProductDetails({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-green-700 dark:hover:text-green-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-green-700 dark:hover:text-green-500">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-green-700 dark:hover:text-green-500">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-gray-100">{product.title}</span>
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
                className="w-full rounded-lg shadow-lg object-cover"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </span>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full rounded border-2 border-gray-200 dark:border-gray-800 hover:border-green-700 dark:hover:border-green-500 cursor-pointer transition-colors object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
 
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-green-700 dark:text-green-500">R{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    R{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount > 0 && product.originalPrice && (
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-sm font-semibold">
                    Save R{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span className={`flex items-center ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-600 dark:bg-green-400' : 'bg-red-600 dark:bg-red-400'}`}></span>
                  {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
                </span>
                <span>SKU: {product.sku}</span>
              </div>
            </div>
 
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{product.description}</p>
            </div>
 
            {product.features && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-700 dark:text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
 
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <Button 
                size="lg" 
                className="w-full text-lg py-3"
                disabled={!product.inStock}
                onClick={() => addItem(product)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
            
            {/* Guarantee features */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <svg className="h-8 w-8 mx-auto mb-2 text-green-700 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quality Guaranteed</p>
                </div>
                <div>
                  <svg className="h-8 w-8 mx-auto mb-2 text-green-700 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Fast Delivery</p>
                </div>
                <div>
                  <svg className="h-8 w-8 mx-auto mb-2 text-green-700 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Easy Returns</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
