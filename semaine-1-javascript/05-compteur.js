function createCounter(start = 0) {
  let count = start;
  increment = () => {
    count++;
    return count;
  };
  decrement = () => {
    count--;
    return count;
  };
  value = () => {
    return count;
  };
  return { increment, decrement, value };
}
const counter = createCounter(5);
console.log(counter.value()); 
counter.increment();
console.log(counter.value());
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());
