/*------------------------------Use try/catch for synchronous code-----------------------------------------------------------------------------------*/

// function divide(a, b) {
//     try {
//         if (b === 0) {
//             throw new Error("Division by zero is not allowed.");
//         }
//         return a / b;
//     } catch (error) {
//         console.error("Error occurred:", error.message);
//         // Optionally, handle or log the error further
//     }
// }

// // Example usage:
// console.log(divide(10, 2));  // Output: 5
// console.log(divide(10, 0));  // Output: Error occurred: Division by zero is not allowed.


/*---------------------------------Handle asynchronous errors with Promises------------------------------------------------------------------------ */


// Function to simulate checking if a number is even or odd
function checkEvenNumber(number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (number % 2 === 0) {
          resolve(`Number ${number} is even.`);
        } else {
          reject(new Error(`Number ${number} is odd.`));
        }
      }, 500); // Simulating an async operation with setTimeout
    });
  }
  
  // Calling the function with an even number
  checkEvenNumber(4)
    .then(message => {
      console.log(message); // Output: Number 4 is even.
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  
  // Calling the function with an odd number
  checkEvenNumber(3)
    .then(message => {
      console.log(message);
    })
    .catch(error => {
      console.error('Error:', error.message); // Output: Error: Number 3 is odd.
    });

  /*---------------------------------Use async/await for cleaner asynchronous code------------------------------------------------------------------------------------------------ */
  
  function checkEven(number){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if(number%2 == 0){
                resolve('Even Number');
            }else{
                reject('Odd Number');
            }
        }, 500);
    })
};

const checkNum= async()=>{
  try {
      const result= await checkEven(98);
      console.log(result);
      
  } catch (error) {
     console.log(error); 
  }
}

checkNum();
  /*------------------Implement a global error handling middleware in an Express application---------------------------------------------------*/
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/error', (req, res) => {
    throw new Error('This is a forced error.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
