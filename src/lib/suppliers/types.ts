export type SupplierType = 'dropstore' | 'perfect_dealz' | 'gadget_gyz';

export interface SupplierProduct {
  supplier_id: string;
  supplier: SupplierType;
  title: string;
  description: string;
  price_zar: number;
  original_price_zar?: number;
  stock_count: number;
  category?: string;
  subcategory?: string;
  image_url?: string;
  additional_images?: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
  };
}

export interface SyncResult {
  supplier: SupplierType;
  sync_type: 'full' | 'incremental';
  products_updated: number;
  products_added: number;
  products_removed: number;
  status: 'success' | 'error' | 'partial';
  error_message?: string;
  sync_duration_seconds: number;
  started_at: Date;
  completed_at: Date;
}

export interface SupplierConfig {
  supplier: SupplierType;
  api_endpoint?: string;
  api_key?: string;
  xml_feed_url?: string;
  sync_interval_minutes: number;
  is_active: boolean;
}
