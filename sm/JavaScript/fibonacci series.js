function generateFibonacci(n) {
    let fib = [0, 1]; // Starting with 0 and 1
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2]; // Each number is the sum of the previous two
    }
    return fib.slice(0, n); // Return the first 'n' numbers
}

console.log(generateFibonacci(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
