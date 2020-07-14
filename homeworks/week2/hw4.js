function printFactor(n) {
  for (let i = 1; i <= n; i++) {
    if (!(n % i)) {
      console.log(i);
    }
  }
}

printFactor(10);
printFactor(7);
