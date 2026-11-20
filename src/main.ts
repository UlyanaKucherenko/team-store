import './style.css';
import { products } from './data/products.js';
import { renderCatalog } from './ui/renderCatalog.js';
import { createElement } from './ui/createElement.js';
import { renderCartPage } from './pages/cartPage.js';

const cartContainer = createElement('div', 'cart-page');
document.body.append(cartContainer);

renderCartPage(cartContainer);

const catalog = createElement('section', 'catalog');
document.body.append(catalog);

renderCatalog(catalog, products);
