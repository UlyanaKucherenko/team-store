import { createElement } from '../createElement.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { getCartItemTotal } from '../../core/cart/index.js';
import type { CartItem } from '../../types/types';

export interface CartItemActions {
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export function createCartItem(item: CartItem, actions: CartItemActions): HTMLElement {
  const row = createElement('article', 'cart-item');

  const img = createElement('img', 'cart-item__image');
  img.src = item.product.src;
  img.alt = item.product.name;

  const title = createElement('h3', 'cart-item__title', item.product.name);
  const price = createElement('p', 'cart-item__price', `${formatPrice(item.product.price)}`);

  const decBtn = createElement('button', 'cart-item__btn cart-item__btn--dec', '−');
  decBtn.type = 'button';
  decBtn.disabled = item.quantity <= 1;
  decBtn.addEventListener('click', () => actions.onDecrement(item.product.id));

  const quantity = createElement('span', 'cart-item__quantity', String(item.quantity));
  const incBtn = createElement('button', 'cart-item__btn cart-item__btn--inc', '+');
  incBtn.type = 'button';
  incBtn.disabled = item.quantity >= item.product.stock;
  if (incBtn.disabled) incBtn.title = 'Maximum stock reached';
  incBtn.addEventListener('click', () => actions.onIncrement(item.product.id));

  const quantityControl = createElement(
    'div',
    'cart-item__quantity-controls',
    decBtn,
    quantity,
    incBtn,
  );

  const itemTotalPrice = getCartItemTotal(item);
  const lineTotal = createElement('p', 'cart-item__total', formatPrice(itemTotalPrice));

  const removeBtn = createElement('button', 'cart-item__btn-remove', 'Remove');
  removeBtn.type = 'button';
  removeBtn.addEventListener('click', () => actions.onRemove(item.product.id));

  row.append(img, title, price, quantityControl, lineTotal, removeBtn);
  return row;
}
