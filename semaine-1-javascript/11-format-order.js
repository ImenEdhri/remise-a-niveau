function formatOrder({ id, client: { name }, items = [] }) {
  console.log(`Commande #${id} - ${name} - ${items.length} article(s)`);
  return `Commande #${id} - ${name} - ${items.length} article(s)`;
}

formatOrder({ id: 12, client: { name: "Imen" }, items: ["a", "b", "c"] });
