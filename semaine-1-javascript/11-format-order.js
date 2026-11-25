export function formatOrder({ id, client: { name }, items = [] }) {
  return `Commande #${id} – ${name} – ${items.length} article(s)`;
}

// formatOrder({ id: 12, client: { name: "Imen" }, items: ["a", "b", "c"] });
