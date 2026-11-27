export type Category = "Boissons" | "Viennoiseries" | "Salé";

export interface Product {
  readonly id: number;
  name: string;
  category: Category;
  price: number;
  stock?: number;
}

function isAvailable(product: Product): boolean {
  return product.stock === undefined || product.stock > 0;
}
