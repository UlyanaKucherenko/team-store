import { createProductCard } from '../catalog/productCard.js';
import type { Product } from '../../types/types.js';
import { createElement } from '../createElement.js';

export function renderCatalog(container: HTMLElement, products: Product[]): void {
  if (products.length === 0) {
    container.replaceChildren(createElement('p', 'catalog_empty', 'Nothing found'));
    return;
  }
  const cards = products.map((product) => createProductCard(product));
  container.replaceChildren(...cards);
}
