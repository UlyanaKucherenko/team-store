import type { Product, SortMode } from '../types/types';

export function sortProducts(products: Product[], mode: SortMode = 'default'): Product[] {
  if (mode === 'default') {
    return [...products];
  }
  const multiplier = mode === 'desc' ? -1 : 1;
  return [...products].sort((first, second) => (first.price - second.price) * multiplier);
}
