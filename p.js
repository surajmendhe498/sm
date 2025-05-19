const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

app.use(express.json());

const port= 3000;
const MONGO_URI= 'mongodb://127.0.0.1:27017/imp';

app.get('/', (req, res)=>{
    res.send('Jai Shree Ram');
});

mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log(`MongoDB Connected`);
    })
    .catch((err)=>{
        console.log(err);
    })

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User= mongoose.model('User', userSchema);

app.post('/api/users/signup', async(req, res)=>{
    try {
        const {name, email, password}= req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExist= await User.findOne({email});
        if(userExist) {
            return res.status(409).json({message: 'User already exists'});
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= new User({
            name, 
            email, 
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User sign up successfully', user:{name, email}});
        
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
});

app.post('/api/users/login', async(req, res)=>{
    try {
        const {email, password}= req.body;

        if(!email || !password){
            return res.status(400).json({message: 'Email and password are required'});
        }

        const userExist= await User.findOne({email});
        if(!userExist){
            return res.status(401).json({message: 'Invalid credentials'})
        };

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token= jwt.sign({id: userExist._id}, 'jst_secret', {expiresIn: '1h'});
        res.status(200).json({message: 'User login successfully', token});
        
    } catch (error) {
        return res.status
    }
});


app.get('/api/users', async(req, res)=>{
    try {
        const users= await  User.find().select('-password');

        if(users.length == 0){
            return res.status(400).json({message: 'Users not found'});
        }

        res.status(200).json({message: 'Users fetched successfully', users:users});
        
    } catch (error) {
        return res.status(500).json({messsage: 'Internal server error'});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})