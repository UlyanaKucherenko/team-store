import { describe, expect, it } from 'vitest';
import {
  addToCart,
  decQuantity,
  getCartItemTotal,
  getCartTotal,
  incQuantity,
  removeFromCart,
  getCartCount,
} from '../src/core/cart';
import type { Cart, CartItem, Product } from '../src/types/types';

const mockProduct1: Product = {
  id: 1,
  name: 'Roses',
  price: 999,
  currency: 'USD',
  category: 'Mono Bouquets',
  src: './img/roses.png',
  inStock: true,
  stock: 15,
  description: 'Classic bouquet of fresh pink garden roses in craft paper.',
};

const mockProduct2: Product = {
  id: 2,
  name: 'Peonies',
  price: 1290,
  currency: 'USD',
  category: 'Mono Bouquets',
  src: './img/peonies.png',
  inStock: true,
  stock: 8,
  description: 'Lush pastel pink peonies wrapped in minimalist paper.',
};

describe('Cart logic', () => {
  describe('addToCart', () => {
    it('should add a new item with quantity 1 when product is not in cart', () => {
      const cart: Cart = [];
      const res = addToCart(cart, mockProduct1);

      expect(res).toHaveLength(1);
      expect(res[0].product).toEqual(mockProduct1);
      expect(res[0].quantity).toBe(1);
    });
  });

  describe('incQuantity', () => {
    it('should increase quantity by 1', () => {
      const cart: Cart = [{ product: mockProduct1, quantity: 1 }];
      const res = incQuantity(cart, mockProduct1.id);

      expect(res[0].quantity).toBe(2);
    });
  });

  describe('decQuantity', () => {
    it('should decrease quantity by 1, but not below 1', () => {
      const cart: Cart = [{ product: mockProduct1, quantity: 2 }];
      const res = decQuantity(cart, mockProduct1.id);

      expect(res[0].quantity).toBe(1);
    });
  });

  describe('removeFromCart', () => {
    it('should completely remove product from cart', () => {
      const cart: Cart = [{ product: mockProduct1, quantity: 1 }];
      const res = removeFromCart(cart, mockProduct1.id);

      expect(res).toHaveLength(0);
    });
  });

  describe('getCartItemTotal', () => {
    it('should calculate total for one item as price * quantity', () => {
      const item: CartItem = { product: mockProduct1, quantity: 2 };

      expect(getCartItemTotal(item)).toBe(1998);
    });
  });

  describe('getCartTotal', () => {
    it('should calculate total sum of all items in cart', () => {
      const cart: Cart = [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 },
      ];

      expect(getCartTotal(cart)).toBe(3288);
    });
  });

  describe('getCartCount', () => {
    it('should return total count of all items in cart', () => {
      expect(getCartCount([])).toBe(0);

      const cart: Cart = [
        { product: mockProduct1, quantity: 2 },
        { product: mockProduct2, quantity: 1 },
      ];

      expect(getCartCount(cart)).toBe(3);
    });
  });
});
