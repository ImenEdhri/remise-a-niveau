export function createCounter(start = 0) {
  let count = start;
  const increment = () => {
    count++;
    return count;
  };
  const decrement = () => {
    count--;
    return count;
  };
  const value = () => {
    return count;
  };
  return { increment, decrement, value };
}
// const counter = createCounter(5);
// console.log(counter.value()); 
// counter.increment();
// console.log(counter.value());
// counter.increment();
// console.log(counter.value());
// counter.decrement();
// console.log(counter.value());
