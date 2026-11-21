import { products } from '../data/products.js';
import { renderCatalog } from '../ui/renderCatalog.js';
import { createElement } from '../ui/createElement.js';
import { renderCartPage } from '../pages/cartPage.js';
import { updateActiveNavLink } from '../ui/layout/header/updateActiveNavLink.js';
import { renderSortButtons } from '../ui/renderSortButtons.js';
import { sortProducts } from '../core/sortProducts.js';
import type { SortMode } from '../types/types.js';

type PageRenderer = (container: HTMLElement) => void;

const ROUTES: Record<string, PageRenderer> = {
  '#/about': (container) => {
    const about = createElement('section', 'about');
    about.append(createElement('h1', 'about__title', 'About Us'));
    container.append(about);
  },
  '#/catalog': (container) => {
    const sortContainer = createElement('div', 'sort-container');
    const catalog = createElement('section', 'catalog');
    container.append(sortContainer, catalog);

    let currentMode: SortMode = 'default';
    const render = (): void => {
      renderSortButtons(sortContainer, currentMode, (mode) => {
        currentMode = mode;
        render();
      });
      catalog.replaceChildren();
      renderCatalog(catalog, sortProducts(products, currentMode));
    };
    render();
  },
  '#/cart': (container) => renderCartPage(container),
};

export function initRouter(main: HTMLElement): void {
  function onRouteChange(): void {
    const hash = window.location.hash || '#/about';

    updateActiveNavLink(hash);
    main.replaceChildren();
    const renderPage = ROUTES[hash] ?? ROUTES['#/about'];

    renderPage(main);
  }

  window.addEventListener('hashchange', onRouteChange);
  onRouteChange();
}
