import type { Cart, Product } from '../types/types.js';
import { addToCart } from '../core/cart/index.js';

export let cart: Cart = [];

export const addProductToCart = (product: Product): void => {
  cart = addToCart(cart, product);
};
