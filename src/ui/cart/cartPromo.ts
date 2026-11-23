import { createElement } from '../createElement.js';
import { appliedPromo, discountPercent, applyCartPromo } from '../../state/cartState.js';

export function createCartPromo(onApplySuccess: () => void): HTMLElement {
  const promoBlock = createElement('div', 'cart__promo');

  const promoInput = createElement('input', 'cart__promo-input') as HTMLInputElement;
  promoInput.type = 'text';
  promoInput.placeholder = '(e.g. SALE10)';

  const promoBtn = createElement('button', 'cart__promo-btn', 'Apply');
  promoBtn.type = 'button';

  const promoMsg = createElement('p', 'cart__promo-msg');
  if (appliedPromo) {
    promoInput.value = appliedPromo;
    promoMsg.textContent = `Promo code ${appliedPromo} applied (-${discountPercent}%)`;
    promoMsg.className = 'cart__promo-msg cart__promo-msg--success';
  }

  promoBtn.addEventListener('click', () => {
    const code = promoInput.value.trim();
    if (!code) return;

    const result = applyCartPromo(code);
    if (result.isValid) {
      onApplySuccess();
    } else {
      promoMsg.textContent = result.error || 'Invalid promo code';
      promoMsg.className = 'cart__promo-msg cart__promo-msg--error';

      setTimeout(() => {
        if (appliedPromo) {
          promoMsg.textContent = `Promo code ${appliedPromo} applied (-${discountPercent}%)`;
          promoMsg.className = 'cart__promo-msg cart__promo-msg--success';
        } else {
          promoMsg.textContent = '';
        }
      }, 3000);
    }
  });

  promoBlock.append(promoInput, promoBtn, promoMsg);
  return promoBlock;
}
