import { createElement } from '../createElement.js';
import { formatPrice } from '../../utils/formatPrice.js';
import { calculateDiscount, calculateFinalTotal } from '../../core/cart/index.js';

export function createCartSummary(total: number, discountPercent: number): HTMLElement {
  const summaryBlock = createElement('div', 'cart__summary');

  if (discountPercent > 0) {
    const discount = calculateDiscount(total, discountPercent);
    const finalTotal = calculateFinalTotal(total, discountPercent);

    const oldTotal = createElement('p', 'cart__total cart__total--old');
    oldTotal.innerHTML = `Total: <del>${formatPrice(total)}</del>`;

    const discountP = createElement(
      'p',
      'cart__discount',
      `Discount (${discountPercent}%): -${formatPrice(discount)}`,
    );

    const finalTotalP = createElement(
      'p',
      'cart__total cart__total--final',
      `Final Total: ${formatPrice(finalTotal)}`,
    );

    summaryBlock.append(oldTotal, discountP, finalTotalP);
  } else {
    const totalP = createElement('p', 'cart__total', `Total: ${formatPrice(total)}`);
    summaryBlock.append(totalP);
  }

  return summaryBlock;
}
