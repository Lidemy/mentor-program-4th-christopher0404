const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });
const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve(input) {
  for (let i = 1; i <= Number(input[0]); i += 1) {
    let [A, B, K] = input[i].split(' ');

    /* eslint-disable no-undef */
    A = BigInt(A);
    B = BigInt(B);
    K = Number(K);

    if (A === B) {
      console.log('DRAW');
    } else if (K === 1) {
      console.log(A > B ? 'A' : 'B');
    } else if (K === -1) {
      console.log(A < B ? 'A' : 'B');
    }
  }
}

rl.on('close', () => solve(lines));
