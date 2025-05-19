const axios = require('axios');

// Using Promises
function fetchDataWithPromises(url) {
    axios.get(url)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

// Using async/await
async function fetchDataWithAsyncAwait(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

const url = 'https://jsonplaceholder.typicode.com/posts/1';
fetchDataWithPromises(url);
fetchDataWithAsyncAwait(url);


// Write a Node.js function that fetches data from a URL using the axios library. 
// Use both Promises and async/await to handle the asynchronous operation.


// 1. Axios is a popular JavaScript library used to make HTTP requests from both the browser and Node.js environments. 
// 2. It supports promises and is often used for making asynchronous requests to interact with RESTful APIs.
// 3. Axios uses Promises, which allow for cleaner and more readable asynchronous code, especially when combined with async and await.