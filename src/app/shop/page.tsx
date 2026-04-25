import { CategoryProducts } from '@/components/product/CategoryProducts';

export const metadata = {
  title: 'Shop All Products | LekkerDirect',
  description: 'Browse our full catalog of high-quality products at LekkerDirect.',
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8">
      <CategoryProducts 
        title="All Products" 
        subtitle="Browse our complete collection" 
      />
    </main>
  );
}
