// var a= 10;
// var a= 20;
// a= 30;
// console.log(a);   // var is a function or global scope , we can redeclare and update also. 
                     // When to use: Use var when you need variables that are function-scoped and when you want to utilize hoisting intentionally.
                     // Hoisting: Variables declared with var are hoisted to the top of their scope.


 /*------------------------------------------let-----------------------------------------------------------------------------------------------------*/                    

// let a= 10;        // let is a blocked scope variable (they are scoped to the nearest enclosing curly braces {}).
// a= 75             // They can be updated but not re-declared.
// console.log(a);   // When to use: when you need variables that are block-scoped, especially in loops or conditionals where you want to limit variable scope to a specific block.

// let name = 'Alice';
// for (let j = 0; j < 5; j++) {
//     let age = 25;
// }
// console.log(name); // Output: Alice
// console.log(age); // ReferenceError: age is not defined

/*-------------------------------------------const--------------------------------------------------------------------------------------------------*/

const b= 10;     // Variables declared with const are block-scoped like let. 
console.log(b);  // cannot be updated or re-declared.
                 // They are not hoisted to the top of their block scope.

                 // When to use: Use const when you have variables that should not be re-assigned after initialization. 