// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Publishable key:', publishableKey);
console.log('Secret key:', secretKey);

// Test with publishable key (used by frontend)
const supabase = createClient(supabaseUrl, publishableKey);

async function testConnection() {
  try {
    console.log('Attempting to fetch products...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Success! Found products:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('Sample product:', data[0]);
      }
    }
  } catch (err) {
    console.error('Connection error:', err.message);
  }
}

testConnection();
