import type { FilterOptions, Product } from '../../types/types.js';

export function filterProducts(products: Product[], options: FilterOptions): Product[] {
  return products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(options.query.trim().toLowerCase());

    const matchesCategory = options.category === 'all' || product.category === options.category;

    const matchesMin = options.minPrice === null || product.price >= options.minPrice;

    const matchesMax = options.maxPrice === null || product.price <= options.maxPrice;

    return matchesName && matchesCategory && matchesMin && matchesMax;
  });
}
