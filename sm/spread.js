// The spread and rest operators in JavaScript, both represented by three dots (...), 
// are powerful tools for handling arrays, objects, and function arguments. Despite having the same syntax, 
// they serve different purposes depending on their context.

const arr= [1,2,3];
const copiedArr= [...arr];

console.log(copiedArr);


// merged array
// const arr1= [1,2,3];
// const arr2= [4.,5,6];

// const mergedArr= [...arr1, ...arr2];

// console.log(mergedArr);

let obj1= {
    a: 1,
    b: 2
};

let obj2= {
    name: "suraj",
    age: 21
}

let combined={...obj1,...obj2};

console.log(combined);
