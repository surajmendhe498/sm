function applyOperation(a, b, operation) {    //applyOperation is a higher-order function because it takes a function (operation) as an argument. This function will be used to perform some operation on the two numbers a and b.
    return operation(a, b);
  }
  
  // Define some simple operations
  function add(x, y) {
    return x + y;
  }
  
  function multiply(x, y) {
    return x * y;
  }
  
  // Use the higher-order function with different operations
  const sum = applyOperation(5, 3, add);
  const product = applyOperation(5, 3, multiply);
  
  console.log(sum);      // Output: 8
  console.log(product);  // Output: 15
  
  
  // The higher order function=> 1. Takes one or more functions as an arguments. 2. Returns a function as its result.
  
  // Let's create a higher-order function called applyOperation that takes two numbers and a function as arguments. 
  // The function argument will be used to perform an operation on the two numbers.
  
  
  