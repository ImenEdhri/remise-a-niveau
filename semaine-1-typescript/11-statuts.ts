export const ORDER_STATUSES = [
  "pending",
  "paid",
  "preparing",
  "ready",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
// La déclaration const permet de créer une constante nommée accessible uniquement en lecture.

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  const rules: Record<OrderStatus, OrderStatus[]> = {
    pending: ["paid", "cancelled"],
    paid: ["preparing", "cancelled"],
    preparing: ["ready"],
    ready:[],
    cancelled:[]
  };
  return rules[from].includes(to)
}
