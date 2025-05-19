const myPromise= new Promise((resolve, reject)=>{
    const x= 5;
    const y= 5;

    if(x==y) {
        resolve();
    }
    else{
        reject();
    }
})

myPromise.then(()=>{
    console.log('successfull');
}).catch(()=>{
    console.log('some error has occured');
})



// Promises in JavaScript are a powerful way to handle asynchronous operations. 
// They represent a value that may be available now, in the future, or never. A promise can be in one of three states:

// 1. Pending: Initial state, neither fulfilled nor rejected.
// 2. Fulfilled: Operation completed successfully.
// 3. Rejected: Operation failed.

// Promises are a modern way to handle asynchronous operations in JavaScript, 
// offering a more flexible and readable approach compared to callbacks. By using .then(), .catch(),
//  and Promise.all(), you can manage complex asynchronous workflows effectively.



// with async await

// const myPromise= new Promise((resolve, reject)=>{
//     const x= 5;
//     const y= 5;

//     if(x===y){
//         resolve('Values are equal');
//     }else{
//         reject('Not equal');
//     }
// })

// const checkPromise= async()=>{
//     try {
//         const message= await myPromise;
//         console.log(message);
//     } catch (error) {
//         console.log(error);
//     }
// }

// checkPromise()