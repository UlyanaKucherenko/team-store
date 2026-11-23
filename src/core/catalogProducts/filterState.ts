import type { FilterPanelState, ProductCategory } from '../../types/types.js';

export const categories: ProductCategory[] = [
  'Mono Bouquets',
  'Floral Arrangements',
  'Indoor Plants',
];

export const initialFilterState: FilterPanelState = {
  query: '',
  category: 'all',
  minPrice: null,
  maxPrice: null,
  sort: 'default',
};
