import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product/ProductDetails';
import { sampleProduct } from '@/data/products';

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, this would use a domain use case (e.g., GetProductById)
  // const product = await getProductById.execute(params.id);
  const product = sampleProduct;
  
  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
