'use client';

import { ShoppingCart, Package, User, LogIn, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { navLinks } from '../../config/navigation';
import { siteConfig } from '../../config/site';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { itemCount } = useCart();
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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
              <Link key={link.name} href={link.href} className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors text-sm font-medium">
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {/* Orders shortcut (only for logged-in users) */}
            {user && (
              <Link href="/account/orders" className="text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors p-1">
                <Package className="h-5 w-5" />
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-500 transition-colors p-1">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-700 dark:bg-green-600 text-white text-xs rounded-full h-4.5 w-4.5 min-w-[1.1rem] flex items-center justify-center font-bold leading-none px-0.5">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth area */}
            {!loading && (
              <>
                {user ? (
                  /* Logged-in: avatar dropdown */
                  <div className="relative" ref={dropdownRef}>
                    <button
                      id="account-menu-btn"
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center text-xs font-bold">
                        {initials}
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 py-1 z-50 overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{displayName}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Package className="w-4 h-4" />
                          My Orders
                        </Link>
                        <hr className="my-1 border-gray-100 dark:border-gray-800" />
                        <button
                          onClick={handleSignOut}
                          id="header-sign-out-btn"
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Logged-out: sign in button */
                  <Link
                    href="/login"
                    id="header-login-btn"
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-white bg-green-700 rounded-full hover:bg-green-800 transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign in
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
