// multiple file uploads
const express= require('express');
const app= express();
const multer= require('multer');

const port= 3000;

const upload= multer({dest: 'uploads/'});

app.post('/upload', upload.array('files', 10), (req,res)=>{
    res.status(200).json({message: 'file uploaded successfully',files: req.files})
    console.log('file uploaded');
});

app.listen(port, ()=>{
    console.log('server is running');
})