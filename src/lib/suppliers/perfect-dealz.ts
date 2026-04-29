import { BaseSupplier } from './base';
import { SupplierProduct, SupplierType } from './types';

export class PerfectDealzSupplier extends BaseSupplier {
  protected supplierType: SupplierType = 'perfect_dealz';

  async fetchProducts(): Promise<SupplierProduct[]> {
    const feedUrl = process.env.PERFECT_DEALZ_FEED_URL || 'https://perfectdealz.co.za/products.json?limit=250';
    let allProducts: SupplierProduct[] = [];
    let page = 1;
    const maxPages = 2; // Fetch up to 2 pages to get ~500 products

    try {
      while (page <= maxPages) {
        const url = `${feedUrl}${feedUrl.includes('?') ? '&' : '?'}page=${page}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Perfect Dealz feed error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const products = data.products || [];
        
        if (products.length === 0) {
          break; // No more products
        }

        const parsedProducts = products.map((p: any) => {
          // Extract price and SKU from first variant
          const variant = p.variants && p.variants.length > 0 ? p.variants[0] : null;
          const price = variant?.price ? this.parsePrice(variant.price) : 0;
          const originalPrice = variant?.compare_at_price ? this.parsePrice(variant.compare_at_price) : undefined;
          const sku = variant?.sku || undefined;

          // Extract images
          const imageUrl = p.images && p.images.length > 0 ? p.images[0].src : undefined;
          const additionalImages = p.images && p.images.length > 1 ? p.images.slice(1).map((img: any) => img.src) : [];

          // Categorize based on tags and product_type
          const tags = (p.tags || []).map((t: string) => t.toLowerCase());
          const type = (p.product_type || '').toLowerCase();
          
          let category = 'General';
          if (tags.some((t: string) => t.includes('electronic') || t.includes('tech') || t.includes('phone') || t.includes('audio') || t.includes('watch') || t.includes('speaker') || t.includes('camera')) || type.includes('electronic')) {
            category = 'Electronics';
          } else if (tags.some((t: string) => t.includes('fashion') || t.includes('clothing') || t.includes('wear') || t.includes('bag') || t.includes('apparel') || t.includes('shoe')) || type.includes('fashion')) {
            category = 'Fashion';
          } else if (tags.some((t: string) => t.includes('home') || t.includes('kitchen') || t.includes('furniture') || t.includes('garden')) || type.includes('home')) {
            category = 'Home';
          }

          return {
            supplier_id: String(p.id),
            supplier: this.supplierType,
            title: p.title || '',
            description: p.body_html || '',
            price_zar: price,
            original_price_zar: originalPrice,
            stock_count: 100, // Default for dropshipping if stock not provided
            category: category,
            image_url: imageUrl,
            additional_images: additionalImages,
            sku: sku ? `${sku}-${p.id}` : undefined,
          };
        });

        allProducts = [...allProducts, ...parsedProducts];
        page++;
      }

      return allProducts;
    } catch (error) {
      console.error('Error fetching from Perfect Dealz:', error);
      throw error;
    }
  }

  private parsePrice(priceStr: string | number): number {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    const cleaned = priceStr.replace(/[^\d.-]/g, '');
    return parseFloat(cleaned);
  }
}

