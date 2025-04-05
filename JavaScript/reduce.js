// // Using reduce method
// const arr= [1,2,3,4,5]
// let sum= arr.reduce((x,y)=> x+y)
// console.log(sum);


// // Using for loop
// const arr= [1,2,3,4];

// let sum= 0;
// for(let i=0;i<arr.length; i++)
//     {
//         sum+= arr[i];
//     }
// console.log(sum);


// // Using foreach loop
// const arr= [1,2,3,4,5,6];   
// let sum= 0;

// arr.forEach((ele)=>{
//     sum+= ele;
// })

// console.log(sum);

function sumOfEle(arr){
    return arr.reduce((x,y)=> x+y);
}

console.log(sumOfEle([1,2,3,4,5]));
