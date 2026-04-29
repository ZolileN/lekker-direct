import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { createClient } from '@/lib/supabase';

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  // Use the publishable key client to get session from cookies
  // The middleware handles session refresh, so this is safe
  cookies(); // needed to opt into dynamic rendering
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <AccountSidebar user={session.user} />
          </aside>
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
