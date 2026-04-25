'use client';

import { ShoppingCart, Package, User } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '../../config/navigation';
import { siteConfig } from '../../config/site';
import { useCart } from '../../hooks/useCart';

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-green-700 dark:text-green-500">{siteConfig.name}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/orders" className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              <Package className="h-6 w-6" />
            </Link>
            <Link href="/account" className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-700 dark:bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
