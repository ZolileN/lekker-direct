import { createSupabaseClient } from '../client';
import { IProductRepository, Product } from '../../../domain/models/product';

interface DatabaseProduct {
  id: string;
  supplier_id?: string;
  supplier_type?: string;
  title: string;
  description: string;
  price_zar: number | string;
  original_price_zar?: number | string | null;
  category?: string;
  image_url: string;
  additional_images?: string[] | null;
  stock_count?: number | null;
  sku?: string | null;
  features?: string[] | null;
}

export class SupabaseProductRepository implements IProductRepository {
  private readonly supabase = createSupabaseClient();

  private mapToProduct(p: DatabaseProduct): Product {
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: Number(p.price_zar),
      originalPrice: p.original_price_zar ? Number(p.original_price_zar) : undefined,
      category: p.category || 'General',
      image: p.image_url,
      images: p.additional_images || undefined,
      inStock: (p.stock_count ?? 0) > 0,
      stockCount: p.stock_count ?? 0,
      sku: p.sku || '',
      features: p.features || undefined,
    };
  }

  async getAll(limit?: number): Promise<Product[]> {
    let query = this.supabase
      .from('products')
      .select('*');
    
    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    console.log(`Successfully fetched ${data.length} products from Supabase`);
    return data.map(p => this.mapToProduct(p));
  }

  async getByCategory(category: string, limit?: number): Promise<Product[]> {
    let query = this.supabase
      .from('products')
      .select('*')
      .ilike('category', `%${category}%`); // Using ilike for fuzzy matching
    
    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data || []).map(p => this.mapToProduct(p));
  }

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // "row not found"
    return data ? this.mapToProduct(data) : null;
  }
}
