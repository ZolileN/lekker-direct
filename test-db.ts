import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { SupabaseProductRepository } from './src/infrastructure/supabase/repository/ProductRepository';

async function run() {
  const repo = new SupabaseProductRepository();
  const products = await repo.getAll();
  console.log('Total products in DB:', products.length);
  for (let i = 0; i < Math.min(3, products.length); i++) {
     console.log(products[i].title, '|', products[i].category);
  }
}
run().catch(console.error);
