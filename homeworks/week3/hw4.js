const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function reverseString(str) {
  str.split('').reverse().join('');
}

function solve(input) {
  if (input[0] === reverseString(input[0])) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => solve(lines));
