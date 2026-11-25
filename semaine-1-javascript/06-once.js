export function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      result = fn(...args);
      called = true;
    }
    return result;
  };
}
const fn = (a, b) => {
  return a + b;
};
// const onceFn = once(fn);
// console.log(onceFn(1, 2));
// console.log(onceFn(10, 20));
