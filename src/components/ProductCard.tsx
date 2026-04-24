import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/Button'

interface ProductCardProps {
  id: string
  title: string
  category: string
  price: number
  originalPrice?: number
  image: string
  discount?: number
}

export default function ProductCard({ 
  id, 
  title, 
  category, 
  price, 
  originalPrice, 
  image, 
  discount 
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
        </Link>
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </span>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-green-700 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900">R{price.toLocaleString()}</span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                R{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <Button className="w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
