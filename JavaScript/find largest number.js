// function findLargest(arr){
//     return Math.max(...arr);
// }

// console.log(findLargest([10, 20, 60, 50]));


function findLargest(arr){
    let max= arr[0];

    for(let i=0;i<=arr.length-1; i++){
        if(arr[i] > max){
            max= arr[i];
        }
    }
    return max;
}

console.log(findLargest([10, 30, 80, 70]));
