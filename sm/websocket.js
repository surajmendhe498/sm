const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`You sent: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080')


// const WebSocket = require('ws');
// const server = new WebSocket.Server({ port: 8080 });   // Create a new WebSocket server

// server.on('connection', (ws) => {      // Listen for connection events
//     console.log('New client connected');

//     ws.on('message', (message) => {     // Listen for messages from the client
//         const msg = message.toString('utf-8'); // Convert the buffer to a string
//         console.log('Received:', msg);
//         ws.send(`Server received: ${msg}`);
//     });

//     ws.on('close', () => {       // Handle client disconnection
//         console.log('Client disconnected');
//     });

//     ws.on('error', (error) => {     // Handle errors
//         console.error('WebSocket error:', error);
//     });

//     ws.send('Welcome to the WebSocket server!');   // Send a welcome message to the client
// });

// console.log('WebSocket server is running on ws://localhost:8080');


// const WebSocket = require("ws");
// const server = new WebSocket.Server({port:8080});

// server.on("connection", (ws) => {
//    console.log("New client connected !");

//    //send welcome message
//    ws.send("Hello this is welcome message");

//    //reply
//    ws.on("message", (message) => {
//       console.log(`message: ${message}`);

//       //message handling
//       if(message == "hi"){
//          ws.send("hello");
//       }else if(message == "bye"){
//          ws.send("goodbye");
//       }else{
//          ws.send("other message");
//       }
//    });
// });