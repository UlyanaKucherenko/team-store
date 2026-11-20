import './style.css';
import { products } from './data/products.js';
import { renderCatalog } from './ui/renderCatalog.js';
import { createElement } from './ui/createElement.js';
import { renderCartPage } from './pages/cartPage.js';
import { createMainLayout } from './ui/layout/mainLayout.js';
import { updateActiveNavLink } from './ui/layout/header/updateActiveNavLink.js';

const app = document.querySelector<HTMLDivElement>('#app') ?? document.body;
const { header, main } = createMainLayout();

app.replaceChildren(header, main);

type PageRenderer = (container: HTMLElement) => void;
const ROUTES: Record<string, PageRenderer> = {
  '#/about': (container) => {
    const about = createElement('section', 'about');
    about.append(createElement('h1', 'about__title', 'About Us'));
    container.append(about);
  },
  '#/catalog': (container) => {
    const catalog = createElement('section', 'catalog');
    container.append(catalog);
    renderCatalog(catalog, products);
  },
  '#/cart': (container) => renderCartPage(container),
};

function onRouteChange(): void {
  const hash = window.location.hash || '#/about';

  updateActiveNavLink(hash);
  main.replaceChildren();
  const renderPage = ROUTES[hash] ?? ROUTES['#/about'];

  renderPage(main);
}

window.addEventListener('hashchange', onRouteChange);
onRouteChange();
