import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';

export class CartService {
  private items: CartItem[] = [];

  constructor(initialItems: CartItem[] = []) {
    this.items = [...initialItems];
  }

  add(product: Product, quantity: number = 1): CartItem[] {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    return this.getItems();
  }

  remove(productId: string): CartItem[] {
    this.items = this.items.filter(i => i.id !== productId);
    return this.getItems();
  }

  updateQuantity(productId: string, quantity: number): CartItem[] {
    if (quantity <= 0) {
      return this.remove(productId);
    }
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    return this.getItems();
  }

  clear(): CartItem[] {
    this.items = [];
    return this.getItems();
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getSubtotal(): number {
    return this.items.reduce((s, i) => s + (i.price * i.quantity), 0);
  }

  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 500 ? 0 : 99; // Free shipping over 500
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShippingCost();
  }

  getItemCount(): number {
    return this.items.reduce((s, i) => s + i.quantity, 0);
  }
}
