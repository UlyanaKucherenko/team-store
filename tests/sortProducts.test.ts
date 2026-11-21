import { describe, test, expect } from 'vitest';
import { sortProducts } from '../src/core/sortProducts.js';
import type { Product } from '../src/types/types.js';

const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  name: 'Test product',
  price: 1000,
  currency: 'USD',
  category: 'Mono Bouquets',
  src: 'image.jpg',
  inStock: true,
  stock: 10,
  description: 'Description',
  ...overrides,
});

const cheap = createProduct({ id: 1, name: 'Cheap', price: 1000 });
const medium = createProduct({ id: 2, name: 'Medium', price: 2500 });
const expensive = createProduct({ id: 3, name: 'Expensive', price: 4000 });

const unsorted = [medium, expensive, cheap];

const getIds = (products: Product[]): number[] => products.map((product) => product.id);

describe('sortProducts', () => {
  describe('mode: asc', () => {
    test('sorts products from cheapest to most expensive', () => {
      const result = sortProducts(unsorted, 'asc');

      expect(getIds(result)).toEqual([1, 2, 3]);
    });
  });

  describe('mode: desc', () => {
    test('sorts products from most expensive to cheapest', () => {
      const result = sortProducts(unsorted, 'desc');

      expect(getIds(result)).toEqual([3, 2, 1]);
    });
  });

  describe('mode: default', () => {
    test('keeps the original order', () => {
      const result = sortProducts(unsorted, 'default');

      expect(getIds(result)).toEqual([2, 3, 1]);
    });

    test('is used when mode is not passed', () => {
      const result = sortProducts(unsorted);

      expect(getIds(result)).toEqual([2, 3, 1]);
    });

    test('returns a new array, not the same reference', () => {
      const result = sortProducts(unsorted, 'default');

      expect(result).not.toBe(unsorted);
    });
  });

  describe('immutability', () => {
    test.each(['asc', 'desc', 'default'] as const)('does not mutate the original array', (mode) => {
      const original = [medium, expensive, cheap];

      sortProducts(original, mode);

      expect(getIds(original)).toEqual([2, 3, 1]);
    });
  });
});
