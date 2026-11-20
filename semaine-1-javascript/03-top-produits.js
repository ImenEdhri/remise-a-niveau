const products = [
  { name: "Café", category: "Boissons", price: 2.5 },
  { name: "Croissant", category: "Viennoiseries", price: 1.2 },
  { name: "Jus d'orange", category: "Boissons", price: 3.0 },
  { name: "Pain au chocolat", category: "Viennoiseries", price: 1.4 },
  { name: "Sandwich", category: "Salé", price: 5.5 },
];
export function topProducts(products, n) {
  let localProducts = [...products];
  const TopNProducts = localProducts
    .sort((a, b) => b.price - a.price)

    .map((item) => item.name)
    .slice(0, n);
  console.log(TopNProducts);
  return TopNProducts;
}
// topProducts(products, 3);
