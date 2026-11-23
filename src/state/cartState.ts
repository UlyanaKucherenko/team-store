import type { Cart, Product } from '../types/types.js';
import { addToCart, incQuantity, decQuantity, removeFromCart } from '../core/cart/index.js';
import { applyPromoCode } from '../core/cart/promo.js';
import type { PromoResult } from '../core/cart/promo.js';

export let cart: Cart = [];

export const addProductToCart = (product: Product): void => {
  cart = addToCart(cart, product);
};

export const incCartProduct = (id: number): void => {
  cart = incQuantity(cart, id);
};
export const decCartProduct = (id: number): void => {
  cart = decQuantity(cart, id);
};
export const removeCartProduct = (id: number): void => {
  cart = removeFromCart(cart, id);
};

export let appliedPromo: string | null = null;
export let discountPercent = 0;

export const applyCartPromo = (code: string): PromoResult => {
  const result = applyPromoCode(code, appliedPromo);
  if (result.isValid) {
    appliedPromo = code.trim().toUpperCase();
    discountPercent = result.discountPercent;
  }
  return result;
};
