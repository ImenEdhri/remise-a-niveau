export function sumEven(numbers) {
  const initialValue = 0;
  const pairArray = numbers.filter((numr) => numr % 2 === 0);
  const sum = pairArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue,
  );
  return sum
}
// sumEven([1, 2, 3, 4, 6])