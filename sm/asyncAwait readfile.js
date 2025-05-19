// Demonstrate how to use async/await to read a file in Node.js.
const fs= require('fs').promises

const readFile= async(filePath)=>{
    try {
        
        const data= await fs.readFile(filePath, 'utf8');
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
}

readFile('suraj.txt')