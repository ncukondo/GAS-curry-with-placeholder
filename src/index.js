const sum = (a, b, c) => [a, b, c];
const { curry, placeholder: _ } = import_funcUtils_();
const c_sum = curry(sum);

console.log(c_sum(1, 2, 3));
console.log(c_sum(1, 2)(3));
console.log(c_sum(1)(2)(3));
console.log(c_sum(1)(2, 3));
console.log(c_sum(_, 2, 3)(1));
console.log(c_sum(_, 2, _)(1, 3));

function import_funcUtils_() {
  const pipe = (seed, ...fns) =>
    fns.reduce((prevResult, fn) => fn(prevResult), seed);
  const tap = (fn) => (input) => {
    fn(input);
    return input;
  };
  const placeholder = Symbol("placehlderForCurry");
  const curry = (fn) => {
    const _ = placeholder;
    const curried = (...args) => {
      const partiallyApplied = (...restArgs) => {
        const restArgStack = [...restArgs];
        const combined = [...args]
          .map((arg) =>
            arg === _ && restArgStack.length > 0 ? restArgStack.shift() : arg
          )
          .concat(restArgStack);
        return curried(...combined);
      };

      const haveEnoughArgs = args.length >= fn.length && !args.includes(_);
      if (haveEnoughArgs) return fn(...args);
      return partiallyApplied;
    };
    return curried;
  };

  return { pipe, tap, placeholder, curry };
}

document.getElementById("app").innerHTML = `see console to look result`;
