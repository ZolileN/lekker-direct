'use client'

import { ShoppingCart, Package, User } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-700">LekkerDirect</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/shop" className="text-gray-700 hover:text-green-700 transition-colors">
              Shop
            </Link>
            <Link href="/electronics" className="text-gray-700 hover:text-green-700 transition-colors">
              Electronics
            </Link>
            <Link href="/fashion" className="text-gray-700 hover:text-green-700 transition-colors">
              Fashion
            </Link>
            <Link href="/home" className="text-gray-700 hover:text-green-700 transition-colors">
              Home
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/orders" className="text-gray-700 hover:text-green-700 transition-colors">
              <Package className="h-6 w-6" />
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-green-700 transition-colors">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-green-700 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
