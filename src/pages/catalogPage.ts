import { createElement } from '../ui/createElement.js';
import { createFilterPanel } from '../ui/catalog/filterPanel.js';
import { renderCatalog } from '../ui/catalog/renderCatalog.js';
import { filterProducts } from '../core/catalogProducts/filterProducts.js';
import { sortProducts } from '../core/catalogProducts/sortProducts.js';
import { categories } from '../core/catalogProducts/filterState.js';
import { products } from '../data/products.js';
import type { FilterPanelState } from '../types/types.js';
import { loadFilters, saveFilters } from '../state/filterStorage.js';

export function renderCatalogPage(container: HTMLElement): void {
  const catalog = createElement('section', 'catalog');

  const render = (state: FilterPanelState): void => {
    saveFilters(state);

    const { sort, ...options } = state;
    const filtered = filterProducts(products, options);

    renderCatalog(catalog, sortProducts(filtered, sort));
  };

  const startState = loadFilters();
  const panel = createFilterPanel(categories, render, startState);

  render(startState);
  container.append(panel, catalog);
}
