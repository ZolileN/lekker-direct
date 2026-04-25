'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartService } from '../domain/services/CartService';
import { CartItem } from '../domain/models/cartItem';
import { Product } from '../domain/models/product';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Use a ref for the service to keep domain logic isolated from render cycles
  const [cartService] = useState(() => new CartService());
  const [items, setItems] = useState<CartItem[]>(cartService.getItems());

  // This ensures the local state stays in sync with the domain service
  const syncState = () => {
    setItems(cartService.getItems());
  };

  const addItem = (product: Product, quantity: number = 1) => {
    cartService.add(product, quantity);
    syncState();
  };

  const removeItem = (productId: string) => {
    cartService.remove(productId);
    syncState();
  };

  const updateQuantity = (productId: string, quantity: number) => {
    cartService.updateQuantity(productId, quantity);
    syncState();
  };

  const clearCart = () => {
    cartService.clear();
    syncState();
  };

  return (
    <CartContext.Provider value={{
      items,
      itemCount: cartService.getItemCount(),
      subtotal: cartService.getSubtotal(),
      shipping: cartService.getShippingCost(),
      total: cartService.getTotal(),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
