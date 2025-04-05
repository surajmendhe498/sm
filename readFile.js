// const fs= require('fs')

// fs.readFile('surajm.txt', 'utf8', (err, data)=>{
//     if(err)
//         {
//             console.log(err);
//         }
//         console.log(data);
// })


const fs= require('fs')

fs.readFile('surajsm.txt', 'utf8', (err,data)=>{
    if(err)
        {
            console.log(err);
        }
        console.log(data);
})


// const fs= require('fs');

// try {
//   const data= fs.readFileSync('km.txt', 'utf-8');
//   console.log(data);
  
// } catch (error) {
//   console.log(error);
// }

// console.log('This line will execute later due to synchronous nature of nodejs');
