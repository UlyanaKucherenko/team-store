import type { Cart, Product } from '../types/types.js';
import { addToCart, incQuantity, decQuantity, removeFromCart } from '../core/cart/index.js';

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
