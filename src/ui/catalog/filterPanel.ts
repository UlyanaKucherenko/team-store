import { createElement } from '../createElement.js';
import { initialFilterState } from '../../core/catalogProducts/filterState.js';
import type { FilterPanelState, ProductCategory, SortMode } from '../../types/types.js';

function parsePrice(value: string): number | null {
  if (value.trim() === '') return null;
  const dollars = Number(value);
  return Number.isNaN(dollars) || dollars < 0 ? null : Math.round(dollars * 100);
}

export function createFilterPanel(
  categories: ProductCategory[],
  onChange: (state: FilterPanelState) => void,
  startState: FilterPanelState = initialFilterState,
): HTMLElement {
  let state: FilterPanelState = { ...startState };

  const panel = createElement('form', 'filter-panel');
  panel.addEventListener('submit', (event) => event.preventDefault());

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = 'Search';
  searchInput.setAttribute('aria-label', 'Search products');

  const categorySelect = document.createElement('select');
  categorySelect.setAttribute('aria-label', 'Category');
  categorySelect.append(new Option('All categories', 'all'));
  categories.forEach((category) => categorySelect.append(new Option(category, category)));

  const minInput = document.createElement('input');
  minInput.type = 'number';
  minInput.min = '0';
  minInput.placeholder = 'From, $';
  minInput.setAttribute('aria-label', 'Minimum price');

  const maxInput = document.createElement('input');
  maxInput.type = 'number';
  maxInput.min = '0';
  maxInput.placeholder = 'To, $';
  maxInput.setAttribute('aria-label', 'Maximum price');

  const sortSelect = document.createElement('select');
  sortSelect.setAttribute('aria-label', 'Sort');
  sortSelect.append(
    new Option('Default order', 'default'),
    new Option('Price: low to high', 'asc'),
    new Option('Price: high to low', 'desc'),
  );

  const resetButton = createElement('button', 'filter-panel_reset', 'Reset');
  resetButton.setAttribute('type', 'button');

  const update = (patch: Partial<FilterPanelState>): void => {
    state = { ...state, ...patch };
    onChange(state);
  };

  searchInput.addEventListener('input', () => update({ query: searchInput.value }));
  categorySelect.addEventListener('change', () => update({ category: categorySelect.value }));
  minInput.addEventListener('input', () => update({ minPrice: parsePrice(minInput.value) }));
  maxInput.addEventListener('input', () => update({ maxPrice: parsePrice(maxInput.value) }));
  sortSelect.addEventListener('change', () => update({ sort: sortSelect.value as SortMode }));

  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = 'all';
    minInput.value = '';
    maxInput.value = '';
    sortSelect.value = 'default';
    state = { ...initialFilterState };
    onChange(state);
  });

  searchInput.value = state.query;
  categorySelect.value = state.category;
  minInput.value = state.minPrice === null ? '' : String(state.minPrice / 100);
  maxInput.value = state.maxPrice === null ? '' : String(state.maxPrice / 100);
  sortSelect.value = state.sort;

  panel.append(searchInput, categorySelect, minInput, maxInput, sortSelect, resetButton);

  return panel;
}
