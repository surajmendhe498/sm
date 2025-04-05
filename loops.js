// // for loop
// for(let i=0;i<=5; i++){
//   console.log(i);
// }


//while loop

// let i=0;
// while(i<=5){
//   console.log(i);
//   i++;
// }


// // do while

// let i=0;
// do{
//   console.log(i);
//   i++;
// }
// while(i<=5);


// for...in loop: The for...in loop is used to iterate over the properties of an object.

// const person = {name: 'John', age: 30, city: 'New York'};
// for (let key in person) {
//     console.log(key + ": " + person[key]);
// }

// for...of loop: The for...of loop is used to iterate over iterable objects like arrays, strings, maps, sets, etc.

// const arr= [1,2,3,4,5];

// for(let value of arr){
//   console.log(value);
// }

// forEach loop in JavaScript is specifically used for iterating over arrays.

const arr= [1,2,3,4,5];
let sum= 0;
arr.forEach((number)=>{
  sum+= number;
})

console.log(sum);

// The higher order function=> 1. Takes one or more functions as an arguments. 2. Returns a function as its result