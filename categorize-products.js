// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, secretKey);

// Category mapping based on product titles and descriptions
function categorizeProduct(product) {
  const { title, description } = product;
  const text = `${title} ${description}`.toLowerCase();
  
  // Electronics keywords (highest priority for true electronics)
  const electronicsKeywords = [
    'smartwatch', 'smart watch', 'wireless', 'earbuds', 'headphones', 'speaker',
    'phone', 'bluetooth', 'camera', 'laptop', 'tablet', 'monitor',
    'keyboard', 'mouse', 'digital', 'remote', 'battery',
    'power bank', 'electronic', 'kids laptop', 'learning machine'
  ];
  
  // Fashion keywords
  const fashionKeywords = [
    'shirt', 'pants', 'dress', 'shoes', 'bag', 'jewelry',
    'clothing', 'fashion', 'apparel', 'style', 'clothes',
    't-shirt', 'jeans', 'jacket', 'hat', 'scarf', 'belt',
    'hoodie', 'shawl', 'wearable', 'heated shawl', 'heated hoodie'
  ];
  
  // Home keywords (but exclude items that are clearly electronics)
  const homeKeywords = [
    'kitchen', 'sink', 'faucet', 'shower', 'bathroom', 'toilet',
    'furniture', 'chair', 'table', 'sofa', 'lamp', 'decor',
    'appliance', 'cooking', 'cleaning', 'organizer', 'storage',
    'curtain', 'towel', 'blanket', 'pillow', 'rug', 'mat',
    'stainless steel', 'waterfall', 'panel', 'tap', 'bib',
    'playhouse', 'playground', 'slide', 'playset', 'childrens',
    'fork', 'tool', 'knife', 'building', 'construction',
    'parking', 'gem', 'crystal', 'wheel drive', 'stunt car',
    'desk', 'steamer', 'charger plate', 'clothes steamer'
  ];
  
  // Check electronics first (highest priority)
  if (electronicsKeywords.some(keyword => text.includes(keyword))) {
    return 'Electronics';
  }
  
  // Check fashion
  if (fashionKeywords.some(keyword => text.includes(keyword))) {
    return 'Fashion';
  }
  
  // Check home
  if (homeKeywords.some(keyword => text.includes(keyword))) {
    return 'Home';
  }
  
  // Default to Home for items that don't match specific categories
  return 'Home';
}

async function categorizeProducts() {
  try {
    console.log('Fetching all products...');
    const { data: products, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) {
      console.error('Error fetching products:', error);
      return;
    }
    
    console.log(`Found ${products.length} products`);
    
    let updateCount = 0;
    
    for (const product of products) {
      const newCategory = categorizeProduct(product);
      
      if (product.category !== newCategory) {
        console.log(`Updating "${product.title}": "${product.category}" -> "${newCategory}"`);
        
        const { error: updateError } = await supabase
          .from('products')
          .update({ category: newCategory })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`Error updating product ${product.id}:`, updateError);
        } else {
          updateCount++;
        }
      } else {
        console.log(`Skipping "${product.title}" - already categorized as "${newCategory}"`);
      }
    }
    
    console.log(`\n✅ Successfully updated ${updateCount} products`);
  } catch (error) {
    console.error('Error:', error);
  }
}

categorizeProducts();
