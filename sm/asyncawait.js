// Async/await is a modern JavaScript feature that allows you to write asynchronous code
//  in a more synchronous-looking manner. It's built on top of Promises and provides a more readable 
//  and easier-to-understand syntax for handling asynchronous operations. 
const bcrypt= require('bcrypt');

const hashedPassword= async(password)=>{
  try {
     const hash=  await bcrypt.hash(password, 10);
     return hash;
  } catch (error) {
    console.log(error);
  }
}

const password= "suraj mendhe";

(async()=>{
  try {
    const result= await hashedPassword(password);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})
();

// Yes, the example you provided demonstrates the use of async/await with the bcrypt library
//  for hashing a password. It showcases the handling of asynchronous operations with proper error handling using try...catch blocks.


// const bcrypt= require('bcrypt');

// const hashedPassword= async(password)=>{
//   try {
//      const hash=   bcrypt.hash(password, 10);
//      console.log(hash);
//   } catch (error) {
//     console.log(error);
//   }
// }

// const password= "suraj mendhe";
// hashedPassword(password);

// Without async and await, you would need to use .then() and .catch() methods to
// handle the promise returned by bcrypt.hash, which can make the code more verbose and harder to follow.