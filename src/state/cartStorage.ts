import type { Cart } from '../types/types.js';

const STORAGE_KEY = 'maroon-store:cart';
const PROMO_KEY = 'maroon-store:promo';

export function saveCart(cart: Cart): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAppliedPromo(promo: string | null): void {
  if (promo) {
    localStorage.setItem(PROMO_KEY, promo);
  } else {
    localStorage.removeItem(PROMO_KEY);
  }
}

export function loadAppliedPromo(): string | null {
  try {
    return localStorage.getItem(PROMO_KEY);
  } catch {
    return null;
  }
}
