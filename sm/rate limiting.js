const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({          // Define the rate limit rule
  windowMs: 10 * 60 * 1000,          // 10 minutes
  max: 5,                            // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again after 10 minutes. (You are allow only 5 times in 10 min)'
});

// Apply the rate limit rule to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Welcome to the rate-limited API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


// windowMs: Defines the time window in milliseconds during which the number of requests is counted.
// max: Specifies the maximum number of requests allowed within the windowMs.
// message: The response message sent when the rate limit is exceeded.



// let arr= [2,3,4,2,3,4,5,6];

// let unique= new Set(arr);
// console.log(...unique);