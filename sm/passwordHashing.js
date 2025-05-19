// // Implement a function to hash a password using bcrypt
const bcrypt= require('bcrypt');

const hashedPassword= (password)=>{
    return bcrypt.hash(password, 10);
}

const password= 'surajmendhe';

hashedPassword(password).then((hash)=>{
    console.log(hash);
}).catch((err)=>{
    console.log(err);
})

// The reason you're seeing Promise { <pending> } is that bcrypt.hash is an asynchronous function
//  that returns a promise. To handle the promise correctly, you need to use either async/await or .then()
//   to get the result of the hashed password.



// const hashedPassword= async (password)=>{
//     try {
//         const response= await bcrypt.hash(password, 10);  // Await the bcrypt hashing operation   
//         console.log(response);
        
//     } catch (error) {
//         console.log(error);
//     }
// }
// const password= 'suraj mendhe';

// hashedPassword(password)  // Call the function to hash the password


// 10: This number is the salt rounds. It determines the computational cost of hashing the password.
//  The higher the number, the more time-consuming the hashing process will be. This makes it harder for 
//  attackers to use brute force to crack the hash.



// Using async and await in JavaScript is essential for handling asynchronous operations in a more readable and manageable way 
// compared to traditional callback-based approaches. Here are the main reasons and use cases for using async and await:

// Why Use async and await?
// Readability: async and await make asynchronous code look more like synchronous code, which can make it easier to read and understand. 
// This can be especially helpful for complex workflows that involve multiple asynchronous operations.

// Error Handling: With async and await, you can use try/catch blocks to handle errors, making error handling more consistent and readable 
// compared to handling errors in callbacks or then/catch chains.

// Avoiding Callback Hell: Traditional callbacks can lead to deeply nested structures known as "callback hell," which can be difficult 
// to read and maintain. async and await flatten these structures.



/*
const bcrypt= require('bcrypt');

const hashedPassword= (password)=>{
    return bcrypt.hash(password, 10);
}

const password= 'suraj mendhe';

const checkPass= async()=>{
    try {
        const result= await hashedPassword(password);
        console.log(result);
        
    } catch (error) {
        console.log(error);
        
    }
}

checkPass()
 */