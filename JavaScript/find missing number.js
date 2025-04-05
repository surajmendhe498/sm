function missingNumber(arr, n){
    let expectedSum= (n * ( n + 1) / 2);        // 21

    let actualSum= arr.reduce((sum, num)=> sum+num, 0);     // 18

    return expectedSum - actualSum;     // 21 - 18 = 3
}

console.log(missingNumber([1, 2, 4, 5, 6], 6));


// The .reduce() function calculates the sum of all elements in the arr array