// const globalVariable= 'Im a global variable';

// const gloabal= ()=>{
//     console.log(globalVariable);   // Accessible
// }

// console.log(globalVariable);  // Accessible

// // These variables are accessible from anywhere in the code.


// const functionVariable= ()=>{
//     let a= 10;
//     console.log(a);    // accessible
// }

// functionVariable()

// console.log(a);   // Not accessible, ReferenceError

// These variables are only accessible within that function.


if (true) {
    let blockVar = "I'm a block variable";
    console.log(blockVar); // Accessible
  }
  
//   console.log(blockVar); // Not accessible, ReferenceError

// Variables declared with let or const are only accessible within the block (e.g., within curly braces {}) where they are defined.
