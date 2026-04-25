import { DropstoreSupplier } from './dropstore';
import { PerfectDealzSupplier } from './perfect-dealz';
import { SupplierType } from './types';
import { BaseSupplier } from './base';

export function getSupplier(type: SupplierType): BaseSupplier {
  switch (type) {
    case 'dropstore':
      return new DropstoreSupplier();
    case 'perfect_dealz':
      return new PerfectDealzSupplier();
    case 'gadget_gyz':
      // To be implemented
      throw new Error('GadgetGyz supplier not implemented yet');
    default:
      throw new Error(`Unknown supplier type: ${type}`);
  }
}

export * from './types';
export * from './base';
export * from './dropstore';
export * from './perfect-dealz';
