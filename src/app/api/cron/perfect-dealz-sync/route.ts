import { NextResponse } from 'next/server';
import { PerfectDealzSupplier } from '@/lib/suppliers/perfect-dealz';
import { createClient } from '@/lib/supabase';

/**
 * POST /api/cron/perfect-dealz-sync
 * Cron job endpoint for Perfect Dealz product sync and categorization
 * Protected by CRON_SECRET for security
 */
export async function POST(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(true);
  const supplier = new PerfectDealzSupplier();

  try {
    console.log('Starting Perfect Dealz sync...');
    
    // Step 1: Sync products from Perfect Dealz
    const syncResult = await supplier.sync();
    console.log('Sync result:', syncResult);

    // Step 2: Categorize the synced products
    console.log('Starting categorization...');
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, title, category')
      .eq('supplier', 'perfect_dealz');

    if (fetchError) throw fetchError;

    const categorization: Record<string, string[]> = {
      'Electronics': ['watch', 'smart', 'phone', 'earbuds', 'charger', 'usb', 'cable', 'light', 'camera', 'speaker', 'laptop', 'keyboard', 'mouse', 'monitor', 'tablet', 'digital', 'remote', 'battery', 'power bank', 'electronic', 'kids laptop', 'learning machine'],
      'Fashion': ['shoes', 'shirt', 'dress', 'bag', 'wallet', 'sunglasses', 'hat', 'belt', 'jewelry', 'hoodie', 'shawl', 'wearable', 'heated shawl', 'heated hoodie', 'clothing', 'apparel', 'style', 'clothes', 't-shirt', 'jeans', 'jacket', 'scarf'],
      'Home': ['desk', 'chair', 'kitchen', 'lamp', 'bed', 'pillow', 'fan', 'shelf', 'towel', 'sink', 'faucet', 'shower', 'bathroom', 'toilet', 'furniture', 'sofa', 'decor', 'appliance', 'cooking', 'cleaning', 'organizer', 'storage', 'curtain', 'blanket', 'rug', 'mat', 'stainless steel', 'waterfall', 'panel', 'tap', 'bib', 'playhouse', 'playground', 'slide', 'playset', 'childrens', 'fork', 'tool', 'knife', 'building', 'construction', 'parking', 'gem', 'crystal', 'wheel drive', 'stunt car', 'steamer', 'charger plate', 'clothes steamer']
    };

    let categorizedCount = 0;

    for (const product of products || []) {
      let newCategory = product.category;
      
      if (!newCategory || newCategory === 'General' || newCategory === '') {
        const title = product.title.toLowerCase();
        
        for (const [cat, keywords] of Object.entries(categorization)) {
          if (keywords.some(k => title.includes(k))) {
            newCategory = cat;
            break;
          }
        }
      }

      if (newCategory && newCategory !== product.category) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ category: newCategory })
          .eq('id', product.id);
        
        if (updateError) throw updateError;
        categorizedCount++;
      }
    }

    console.log(`Categorized ${categorizedCount} products`);

    return NextResponse.json({
      success: true,
      sync: syncResult,
      categorization: {
        total_products: products?.length || 0,
        categorized: categorizedCount
      }
    });
  } catch (error: unknown) {
    console.error('Perfect Dealz sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * GET /api/cron/perfect-dealz-sync
 * Manual trigger for testing (not for production use)
 */
export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Use POST method in production' }, { status: 405 });
  }

  // For local testing, we can trigger via GET
  const supabase = createClient(true);
  const supplier = new PerfectDealzSupplier();

  try {
    console.log('Starting Perfect Dealz sync (manual)...');
    
    const syncResult = await supplier.sync();
    console.log('Sync result:', syncResult);

    console.log('Starting categorization...');
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, title, category')
      .eq('supplier', 'perfect_dealz');

    if (fetchError) throw fetchError;

    const categorization: Record<string, string[]> = {
      'Electronics': ['watch', 'smart', 'phone', 'earbuds', 'charger', 'usb', 'cable', 'light', 'camera', 'speaker', 'laptop', 'keyboard', 'mouse', 'monitor', 'tablet', 'digital', 'remote', 'battery', 'power bank', 'electronic', 'kids laptop', 'learning machine'],
      'Fashion': ['shoes', 'shirt', 'dress', 'bag', 'wallet', 'sunglasses', 'hat', 'belt', 'jewelry', 'hoodie', 'shawl', 'wearable', 'heated shawl', 'heated hoodie', 'clothing', 'apparel', 'style', 'clothes', 't-shirt', 'jeans', 'jacket', 'scarf'],
      'Home': ['desk', 'chair', 'kitchen', 'lamp', 'bed', 'pillow', 'fan', 'shelf', 'towel', 'sink', 'faucet', 'shower', 'bathroom', 'toilet', 'furniture', 'sofa', 'decor', 'appliance', 'cooking', 'cleaning', 'organizer', 'storage', 'curtain', 'blanket', 'rug', 'mat', 'stainless steel', 'waterfall', 'panel', 'tap', 'bib', 'playhouse', 'playground', 'slide', 'playset', 'childrens', 'fork', 'tool', 'knife', 'building', 'construction', 'parking', 'gem', 'crystal', 'wheel drive', 'stunt car', 'steamer', 'charger plate', 'clothes steamer']
    };

    let categorizedCount = 0;

    for (const product of products || []) {
      let newCategory = product.category;
      
      if (!newCategory || newCategory === 'General' || newCategory === '') {
        const title = product.title.toLowerCase();
        
        for (const [cat, keywords] of Object.entries(categorization)) {
          if (keywords.some(k => title.includes(k))) {
            newCategory = cat;
            break;
          }
        }
      }

      if (newCategory && newCategory !== product.category) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ category: newCategory })
          .eq('id', product.id);
        
        if (updateError) throw updateError;
        categorizedCount++;
      }
    }

    console.log(`Categorized ${categorizedCount} products`);

    return NextResponse.json({
      success: true,
      sync: syncResult,
      categorization: {
        total_products: products?.length || 0,
        categorized: categorizedCount
      }
    });
  } catch (error: unknown) {
    console.error('Perfect Dealz sync error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
