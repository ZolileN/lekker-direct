import { createClient } from '@/lib/supabase';
import { getSupplier } from './index';
import { SupplierType, SyncResult } from './types';

export class SyncEngine {
  private supabase = createClient(true);

  async syncAllActive(): Promise<SyncResult[]> {
    // 1. Fetch active supplier configurations from DB
    const { data: activeConfigs, error } = await this.supabase
      .from('supplier_configs')
      .select('supplier')
      .eq('is_active', true);

    if (error) {
      console.error('Failed to fetch active supplier configs:', error);
      throw error;
    }

    const results: SyncResult[] = [];

    // 2. Run sync for each active supplier
    for (const config of activeConfigs || []) {
      try {
        console.log(`Starting sync for ${config.supplier}...`);
        const supplier = getSupplier(config.supplier as SupplierType);
        const result = await supplier.sync();
        results.push(result);
        console.log(`Sync completed for ${config.supplier}: ${result.status}`);
      } catch (error) {
        console.error(`Sync failed for ${config.supplier}:`, error);
      }
    }

    return results;
  }

  async syncSupplier(type: SupplierType): Promise<SyncResult> {
    const supplier = getSupplier(type);
    return await supplier.sync();
  }
}
