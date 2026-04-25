import { CategoryProducts } from '@/components/product/CategoryProducts';


interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Convert slug to Title Case for the display
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <main className="min-h-screen bg-gray-50 pt-8">
      <CategoryProducts 
        category={title} 
        title={title} 
        subtitle={`Discover our selection of ${title}`} 
      />
    </main>
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${title} | LekkerDirect`,
    description: `Shop the best ${title} at LekkerDirect. High quality products with secure Ozow payments.`,
  };
}
