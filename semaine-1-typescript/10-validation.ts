import { Product } from "./02-produit.js";

export function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    (obj.category === "Boissons" ||
      obj.category === "Viennoiseries" ||
      obj.category === "Salé") &&
    typeof obj.price === "number" &&
    obj.price >= 0 &&
    (obj.stock === undefined || typeof obj.stock === "number")
  );
}

export function parseProducts(json: string): Product[] {
  try {
    const data: unknown = JSON.parse(json);
    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(isProduct);
  } catch (error) {
    return [];
  }
}
