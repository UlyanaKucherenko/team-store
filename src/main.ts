import './style.css';
import { products } from './data/products.js';
import { renderCatalog } from './ui/renderCatalog.js';
import { createElement } from './ui/createElement.js';
import { renderCartPage } from './pages/cartPage.js';
import { renderSortButtons } from './ui/renderSortButtons.js';
import type { SortMode } from './types/types.js';
import { sortProducts } from './core/sortProducts.js';

const cartContainer = createElement('div', 'cart-page');
const sortContainer = createElement('div', 'sort-container');
const catalog = createElement('section', 'catalog');

document.body.append(cartContainer, sortContainer, catalog);

renderCartPage(cartContainer);

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
