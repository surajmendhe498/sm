// Write a function to flatten a nested array.

function flattenArray(arr) {
    return arr.flat(Infinity); // Use Infinity to flatten deeply nested arrays
}

console.log(flattenArray([1, [2, [3, [4, 5]]]])); 
