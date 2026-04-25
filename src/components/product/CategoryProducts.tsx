import { SupabaseProductRepository } from '@/infrastructure/supabase/repository/ProductRepository';
import { ProductGrid } from './ProductGrid';
import { Product } from '@/domain/models/product';

interface CategoryProductsProps {
  category?: string;
  title: string;
  subtitle?: string;
  limit?: number;
}

export async function CategoryProducts({ category, title, subtitle, limit = 25 }: CategoryProductsProps) {
  const repository = new SupabaseProductRepository();
  
  let products: Product[] = [];
  try {
    if (category) {
      products = await repository.getByCategory(category, limit);
    } else {
      products = await repository.getAll(limit);
    }
  } catch (error) {
    console.error(`Failed to fetch products for ${title}:`, error);
  }

  return (
    <ProductGrid 
      products={products} 
      title={title} 
      subtitle={subtitle} 
    />
  );
}
