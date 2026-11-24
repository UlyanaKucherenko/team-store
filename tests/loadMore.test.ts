import { describe, expect, it } from 'vitest';
import {
  isCategoryAll,
  getVisibleProducts,
  hasMoreProducts,
} from '../src/core/catalogProducts/loadMore.js';

describe('Catalog load more logic', () => {
  it('checks if category is "all"', () => {
    expect(isCategoryAll('all')).toBe(true);
    expect(isCategoryAll('Mono Bouquets')).toBe(false);
    expect(isCategoryAll('Floral Arrangements')).toBe(false);
  });

  it('returns limited slice when category is all, and all items when category is specific', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(getVisibleProducts(items, true, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(getVisibleProducts(items, false, 6)).toEqual(items);
  });

  it('checks if more products are available to load', () => {
    expect(hasMoreProducts(14, 6, true)).toBe(true);
    expect(hasMoreProducts(14, 12, true)).toBe(true);
    expect(hasMoreProducts(14, 18, true)).toBe(false);
    expect(hasMoreProducts(14, 6, false)).toBe(false);
  });
});
