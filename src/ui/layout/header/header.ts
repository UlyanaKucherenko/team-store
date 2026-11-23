import { createElement } from '../../createElement.js';
import { NAV_ITEMS } from './consts.js';

export function createHeader(): HTMLElement {
  const header = createElement('header', 'header container');

  const logo = createElement('a', 'header__logo', 'MAROON');
  logo.href = '#/about';

  const nav = createElement('nav', 'nav');
  const navList = createElement('ul', 'nav__list');

  const navLinks = NAV_ITEMS.map((item) => {
    const li = createElement('li', 'nav__item');
    const a = createElement('a', 'nav__link', item.label);
    a.href = item.href;
    a.dataset.route = item.href;
    li.append(a);
    return li;
  });

  navList.append(...navLinks);
  nav.append(navList);
  header.append(logo, nav);

  return header;
}
