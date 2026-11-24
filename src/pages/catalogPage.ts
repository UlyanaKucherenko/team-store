import { createElement } from '../ui/createElement.js';
import { createFilterPanel } from '../ui/catalog/filterPanel.js';
import { renderCatalog } from '../ui/catalog/renderCatalog.js';
import { filterProducts } from '../core/catalogProducts/filterProducts.js';
import { sortProducts } from '../core/catalogProducts/sortProducts.js';
import { categories } from '../core/catalogProducts/filterState.js';
import {
  DEFAULT_PAGE_SIZE,
  isCategoryAll,
  getVisibleProducts,
  hasMoreProducts,
} from '../core/catalogProducts/loadMore.js';
import { products } from '../data/products.js';
import type { FilterPanelState, Product } from '../types/types.js';
import { loadFilters, saveFilters } from '../state/filterStorage.js';

export function renderCatalogPage(container: HTMLElement): void {
  const catalog = createElement('section', 'catalog');
  let visibleCount = DEFAULT_PAGE_SIZE;
  let currentProducts: Product[] = [];
  let currentCategory = 'all';

  const loadMoreBtn = createElement(
    'button',
    'catalog__load-more',
    'Show more',
  ) as HTMLButtonElement;
  loadMoreBtn.type = 'button';

  const updateView = (): void => {
    const isAll = isCategoryAll(currentCategory);
    const visible = getVisibleProducts(currentProducts, isAll, visibleCount);

    renderCatalog(catalog, visible);

    if (hasMoreProducts(currentProducts.length, visibleCount, isAll)) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  };

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += DEFAULT_PAGE_SIZE;
    updateView();
  });

  const render = (state: FilterPanelState): void => {
    saveFilters(state);

    const { sort, ...options } = state;
    currentCategory = state.category;
    visibleCount = DEFAULT_PAGE_SIZE;

    const filtered = filterProducts(products, options);
    currentProducts = sortProducts(filtered, sort);

    updateView();
  };

  const startState = loadFilters();
  const panel = createFilterPanel(categories, render, startState);

  render(startState);
  container.append(panel, catalog, loadMoreBtn);
}
