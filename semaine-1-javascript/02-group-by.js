const products = [
  { name: "Café", category: "Boissons", price: 2.5 },
  { name: "Croissant", category: "Viennoiseries", price: 1.2 },
  { name: "Jus d'orange", category: "Boissons", price: 3.0 },
  { name: "Pain au chocolat", category: "Viennoiseries", price: 1.4 },
  { name: "Sandwich", category: "Salé", price: 5.5 },
];
export function groupBy(products, key) {
  let obj = {};

  products.forEach((item) => {
    if (!obj[item[key]]) {
      obj[item[key]] = [];
    }
    obj[item[key]].push(item);
  });
  return obj
}
