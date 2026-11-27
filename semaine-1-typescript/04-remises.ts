type Discount = (price: number) => number;

export function percentOff(percent: number): Discount {
  return (price: number) => {
    return price - (price * percent) / 100;
  };
}
export function fixedOff(amount: number): Discount {
  return (price: number) => {
    return price - amount > 0 ? price - amount : 0;
  };
}
export function combine(...discounts: Discount[]): Discount {
  return (price: number) => {
    discounts.forEach((discount) => {
      price = discount(price);
    });
    return price
  };
}
