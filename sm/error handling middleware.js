// error handling middleware
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  const err = new Error('Something went wrong!');
  err.status = 500; // Set the status code
  next(err); // Pass the error to the error-handling middleware
});

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);    // Set the status code, defaulting to 500 if not set

  // Send the error response as JSON
  res.json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
};

// Use the error-handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








// Create an error-handling middleware in Express.js that catches any errors thrown in the request handling process and returns a JSON response with the error message.

// Key Points to Cover:

// Error-handling middleware definition
// Custom error messages
// Setting response status codes