import { createElement } from '../createElement.js';
import { createHeader } from './header/header.js';

export function createMainLayout() {
  const header = createHeader();
  const main = createElement('main', 'main-content container');

  return { header, main };
}
