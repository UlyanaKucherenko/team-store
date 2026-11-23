export const PROMO_CODES: Record<string, number> = {
  SALE10: 10,
};

export interface PromoResult {
  isValid: boolean;
  discountPercent: number;
  error?: string;
}

export function applyPromoCode(code: string, currentCode: string | null = null): PromoResult {
  const normalized = code.trim();

  if (normalized !== 'SALE10') {
    return {
      isValid: false,
      discountPercent: 0,
      error: 'Invalid promo code',
    };
  }

  if (currentCode && currentCode.trim() === normalized) {
    return {
      isValid: false,
      discountPercent: PROMO_CODES['SALE10'],
      error: 'Promo code already applied',
    };
  }

  return {
    isValid: true,
    discountPercent: 10,
  };
}
