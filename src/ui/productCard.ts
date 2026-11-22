import type { Product } from '../types/types';
import { createElement } from './createElement.js';
import { formatPrice } from './formatPrice.js';
import { addProductToCart } from '../state/cartState.js';

export function createProductCard(product: Product): HTMLElement {
  const card = createElement('article', 'card');

  const image = createElement('img', 'card_image');
  image.src = product.src;
  image.alt = product.name;

  const title = createElement('h2', 'card_title', product.name);
  const price = createElement('p', 'card_price', formatPrice(product.price));
  const description = createElement('p', 'description', product.description);
  const inStock = createElement(
    'p',
    product.inStock ? 'card_stock card_stock_in' : 'card_stock card_stock_out',
    product.inStock ? 'In Stock' : 'Out of Stock',
  );
  const addBtn = createElement('button', 'addBtn', 'Add');
  addBtn.type = 'button';
  addBtn.disabled = !product.inStock;

  addBtn.addEventListener('click', () => {
    addProductToCart(product);
  });

  card.append(image, title, price, description, inStock, addBtn);
  return card;
}
