import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { SyncEngine } from './src/lib/suppliers/sync-engine';

async function run() {
  const engine = new SyncEngine();
  console.log('Starting Perfect Dealz sync...');
  const result = await engine.syncSupplier('perfect_dealz');
  console.log('Sync Result:', result);
}
run().catch(console.error);
