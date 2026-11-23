import { createElement } from '../ui/createElement.js';
import { formatPrice } from '../utils/formatPrice.js';
import { createCartList } from '../ui/cart/cartList.js';
import { getCartTotal } from '../core/cart/index.js';
import { cart, incCartProduct, decCartProduct, removeCartProduct } from '../state/cartState.js';
import type { CartItemActions } from '../ui/cart/cartItem.js';

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
        incCartProduct(id);
        update();
      },
      onDecrement: (id) => {
        decCartProduct(id);
        update();
      },
      onRemove: (id) => {
        removeCartProduct(id);
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
