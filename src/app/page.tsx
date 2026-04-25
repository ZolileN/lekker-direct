import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Lock } from 'lucide-react';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SupabaseProductRepository } from '@/infrastructure/supabase/repository/ProductRepository';

export default async function Home() {
  const repository = new SupabaseProductRepository();
  const featuredProducts = await repository.getAll(25);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Quality Products,
                <span className="text-green-700"> Instant EFT</span> Payments
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                South Africa&apos;s favourite online store. Shop the latest electronics, fashion, and home goods with secure Ozow payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-3">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  Learn More
                </Button>
              </div>
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-2" />
                Secure checkout powered by Ozow
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <Image
                  src="/images/hero_banner.png"
                  alt="Featured Products - SmartWatch and Wireless Earbuds"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <ProductGrid 
        products={featuredProducts} 
        title="You May Also Like" 
        subtitle="Discover our most popular products" 
      />
      
      <div className="text-center -mt-8 mb-12">
        <Button variant="outline" size="lg">
          View All Products
        </Button>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose LekkerDirect?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Payments</h3>
              <p className="text-gray-600">
                Pay safely with Instant EFT via Ozow - no credit card required
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Premium products sourced from trusted suppliers
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick shipping across South Africa
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
