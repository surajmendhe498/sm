// const express = require('express');
// const app = express();
// const port = 3000;

// // Middleware function
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(port, () => {
//     console.log(`Server running at http://127.0.0.1:${port}/`);
// });

// Write an Express middleware function that logs the request method and URL for each incoming request.
// Write an Express middleware function that logs the details of each incoming request (method, URL, and timestamp).


// Write middleware to log the details of each request (method, URL, and timestamp).
const express = require('express');
const app = express();
const port = 3000;

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
