export function updateActiveNavLink(currentHash: string): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('.nav__link');
  links.forEach((link) => {
    const isActive = link.dataset.route === currentHash;
    link.classList.toggle('nav__link--active', isActive);
  });
}
