import { NextResponse } from 'next/server';
import { SyncEngine } from '@/lib/suppliers/sync-engine';
import { SupplierType } from '@/lib/suppliers/types';

/**
 * GET /api/admin/sync
 * Triggers a sync for all active suppliers or a specific one.
 * Query Params:
 *  - supplier: (optional) 'dropstore' | 'perfect_dealz' | 'gadget_gyz'
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supplierType = searchParams.get('supplier') as SupplierType | null;
  
  const syncEngine = new SyncEngine();
  
  try {
    if (supplierType) {
      const result = await syncEngine.syncSupplier(supplierType);
      return NextResponse.json({ success: true, result });
    } else {
      const results = await syncEngine.syncAllActive();
      return NextResponse.json({ success: true, results });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Sync API Error:', error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/sync
 * Secure endpoint for Vercel Cron or other webhooks.
 * Expects an Authorization header.
 */
export async function POST(request: Request) {
  // Simple check for CRON_SECRET if running in production
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const syncEngine = new SyncEngine();
  
  try {
    const results = await syncEngine.syncAllActive();
    return NextResponse.json({ success: true, results });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
