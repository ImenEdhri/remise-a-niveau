import { Category, Product } from "./02-produit.js";

export function countByCategory(products: Product[]): Record<Category, number> {
  const counts: Record<Category, number> = {
    Boissons: 0,
    Viennoiseries: 0,
    Salé: 0,
  };
  for (const product of products) {
    counts[product.category]++;
  }

  return counts;
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]{
    return obj[key]
}
