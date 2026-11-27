type PaymentMethod =
  | { kind: "card"; last4: string }
  | { kind: "cash"; amountGiven: number }
  | { kind: "loyalty"; points: number };

export function describePayment(payment: PaymentMethod): string {
  switch (payment.kind) {
    case "card":
      return `Carte **** ${payment.last4}`;
      break;
    case "cash":
      return `Espèces : ${payment.amountGiven} DT`;
      break;
    case "loyalty":
      return `Fidélité : ${payment.points} points`;
      break;
    default:
      const impossible: never = payment;
      return impossible;
  }
}
