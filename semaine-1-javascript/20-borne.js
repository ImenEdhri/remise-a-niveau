import { sleep, retry, groupBy, ShoppingCart } from "./utils.js";
const products = [
  { name: "Café", category: "Boissons", price: 2.5 },
  { name: "Croissant", category: "Viennoiseries", price: 1.2 },
  { name: "Jus d'orange", category: "Boissons", price: 3.0 },
  { name: "Pain au chocolat", category: "Viennoiseries", price: 1.4 },
  { name: "Sandwich", category: "Salé", price: 5.5 },
];

function displayCatalog() {
  const groupedProducts = groupBy(products, "category");

  console.log("=== CATALOGUE ===");

  for (const category in groupedProducts) {
    console.log(`\n--- ${category} ---`);

    groupedProducts[category].forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.price} DT`);
    });
  }
}

async function processPayment(amount) {
  console.log(`Paiement de ${amount} DT en cours...`);

  console.log("Paiement processing...");
  await sleep(1000);
  console.log("Paiement processed after 1 second");
  if (Math.random() < 0.5) {
    throw new Error("Paiement refusé !");
  }

  return "Paiement accepté !";
}

function getTicket(cart) {
  console.log("\n=== TICKET DE CAISSE ===");
  cart.displayItems().forEach((item) => {
    console.log(`${item.name} x ${item.qty} = ${item.price * item.qty} DT`);
  });

  console.log("------------------------");
  console.log(`TOTAL : ${cart.getTotal()} DT`);
}

async function main() {
  displayCatalog();

  const cart = new ShoppingCart();
  //   console.log({ cartBefore: cart });
  cart.add(products[0], 1);
  cart.add(products[1], 2);
  cart.add(products[2], 1);

  //   console.log({ cartAfter: cart });
  getTicket(cart);

  try {
    await retry(() => processPayment(cart.total), 3);
    console.log("Commande confirmée !");
  } catch (error) {
    console.log(error.message);
    console.log("Commande non confirmée.");
  }
}

main();
