import { useState, useEffect } from 'react';
import type { StoreItem } from './dataStore';

export interface CartItem extends StoreItem {
  cartItemId: string; // Unique ID for cart item (id + size)
  quantity: number;
  size?: 'S' | 'M' | 'L' | 'XL' | 'One Size';
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const cartState: CartState = {
  items: [],
  isOpen: false,
};

let listeners: Array<() => void> = [];

const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

try {
  const storedCart = localStorage.getItem('ronz_cart');
  if (storedCart) {
    cartState.items = JSON.parse(storedCart);
  }
} catch (e) {
  console.error("Local storage error:", e);
}

export const useCartStore = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick(t => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    cartState.items = newItems;
    localStorage.setItem('ronz_cart', JSON.stringify(newItems));
    emitChange();
  };

  const addItem = (item: StoreItem, size: CartItem['size'] = 'One Size') => {
    const cartItemId = `${item.id}-${size}`;
    const existingItemIndex = cartState.items.findIndex(i => i.cartItemId === cartItemId);

    if (existingItemIndex >= 0) {
      const newItems = [...cartState.items];
      newItems[existingItemIndex].quantity += 1;
      saveItems(newItems);
    } else {
      saveItems([...cartState.items, { ...item, cartItemId, quantity: 1, size }]);
    }
  };

  const removeItem = (cartItemId: string) => {
    saveItems(cartState.items.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    const newItems = cartState.items.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    saveItems(newItems);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const toggleCart = () => {
    cartState.isOpen = !cartState.isOpen;
    emitChange();
  };

  const openCart = () => {
    if (!cartState.isOpen) {
      cartState.isOpen = true;
      emitChange();
    }
  };

  const closeCart = () => {
    if (cartState.isOpen) {
      cartState.isOpen = false;
      emitChange();
    }
  };

  const cartTotal = cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartState.items.reduce((count, item) => count + item.quantity, 0);

  return {
    items: cartState.items,
    isOpen: cartState.isOpen,
    cartTotal,
    cartCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
};
