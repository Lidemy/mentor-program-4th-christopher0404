const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function isPrimeNumber(n) {
  if (n === 1) {
    return false;
  }
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    console.log(isPrimeNumber(Number(input[i])) ? 'Prime' : 'Composite');
  }
}

rl.on('close', () => solve(lines));
