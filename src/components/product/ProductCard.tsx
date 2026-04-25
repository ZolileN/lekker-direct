'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Product } from '../../domain/models/product';
import { useCart } from '../../hooks/useCart';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 group">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </span>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-green-700 dark:hover:text-green-500 transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">R{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                R{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <Button 
          className="w-full" 
          size="sm"
          onClick={() => addItem(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
