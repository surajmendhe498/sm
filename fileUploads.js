// const express = require('express');
// const app = express();
// const fs= require('fs')
// const multer = require('multer');
// const path = require('path');

// // Define the upload directory
// const uploadDir = path.join(__dirname, 'uploads');

// // Check if uploads directory exists, if not, create it
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('file'), (req, res) => {
//     res.status(200).json({ message: 'File uploaded successfully', file: req.file });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
// console.log(this);

const express= require('express');
const app= express();
const multer= require('multer');

const upload= multer({dest: 'uploads/'});

app.post('/upload', upload.single('file'), (req,res)=>{
    res.status(200).json({message: 'file uploaded successfully', file: req.file})
});

app.listen(3000, ()=>{
    console.log('server is running');
})


/*
const express= require('express');
const app= express();
const multer= require('multer');
const mongoose= require('mongoose');

// database
const MONO_URI= 'mongodb://127.0.0.1:27017/image';
mongoose.connect(MONO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database is connected');
}).catch((err)=>{
    console.log(err);
})

// Define a schema for the uploaded files
const fileSchema = new mongoose.Schema({
    originalname: String,
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', fileSchema);

// controllers
const upload = multer({ dest: 'uploads/' });    // Configure multer

app.use('/uploads', express.static('uploads')); // Serve the uploads directory as static     

app.post('/uploads', upload.array('files'), async (req, res) => {
    try {
        const files = req.files.map(file => ({
            originalname: file.originalname,
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
        }));
        const savedFiles = await File.insertMany(files);

        res.status(201).json({message: 'File is uploaded and saved to the database successfully', files: savedFiles});
    } catch (error) {
        res.status(500).json({ message: 'Error uploading files', error });
    }
});


const port= 3000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})
*/