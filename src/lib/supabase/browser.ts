/**
 * Client-side Supabase client for use in Client Components ('use client').
 * Uses createBrowserClient from @supabase/auth-helpers-nextjs.
 */
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
