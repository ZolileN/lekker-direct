import { createSupabaseClient } from '../client';
import { IProductRepository, Product } from '../../../domain/models/product';

export class SupabaseProductRepository implements IProductRepository {
  private readonly supabase = createSupabaseClient();

  async getAll(): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*');

    if (error) throw error;
    return (data as Product[]) ?? [];
  }

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // "row not found"
    return (data as Product) ?? null;
  }
}
