/*-------------------------------------- find largest and smallest element in the array -----------------------------------------------------*/
// const arr= [2,3,4,10,9];

// const findLargestElement= (arr)=>{
//   let largestNumber= arr[0];
//   let smallestNumber= arr[0];

//   for(let i=0;i<arr.length; i++){
//     if(arr[i]>largestNumber){
//       largestNumber= arr[i];
//     }
//     if(arr[i]<smallestNumber){
//       smallestNumber= arr[i];
//     }
//   }
//   return [largestNumber, smallestNumber];
// }
// const [largestNumber, smallestNumber]= findLargestElement(arr);

// console.log(`largest number: ${largestNumber}, smallest number: ${smallestNumber}`);

/*-------------------------------find second largest and second element--------------------------------------------------------------------------------*/

// const arr= [2, 3, 4, 10, 9];

// const findSecondSmallestAndSecondLargest= (arr)=>{
//   let largest= -Infinity;
//   let secondLargest= -Infinity;
//   let smallest= Infinity;
//   let secondSmallest= Infinity;

//   for(let i=0; i<arr.length; i++){      // second largest element
//     if(arr[i] > largest){
//       secondLargest= largest;
//       largest= arr[i];
//     }
//     else if(arr[i] > secondLargest){    
//       secondLargest= arr[i];
//     }

//     if(arr[i] < smallest){          // second smallest element
//       secondSmallest= smallest;
//       smallest= arr[i];
//     }
//     else if(arr[i] < secondSmallest){
//       secondSmallest= arr[i];
//     }
//   }
//   return {secondLargest, secondSmallest};
// }

// const {secondLargest, secondSmallest}= findSecondSmallestAndSecondLargest(arr);
// console.log(`second largest: ${secondLargest}, second smallest: ${secondSmallest}`);

/*---------------------------find third largest and third smallest element----------------------------------------------------------------------------*/


const arr= [2, 3, 4, 10, 9];

const findThirdSmallestAndThirdLargest= (arr)=>{
  let largest= -Infinity;
  let secondLargest= -Infinity;
  let thirdLargest= -Infinity;

  let smallest= Infinity;
  let secondSmallest= Infinity;
  let thirdSmallest= Infinity;

  for(let i=0; i<arr.length; i++){      // third largest element
    if(arr[i] > largest){
      thirdLargest= secondLargest;
      secondLargest= largest;
      largest= arr[i];
    }
    else if(arr[i] > secondLargest){   
      thirdLargest= secondLargest; 
      secondLargest= arr[i];
    }
    else if(arr[i] > thirdLargest){
      thirdLargest= arr[i];
    }

// Update smallest, second smallest, and third smallest
    if (arr[i] < smallest) {
      thirdSmallest = secondSmallest;
      secondSmallest = smallest;
      smallest = arr[i];
    }
     else if (arr[i] < secondSmallest) {
      thirdSmallest = secondSmallest;
      secondSmallest = arr[i];
    } 
    else if (arr[i] < thirdSmallest) {
      thirdSmallest = arr[i];
    }
  }
  return {thirdLargest, thirdSmallest};
}

const {thirdLargest, thirdSmallest}= findThirdSmallestAndThirdLargest(arr);
console.log(`third largest: ${thirdLargest}, third smallest: ${thirdSmallest}`);