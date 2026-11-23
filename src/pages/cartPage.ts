import { createElement } from '../ui/createElement.js';
import { createCartList } from '../ui/cart/cartList.js';
import type { CartItemActions } from '../ui/cart/cartItem.js';
import { createCartPromo } from '../ui/cart/cartPromo.js';
import { createCartSummary } from '../ui/cart/cartSummary.js';
import { getCartTotal } from '../core/cart/index.js';
import {
  cart,
  incCartProduct,
  decCartProduct,
  removeCartProduct,
  discountPercent,
} from '../state/cartState.js';

export function renderCartPage(container: HTMLElement): void {
  function update(): void {
    container.replaceChildren();

    const cartSection = createElement('section', 'cart');
    const heading = createElement('h1', 'cart__title', 'Shopping Cart');
    cartSection.append(heading);

    let content: HTMLElement;

    if (cart.length === 0) {
      content = createElement('p', 'cart__empty', 'Your shopping cart is empty');
    } else {
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
      content = createCartList(cart, actions);
    }

    const promoBlock = createCartPromo(update);
    const summaryBlock = createCartSummary(getCartTotal(cart), discountPercent);

    cartSection.append(content, promoBlock, summaryBlock);
    container.append(cartSection);
  }
  update();
}
