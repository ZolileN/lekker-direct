import { BaseSupplier } from './base';
import { SupplierProduct, SupplierType } from './types';

export class DropstoreSupplier extends BaseSupplier {
  protected supplierType: SupplierType = 'dropstore';

  async fetchProducts(): Promise<SupplierProduct[]> {
    const apiKey = process.env.DROPSTORE_API_KEY;
    const endpoint = 'https://api.dropstore.co.za/v1/products';

    if (!apiKey) {
      console.warn('DROPSTORE_API_KEY is not set. Skipping sync.');
      return [];
    }

    try {
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Dropstore API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Map Dropstore API response to our SupplierProduct interface
      // Assuming a typical structure based on common dropshipping APIs
      interface DropstoreProduct {
        id: string | number;
        name?: string;
        title?: string;
        description?: string;
        price: string | number;
        compare_at_price?: string | number;
        stock_quantity?: string | number;
        inventory_quantity?: string | number;
        category?: string;
        images?: Array<{ src: string }>;
        image_url?: string;
        sku?: string;
        weight?: string | number;
      }

      return (data.products || []).map((p: DropstoreProduct) => ({
        supplier_id: String(p.id),
        supplier: this.supplierType,
        title: p.name || p.title,
        description: p.description,
        price_zar: Number(p.price),
        original_price_zar: p.compare_at_price ? Number(p.compare_at_price) : undefined,
        stock_count: Number(p.stock_quantity || p.inventory_quantity || 0),
        category: p.category,
        image_url: p.images?.[0]?.src || p.image_url,
        additional_images: p.images?.slice(1).map((img: { src: string }) => img.src) || [],
        sku: p.sku,
        weight: p.weight,
      }));
    } catch (error) {
      console.error('Error fetching from Dropstore:', error);
      throw error;
    }
  }
}
