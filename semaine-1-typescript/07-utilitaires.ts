import { Product } from "./02-produit.js";

export function toPreview(product: Product): Pick<Product, "name" | "price"> {
  return {
    name: product.name,
    price: product.price,
  };
}

export function updateProduct(
  product: Product,
  changes: Partial<Omit<Product, "id">>,
): Product {
  return {
    ...product,
    ...changes,
  };
}
