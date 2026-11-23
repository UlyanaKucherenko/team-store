import type { Cart } from '../types/types.js';

const STORAGE_KEY = 'maroon-store:cart';

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
