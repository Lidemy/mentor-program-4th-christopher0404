const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  for (let i = 1; i <= input[0]; i += 1) {
    let stars = '';
    for (let j = 0; j < i; j += 1) {
      stars += '*';
    }
    console.log(stars);
  }
}

rl.on('close', () => solve(lines));
