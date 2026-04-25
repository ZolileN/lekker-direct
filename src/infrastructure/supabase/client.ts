import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const createSupabaseClient = (): SupabaseClient => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.'
    );
  }

  // Use secret key for development to bypass potential RLS issues
  return createClient(url, secretKey);
};
