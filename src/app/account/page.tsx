import { cookies } from 'next/headers';
import Link from 'next/link';
import { User, ShoppingBag, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default async function AccountPage() {
  cookies(); // opt into dynamic rendering
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Fetch orders count
  const { count: orderCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session!.user.id);

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session!.user.id)
    .single();

  const displayName = profile?.full_name || session!.user.user_metadata?.full_name || 'there';

  const dashboardCards = [
    {
      label: 'My Profile',
      description: 'Manage your personal info & addresses',
      href: '/account/profile',
      icon: User,
      value: profile?.full_name ? 'Complete' : 'Incomplete',
    },
    {
      label: 'My Orders',
      description: 'View your order history & track deliveries',
      href: '/account/orders',
      icon: ShoppingBag,
      value: `${orderCount ?? 0} order${(orderCount ?? 0) !== 1 ? 's' : ''}`,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName}! 👋</h1>
        <p className="mt-1 text-sm text-gray-500">Here&apos;s an overview of your account.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-100 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-green-700" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="font-semibold text-gray-900 mb-0.5">{card.label}</p>
              <p className="text-xs text-gray-500 mb-3">{card.description}</p>
              <span className="text-sm font-medium text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
                {card.value}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
