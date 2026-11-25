export function formatPrice(amount: number, currency = "DT"):string {
  return `${amount.toFixed(2)} ${currency}`;
}

function _verificationsDeTypes() {
  // @ts-expect-error : un prix doit être un nombre
  formatPrice("2.5");
}