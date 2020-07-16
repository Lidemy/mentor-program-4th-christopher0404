function join(arr, concatStr) {
  let str = arr.length === 0 ? "" : arr[0];
  for (let i = 1; i < arr.length; i++) {
    str += concatStr + arr[i];
  }
  return str;
}

function repeat(str, times) {
  let repeatedStr = "";
  for (let i = 0; i < times; i++) {
    repeatedStr += str;
  }
  return repeatedStr;
}

console.log(join([" "], "~"));
console.log(join([1, 2, 3], ""));
console.log(join(["a"], "!"));
console.log(join(["a", "b", "c"], "!"));
console.log(join(["a", 1, "b", 2, "c", 3], ","));

console.log(repeat("a", 5));
console.log(repeat("yoyo", 2));
console.log(repeat("hello", 1));
