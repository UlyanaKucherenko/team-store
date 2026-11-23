import { renderCartPage } from '../pages/cartPage.js';
import { updateActiveNavLink } from '../ui/layout/header/updateActiveNavLink.js';
import { renderCatalogPage } from '../pages/catalogPage.js';
import { renderAboutPage } from '../pages/aboutPage.js';

type PageRenderer = (container: HTMLElement) => void;

const ROUTES: Record<string, PageRenderer> = {
  '#/about': (container) => renderAboutPage(container),
  '#/catalog': (container) => renderCatalogPage(container),
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
