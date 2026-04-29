import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { PerfectDealzSupplier } from './src/lib/suppliers/perfect-dealz';

async function run() {
  const supplier = new PerfectDealzSupplier();
  const products = await supplier.fetchProducts();
  console.log('Total products fetched from feed:', products.length);
  
  // Categorize or filter
  const electronics = products.filter(p => 
    p.category?.toLowerCase().includes('electronic') || 
    p.category?.toLowerCase().includes('tech') ||
    p.category?.toLowerCase().includes('phone') ||
    p.category?.toLowerCase().includes('audio') ||
    p.category?.toLowerCase().includes('smart') ||
    p.category?.toLowerCase().includes('accessory') ||
    p.category?.toLowerCase().includes('gadget') ||
    p.title?.toLowerCase().includes('speaker') ||
    p.title?.toLowerCase().includes('headphone') ||
    p.title?.toLowerCase().includes('earbud')
  );
  
  const fashion = products.filter(p => 
    p.category?.toLowerCase().includes('fashion') || 
    p.category?.toLowerCase().includes('clothing') ||
    p.category?.toLowerCase().includes('wear') ||
    p.category?.toLowerCase().includes('watch') ||
    p.category?.toLowerCase().includes('bag')
  );

  console.log('Electronics found:', electronics.length);
  console.log('Fashion found:', fashion.length);
  
  if (electronics.length > 0) console.log('Sample Electronics:', electronics[0].title);
  if (fashion.length > 0) console.log('Sample Fashion:', fashion[0].title);
}

run().catch(console.error);
