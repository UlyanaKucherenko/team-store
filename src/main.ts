import './style.css';
import { products } from './data/products.js';
import { renderCatalog } from './ui/renderCatalog.js';
import { createElement } from './ui/createElement.js';

const catalog = createElement('section', 'catalog');
document.body.append(catalog);

renderCatalog(catalog, products);
