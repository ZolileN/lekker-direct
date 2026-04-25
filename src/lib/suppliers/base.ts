import { createClient } from '@/lib/supabase';
import { SupplierProduct, SyncResult, SupplierType } from './types';

export abstract class BaseSupplier {
  protected supabase = createClient(true);
  protected abstract supplierType: SupplierType;

  /**
   * Fetches products from the supplier's source (API or XML).
   */
  abstract fetchProducts(): Promise<SupplierProduct[]>;

  /**
   * Updates the products in the database.
   * Uses upsert to handle new and existing products.
   */
  async sync(): Promise<SyncResult> {
    const startedAt = new Date();
    let productsAdded = 0;
    let productsUpdated = 0;
    const productsRemoved = 0;

    try {
      // 1. Fetch products from supplier
      const supplierProducts = await this.fetchProducts();

      // 2. Get existing products for this supplier to compare
      const { data: existingProducts, error: fetchError } = await this.supabase
        .from('products')
        .select('id, supplier_id')
        .eq('supplier', this.supplierType);

      if (fetchError) throw fetchError;

      const existingMap = new Map(existingProducts?.map(p => [p.supplier_id, p.id]));

      // 3. Prepare products for upsert (attach internal ID if it exists)
      const productsToUpsert = supplierProducts.map(p => {
        const id = existingMap.get(p.supplier_id);
        if (id) {
          productsUpdated++;
          return {
            ...p,
            id,
            last_sync: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        } else {
          productsAdded++;
          return {
            ...p,
            last_sync: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        }
      });

      // 4. Upsert products
      if (productsToUpsert.length > 0) {
        // We can use upsert without onConflict if we provide the primary key 'id' for existing records
        const { error: upsertError } = await this.supabase
          .from('products')
          .upsert(productsToUpsert, { 
            onConflict: 'supplier_id,supplier',
            ignoreDuplicates: false 
          });

        if (upsertError) throw upsertError;
      }

      const completedAt = new Date();
      const result: SyncResult = {
        supplier: this.supplierType,
        sync_type: 'full',
        products_updated: productsUpdated,
        products_added: productsAdded,
        products_removed: productsRemoved,
        status: 'success',
        sync_duration_seconds: Math.floor((completedAt.getTime() - startedAt.getTime()) / 1000),
        started_at: startedAt,
        completed_at: completedAt,
      };

      // 4. Log sync result
      await this.logSync(result);

      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const completedAt = new Date();
      const result: SyncResult = {
        supplier: this.supplierType,
        sync_type: 'full',
        products_updated: productsUpdated,
        products_added: productsAdded,
        products_removed: productsRemoved,
        status: 'error',
        error_message: errorMessage,
        sync_duration_seconds: Math.floor((completedAt.getTime() - startedAt.getTime()) / 1000),
        started_at: startedAt,
        completed_at: completedAt,
      };

      await this.logSync(result);
      throw error;
    }
  }

  private async logSync(result: SyncResult) {
    const { error } = await this.supabase.from('inventory_sync_logs').insert({
      supplier: result.supplier,
      sync_type: result.sync_type,
      products_updated: result.products_updated,
      products_added: result.products_added,
      products_removed: result.products_removed,
      status: result.status,
      error_message: result.error_message,
      sync_duration_seconds: result.sync_duration_seconds,
      started_at: result.started_at.toISOString(),
      completed_at: result.completed_at.toISOString(),
    });

    if (error) {
      console.error(`Failed to log sync for ${this.supplierType}:`, error);
    }
  }
}
