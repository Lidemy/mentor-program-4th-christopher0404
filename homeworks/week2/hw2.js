// for()
/*
function capitalize(str) {
  let result = "";
  result += str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    result += str[i];
  }
  return result;
}
*/

// slice()
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

console.log(capitalize("hello"));
console.log(capitalize("nick"));
console.log(capitalize("Nick"));
console.log(capitalize(",hello"));
