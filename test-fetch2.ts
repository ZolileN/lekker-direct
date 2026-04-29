import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { PerfectDealzSupplier } from './src/lib/suppliers/perfect-dealz';

async function run() {
  const supplier = new PerfectDealzSupplier();
  const products = await supplier.fetchProducts();
  console.log('Total products fetched from feed:', products.length);
  for (let i = 0; i < Math.min(3, products.length); i++) {
     console.log(products[i].title, products[i].category);
  }
}

run().catch(console.error);
