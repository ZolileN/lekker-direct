import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
        'Missing Supabase environment variables. ' +
        'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local.'
    )
}

// Standard client with publishable key
export const supabase = createSupabaseClient(supabaseUrl, supabasePublishableKey)

// Function to get a client, optionally with secret key for admin tasks
export function createClient(useSecretKey = false) {
    const key = useSecretKey ? (supabaseSecretKey || supabasePublishableKey) : supabasePublishableKey
    return createSupabaseClient(supabaseUrl, key)
}
