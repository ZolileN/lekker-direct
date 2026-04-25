// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, secretKey);

async function checkTitles() {
  try {
    console.log('Fetching all products...');
    const { data: products, error } = await supabase
      .from('products')
      .select('id, title, category');
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    
    console.log(`Found ${products.length} products`);
    console.log('\nProduct titles and categories:');
    products.forEach(p => {
      console.log(`- "${p.title}" | Category: "${p.category}"`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

checkTitles();
