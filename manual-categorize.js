// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, secretKey);

// Manual categorization based on product titles
const productCategories = {
  'Smart Fit Active Smartwatch': 'Electronics',
  'Folding 2-Tier Wall Mounted Desk': 'Home',
  'Childrens Playhouse Slide Playground Set': 'Home',
  'Alloy Construction Vehicles Friction Toy Set': 'Home',
  'Stainless Steel Waterfall Nano Kitchen Sink': 'Home',
  'Iron Grip Full Metal Survival Folding Knife': 'Home',
  'Matte Black Single Handle Kitchen Sink Faucet': 'Home',
  'Home Office Computer Writing Work Desk 120cm': 'Home',
  '1100W Foldable Handheld Clothes Steamer': 'Home',
  'Wearable USB Heated Shawl for Winter': 'Fashion',
  'Stylish PP Charger Plate - Elevate Your Table Settings': 'Home',
  'Colorful Plastic Four Wheel Drive Double-Sided Stunt Car': 'Home',
  'Engraved Wilderness Tactical Folding Knife': 'Home',
  'Childrens Modular City Parking Building Playset': 'Home',
  'Childrens Handmade Plastic Crystal Gem Toy Set': 'Home',
  '65 Functions Intelligent Kids Laptop Learning Machine Toy': 'Electronics',
  'Winter Solid Zipper USB Heated Electric Hoodie Shawl': 'Fashion',
  'Stainless Steel Rainfall Waterfall Shower Panel': 'Home',
  'Set of 6 Stainless Steel Fruit Forks with Wooden Handles': 'Home',
  'Hand Tool Combination Set - Complete Toolkit for Home & Auto': 'Home',
  'Reinforced Leather Safety Gloves': 'Home',
  'Single Bowl Stainless Steel Kitchen Sink': 'Home',
  'Golden Stainless Steel LED Shower Panel System': 'Home',
  'Chrome Plated Brass Bib Tap with Ceramic Valve Core': 'Home',
  'Silver Stainless Steel Shower Column Panel': 'Home',
  'Test Product': 'Home'
};

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
      const newCategory = productCategories[product.title];
      
      if (newCategory) {
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
        console.log(`No category defined for: "${product.title}"`);
      }
    }
    
    console.log(`\n✅ Successfully updated ${updateCount} products`);
  } catch (error) {
    console.error('Error:', error);
  }
}

categorizeProducts();
