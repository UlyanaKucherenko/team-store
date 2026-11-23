import { addToCart, incQuantity, decQuantity, removeFromCart } from '../core/cart/index.js';
import { applyPromoCode } from '../core/cart/promo.js';
import { loadCart, saveCart } from './cartStorage.js';
import type { Cart, Product } from '../types/types.js';
import type { PromoResult } from '../core/cart/promo.js';

export let cart: Cart = loadCart();

export const addProductToCart = (product: Product): void => {
  cart = addToCart(cart, product);
  saveCart(cart);
};

export const incCartProduct = (id: number): void => {
  cart = incQuantity(cart, id);
  saveCart(cart);
};
export const decCartProduct = (id: number): void => {
  cart = decQuantity(cart, id);
  saveCart(cart);
};
export const removeCartProduct = (id: number): void => {
  cart = removeFromCart(cart, id);
  saveCart(cart);
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
