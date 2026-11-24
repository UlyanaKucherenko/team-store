export const DEFAULT_PAGE_SIZE = 6;

export function isCategoryAll(category: string): boolean {
  return category === 'all';
}

export function getVisibleProducts<T>(items: T[], isCategoryAll: boolean, limit: number): T[] {
  if (!isCategoryAll) {
    return items;
  }
  return items.slice(0, limit);
}

export function hasMoreProducts(
  totalCount: number,
  currentVisibleCount: number,
  isCategoryAll: boolean,
): boolean {
  if (!isCategoryAll) {
    return false;
  }
  return currentVisibleCount < totalCount;
}
