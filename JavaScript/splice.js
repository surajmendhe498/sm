// splice() method return the removed elements in the array

const arr = [1, 2, 3, 4, 5];
const spliced = arr.splice(1, 2); // Remove 2 elements starting at index 1

console.log(spliced); // [2, 3] (removed elements)
console.log(arr);     // [1, 4, 5] (modified array)
