import {
  addToCart,
  incQuantity,
  decQuantity,
  removeFromCart,
  getCartCount,
} from '../core/cart/index.js';
import { applyPromoCode, PROMO_CODES } from '../core/cart/promo.js';
import { loadCart, saveCart, loadAppliedPromo, saveAppliedPromo } from './cartStorage.js';
import type { Cart, Product } from '../types/types.js';
import type { PromoResult } from '../core/cart/promo.js';
import { updateCartBadge } from '../ui/layout/header/updateCartBadge.js';

export let cart: Cart = loadCart();

export const addProductToCart = (product: Product): void => {
  cart = addToCart(cart, product);
  saveCart(cart);
  updateCartBadge(getCartCount(cart));
};

export const incCartProduct = (id: number): void => {
  cart = incQuantity(cart, id);
  saveCart(cart);
  updateCartBadge(getCartCount(cart));
};
export const decCartProduct = (id: number): void => {
  cart = decQuantity(cart, id);
  saveCart(cart);
  updateCartBadge(getCartCount(cart));
};
export const removeCartProduct = (id: number): void => {
  cart = removeFromCart(cart, id);
  saveCart(cart);
  updateCartBadge(getCartCount(cart));
};

const savedPromo = loadAppliedPromo();

export let appliedPromo: string | null =
  savedPromo && savedPromo in PROMO_CODES ? savedPromo : null;
export let discountPercent = appliedPromo ? PROMO_CODES[appliedPromo] : 0;

export const applyCartPromo = (code: string): PromoResult => {
  const result = applyPromoCode(code, appliedPromo);
  if (result.isValid) {
    appliedPromo = code.trim().toUpperCase();
    discountPercent = result.discountPercent;
    saveAppliedPromo(appliedPromo);
  }
  return result;
};
