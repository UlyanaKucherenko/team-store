import { describe, test, expect } from 'vitest';
import { filterProducts } from '../src/core/catalogProducts/filterProducts.js';
import type { FilterOptions, Product } from '../src/types/types.js';

const products: Product[] = [
  {
    id: 1,
    name: 'Roses',
    price: 1000,
    currency: 'USD',
    category: 'Mono Bouquets',
    src: '',
    inStock: true,
    stock: 5,
    description: '',
  },
  {
    id: 2,
    name: 'Peonies',
    price: 1500,
    currency: 'USD',
    category: 'Mono Bouquets',
    src: '',
    inStock: true,
    stock: 5,
    description: '',
  },
  {
    id: 3,
    name: 'Monstera',
    price: 2000,
    currency: 'USD',
    category: 'Indoor Plants',
    src: '',
    inStock: true,
    stock: 5,
    description: '',
  },
];

const noFilters: FilterOptions = {
  query: '',
  category: 'all',
  minPrice: null,
  maxPrice: null,
};

const names = (list: Product[]): string[] => list.map((product) => product.name);

describe('filterProducts', () => {
  test('returns all products when no filters are set', () => {
    expect(names(filterProducts(products, noFilters))).toEqual(['Roses', 'Peonies', 'Monstera']);
  });

  test('searches by part of the name, ignoring case', () => {
    expect(names(filterProducts(products, { ...noFilters, query: 'ROS' }))).toEqual(['Roses']);
  });

  test('does not limit the result for an empty search string', () => {
    expect(filterProducts(products, { ...noFilters, query: '   ' })).toHaveLength(3);
  });

  test('filters by a specific category', () => {
    expect(names(filterProducts(products, { ...noFilters, category: 'Indoor Plants' }))).toEqual([
      'Monstera',
    ]);
  });

  test('shows all categories for "all"', () => {
    expect(filterProducts(products, { ...noFilters, category: 'all' })).toHaveLength(3);
  });

  test('includes the minimum price itself', () => {
    expect(names(filterProducts(products, { ...noFilters, minPrice: 1500 }))).toEqual([
      'Peonies',
      'Monstera',
    ]);
  });

  test('includes the maximum price itself', () => {
    expect(names(filterProducts(products, { ...noFilters, maxPrice: 1500 }))).toEqual([
      'Roses',
      'Peonies',
    ]);
  });
});
