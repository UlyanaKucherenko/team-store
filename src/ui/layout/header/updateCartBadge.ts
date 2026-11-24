export function updateCartBadge(count: number): void {
  const badge = document.querySelector<HTMLElement>('.nav__cart-badge');

  if (!badge) return;

  if (count > 0) {
    badge.textContent = String(count);
    badge.style.display = 'inline-flex';
  } else {
    badge.textContent = '';
    badge.style.display = 'none';
  }
}
