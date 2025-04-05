function checkEven(arr){
    return arr.filter((num)=> num%2 == 0 )
}

console.log(checkEven([1,2,3,4,5,6,7,8,9,10]));


// function printEven(arr){
//     for(let i=0;i<=arr.length; i++){
//         if(arr[i]%2==0){
//             console.log(arr[i]);
            
//         }
//     }
// }

// printEven([1,2,3,4,5,6,7,8])