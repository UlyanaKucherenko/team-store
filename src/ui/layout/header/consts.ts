export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'About Us', href: '#/about' },
  { label: 'Catalog', href: '#/catalog' },
  { label: 'Cart', href: '#/cart' },
];
