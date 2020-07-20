const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

function isNarcissisticNumber(num) {
  const str = num.toString();
  const digits = str.length;
  let sum = 0;

  for (let i = 0; i < digits; i += 1) {
    sum += Number(str[i]) ** digits;
  }
  return sum === num;
}

function solve(input) {
  const arr = input[0].split(' ');
  const N = Number(arr[0]);
  const M = Number(arr[1]);

  for (let i = N; i <= M; i += 1) {
    if (isNarcissisticNumber(i)) {
      console.log(i);
    }
  }
}

rl.on('line', (line) => {
  lines.push(line);
});
rl.on('close', () => solve(lines));
