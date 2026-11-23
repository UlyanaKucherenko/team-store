import { describe, expect, it } from 'vitest';
import { applyPromoCode } from '../src/core/cart/promo.js';
import { calculateDiscount, calculateFinalTotal } from '../src/core/cart/index.js';

describe('Promo code logic', () => {
  it('SALE10 gives 10% discount on total cost', () => {
    const result = applyPromoCode('SALE10');

    expect(result.isValid).toBe(true);
    expect(result.discountPercent).toBe(10);
    expect(calculateFinalTotal(1000, result.discountPercent)).toBe(900);
  });

  it('unknown code does not apply discount and returns an error', () => {
    const result = applyPromoCode('UNKNOWN');

    expect(result.isValid).toBe(false);
    expect(result.discountPercent).toBe(0);
    expect(result.error).toBe('Invalid promo code');
  });

  it('re-applying the same code does not accumulate discount', () => {
    const result = applyPromoCode('SALE10', 'SALE10');

    expect(result.isValid).toBe(false);
    expect(result.discountPercent).toBe(10);
    expect(result.error).toBe('Promo code already applied');
  });

  it('empty cart does not break calculation', () => {
    expect(calculateDiscount(0, 10)).toBe(0);
    expect(calculateFinalTotal(0, 10)).toBe(0);
  });
});
