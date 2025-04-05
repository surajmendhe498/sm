// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const app = express();

// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/jwt-suraj').then(()=>{
//     console.log('mongodb connected');
// })
// .catch((err)=>{
//     console.log(err);
// })

// const userSchema = new mongoose.Schema({    // User schema and model
//     username: { type: String, required: true, unique: true },
//     email: {type: String, required: true},
//     password: { type: String, required: true }
// });
// const User = mongoose.model('User', userSchema);

// // Middleware to protect routes
// const authenticateToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) return res.status(401).json({ message: 'No Token, Access denied' });

//     try {
//         const decoded = jwt.verify(token, 'your_jwt_secret');
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid token' });
//     }
// };

// // Register route
// app.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Check if user already exists
//         const userExist = await User.findOne({ email });
//         if (userExist) return res.status(400).json({ message: 'User already exists' });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ message: 'User registered successfully', user});
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Login route
// app.post('/login', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         // Create and sign JWT
//         const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Protected route
// app.get('/protected', authenticateToken, async(req, res) => {
//     const user= await User.findById(req.user.id)         //.select('-password') for excluding password
//     res.json({ message: 'Profile Accessed', user});
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const port= 3000;
const url= 'mongodb://localhost:27017/practice';

app.use(express.json()); // handle incoming data
 
// mongodb connection
mongoose.connect(url).then(()=>{
    console.log('Mongodb connected');
})
.catch((err)=>{
    console.log(err);
})

// define user schema
const userSchema= new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const User= new mongoose.model('user', userSchema);

// middleware for verifyToken
const verifyToken= (req,res,next)=>{
    const token= req.headers.authorization;
    if(!token){
        return res.status(401).json({message: 'No Token, Access Denied'})
    }

    try {
        const decode= jwt.verify(token, 'surajmendhe');
        req.user= decode;
        next();

    } catch (error) {
        res.status(400).json({message: 'Invalid Token'})
    }
}

// register
app.post('/register', async(req,res)=>{
    try {
        const {username, email, password}= req.body;
        const userExist= await User.findOne({email});

        if(userExist){
            return res.status(400).json({message: 'user already exists'})
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const user= new User({
            username, 
            email, 
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({message: 'User registered successfully', user})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    }
})

// login
app.post('/login', async(req,res)=>{
    try {
        const {username, email, password}= req.body;
        const userExist= await User.findOne({email});

        if(!userExist){
            return res.status(400).json({message: 'Invalid credentials (email)'})
        }

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid Credentials (password)'})
        }

        const token= jwt.sign({id: userExist._id}, 'surajmendhe', {expiresIn: '1h'});
        res.status(200).json({token})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})
    }
})

// protected route
app.get('/protected', verifyToken, async(req,res)=>{

    const data= await User.findById(req.user.id)
    res.json({message: 'Profile Accessed', data})
})

app.listen(port, ()=>{
    console.log('server is running...');
})



// Implement JWT authentication in an Express.js application. 
// Provide endpoints for user registration (POST /register) and login (POST /login).
// Protect a sample route (GET /protected) so it can only be accessed with a valid JWT token.