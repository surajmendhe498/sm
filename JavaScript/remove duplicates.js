function removeDuplicate(arr){
    return [...new Set(arr)];
}

console.log(removeDuplicate([1, 2, 3, 3, 4, 4, 5]));


// A Set in JavaScript is a collection of unique values. When you pass an array to a Set, it automatically removes any duplicate values.