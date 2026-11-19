import { createProductCard } from './productCard.js';
import type { Product } from '../types/types.js';

export function renderCatalog(container: HTMLElement, products: Product[]): void {
  const cards = products.map((product) => createProductCard(product));
  container.replaceChildren(...cards);
}
