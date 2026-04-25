import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product/ProductDetails';
import { SupabaseProductRepository } from '@/infrastructure/supabase/repository/ProductRepository';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const repository = new SupabaseProductRepository();
  const product = await repository.getById(params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
