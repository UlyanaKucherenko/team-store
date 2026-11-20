import { createElement } from '../ui/createElement.js';
import { formatPrice } from '../ui/formatPrice.js';
import { createCartList } from '../ui/cart/cartList.js';
import { getCartTotal, incQuantity, decQuantity, removeFromCart } from '../core/cart/index.js';
import { products } from '../data/products.js';
import type { Cart } from '../types/types.js';
import type { CartItemActions } from '../ui/cart/cartItem.js';

let cart: Cart = [{ product: products[0], quantity: 1 }];

export function renderCartPage(container: HTMLElement): void {
  function update(): void {
    container.replaceChildren();

    const cartSection = createElement('section', 'cart');
    const heading = createElement('h1', 'cart__title', 'Shopping Cart');
    cartSection.append(heading);

    if (cart.length === 0) {
      const emptyMsg = createElement('p', 'cart__empty', 'Your shopping cart is empty');
      const total = createElement('p', 'cart__total', `Total: ${formatPrice(0)}`);

      cartSection.append(emptyMsg, total);
      container.append(cartSection);
      return;
    }

    const actions: CartItemActions = {
      onIncrement: (id) => {
        cart = incQuantity(cart, id);
        update();
      },
      onDecrement: (id) => {
        cart = decQuantity(cart, id);
        update();
      },
      onRemove: (id) => {
        cart = removeFromCart(cart, id);
        update();
      },
    };

    const list = createCartList(cart, actions);
    const total = createElement('p', 'cart__total', `Total: ${formatPrice(getCartTotal(cart))}`);

    cartSection.append(list, total);
    container.append(cartSection);
  }
  update();
}
