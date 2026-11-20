import { createElement } from '../createElement.js';
import { createCartItem } from './cartItem.js';
import type { CartItemActions } from './cartItem.js';
import type { Cart } from '../../types/types.js';

export function createCartList(cart: Cart, actions: CartItemActions): HTMLElement {
  const list = createElement('div', 'cart__list');
  const itemElements = cart.map((item) => createCartItem(item, actions));
  list.append(...itemElements);
  return list;
}
