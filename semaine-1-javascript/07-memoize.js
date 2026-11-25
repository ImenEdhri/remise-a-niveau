export function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log("depuis le cache");
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function slowFunction(num) {
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += i;
  }
  return result + num;
}

const memoizedFunction = memoize(slowFunction);

// console.time("First call");
// console.log(memoizedFunction(5));
// console.timeEnd("First call");

// console.time("Second call");
// console.log(memoizedFunction(5));
// console.timeEnd("Second call");

// console.time("Third call");
// console.log(memoizedFunction(10));
// console.timeEnd("Third call");
