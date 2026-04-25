import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  const supabase = createClient(true);
  
  try {
    console.log('Fetching products to categorize...');
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, title, category');

    if (fetchError) throw fetchError;

    const categorization: Record<string, string[]> = {
      'Electronics': ['watch', 'smart', 'phone', 'earbuds', 'charger', 'usb', 'cable', 'light', 'camera', 'speaker'],
      'Fashion': ['shoes', 'shirt', 'dress', 'bag', 'wallet', 'sunglasses', 'hat', 'belt', 'jewelry'],
      'Home': ['desk', 'chair', 'kitchen', 'lamp', 'bed', 'pillow', 'fan', 'shelf', 'towel']
    };

    let updatedCount = 0;

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
        updatedCount++;
      }
    }

    return NextResponse.json({ success: true, updatedCount });
  } catch (error) {
    console.error('Error during categorization:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
