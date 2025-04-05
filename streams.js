// const fs = require('fs');
// const readableStream = fs.createReadStream('sms.txt');

// readableStream.on('data', (chunk) => {
//     console.log(`Received chunk: ${chunk}`);
// });

// readableStream.on('end', () => {
//     console.log('No more data.');
// });


// writable stream

const fs = require('fs');
const writableStream = fs.createWriteStream('output.txt');

writableStream.write('Hello, World!\n');
writableStream.end('This is the end.\n');
