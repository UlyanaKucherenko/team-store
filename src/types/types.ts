export type ProductCategory = 'Mono Bouquets' | 'Floral Arrangements' | 'Indoor Plants';

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: 'USD';
  category: ProductCategory;
  src: string;
  inStock: boolean;
  stock: number;
  description?: string;
}
