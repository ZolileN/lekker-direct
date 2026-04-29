'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { LayoutDashboard, User, ShoppingBag, LogOut } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const navItems = [
  { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
  { label: 'My Profile', href: '/account/profile', icon: User },
  { label: 'My Orders', href: '/account/orders', icon: ShoppingBag },
];

export function AccountSidebar({ user }: { user: SupabaseUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Account';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* User info */}
      <div className="p-6 bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold truncate">{displayName}</p>
            <p className="text-xs text-green-100 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <hr className="my-3 border-gray-100" />

        <button
          onClick={handleSignOut}
          id="sign-out-btn"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </nav>
    </div>
  );
}
