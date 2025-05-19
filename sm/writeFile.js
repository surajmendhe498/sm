// const fs= require('fs')

// fs.writeFile('surajsm.txt', 'Hello Suraj', (err)=>{
//     if(err)
//         {
//             console.log(err);
//         }
//         console.log('file is created');
// })

// fs.unlink('surajm.txt', (err)=>{
//     if(err)
//         {
//             console.log(err);
//         }
//         console.log('file deleted successfully');
// })





// const fs= require('fs');

// fs.writeFile('sms.txt', 'hii', (err)=>{
//   if(err){
//     console.log(err);
    
//   }
//   console.log('file is created');
  
// })

// console.log('This line will execute first due to asynchronous nature of nodejs');


const fs = require('fs');

try {
  fs.writeFileSync('sms.txt', 'hii');
  console.log('File is created');
} catch (err) {
  console.log(err);
}

console.log('This line will execute after the file is created due to the synchronous nature of Node.js');
