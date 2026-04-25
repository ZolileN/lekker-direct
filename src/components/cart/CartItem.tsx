'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../domain/models/cartItem';
import { useCart } from '../../hooks/useCart';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="shrink-0">
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
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors text-gray-900"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-x border-gray-300 text-gray-900 font-medium">
                {item.quantity}
              </span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors text-gray-900"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button 
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
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
  );
}
