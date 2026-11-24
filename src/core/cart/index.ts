import type { Cart, CartItem, Product } from '../../types/types';

export const getProductQuantity = (cart: Cart, productId: number): number =>
  cart.find((i) => i.product.id === productId)?.quantity ?? 0;

export const canAddMore = (product: Product, quantity: number): boolean =>
  product.inStock && quantity < product.stock;

export const addToCart = (cart: Cart, product: Product): Cart => {
  const isExisting = cart.some((item: CartItem) => item.product.id === product.id);

  if (isExisting) {
    return incQuantity(cart, product.id);
  }

  if (!canAddMore(product, 0)) {
    return cart;
  }

  return [...cart, { product, quantity: 1 }];
};

export const incQuantity = (cart: Cart, productId: number): Cart => {
  return cart.map((item: CartItem) => {
    if (item.product.id !== productId) {
      return item;
    }
    if (!canAddMore(item.product, item.quantity)) {
      return item;
    }
    return { ...item, quantity: item.quantity + 1 };
  });
};

export const decQuantity = (cart: Cart, productId: number): Cart => {
  return cart.map((item) => {
    if (item.product.id !== productId) {
      return item;
    }
    const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
    return { ...item, quantity: newQuantity };
  });
};

export const removeFromCart = (cart: Cart, productId: number): Cart => {
  return cart.filter((item: CartItem) => item.product.id !== productId);
};

export const getCartItemTotal = (item: CartItem): number => {
  return item.product.price * item.quantity;
};

export const getCartTotal = (cart: Cart): number => {
  return cart.reduce((total, item) => total + getCartItemTotal(item), 0);
};

export const calculateDiscount = (total: number, discountPercent: number): number => {
  if (total <= 0 || discountPercent <= 0) return 0;
  return Math.round((total * discountPercent) / 100);
};

export const calculateFinalTotal = (total: number, discountPercent: number): number => {
  if (total <= 0) return 0;
  return total - calculateDiscount(total, discountPercent);
};
