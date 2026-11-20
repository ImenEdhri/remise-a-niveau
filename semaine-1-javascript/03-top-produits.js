const products = [
  { name: "Café", category: "Boissons", price: 2.5 },
  { name: "Croissant", category: "Viennoiseries", price: 1.2 },
  { name: "Jus d'orange", category: "Boissons", price: 3.0 },
  { name: "Pain au chocolat", category: "Viennoiseries", price: 1.4 },
  { name: "Sandwich", category: "Salé", price: 5.5 },
];
function topProducts(products, n) {
  const TopNProducts = products
    .sort((a, b) => b.price - a.price)
    .slice(0, n)
    .map((item) => item.name);
  console.log(TopNProducts);
}
topProducts(products, 3);
// opProducts(products, 2) → ["Sandwich", "Jus d'orange"]
