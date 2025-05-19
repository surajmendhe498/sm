const fs = require('fs');     // file reading with callback

// Asynchronous readFile function with a callback
fs.readFile('surajsm.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

console.log("This will run before the file is read due to the asynchronous nature of readFile.");




// A callback is a function which passed as an argument to another function, which they executed later.
// callback is commonly used for to handle asynchronous tasks like, reading form a file, making http request.



// // Example function with a callback
// function fetchData(callback) {
//   setTimeout(() => {
//     const data = 'Hello, world!';
//     callback(data); // Calling the callback with data
//   }, 1000);
// }

// // Using the function with a callback
// fetchData((result) => {
//   console.log(result); // Output: Hello, world!
// });
