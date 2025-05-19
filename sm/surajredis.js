const express = require('express');
const app = express();
const bcrypt= require('bcrypt');
const mongoose = require('mongoose');
const redis = require('redis');
const rateLimit = require('express-rate-limit');

//middleware
app.use(express.json());

//database
mongoose.connect('mongodb://127.0.0.1:27017/surajredis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//models
const userSchema = new mongoose.Schema({
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
    },
    age: {
        type: Number,
        required: true
    }
});
const User = mongoose.model('User', userSchema);


const client = redis.createClient();
client.on('connect', ()=>{
    console.log(`Redis is connected`);
})

client.on('error', (err)=>{
    console.log('Redis error', err);
})

client.connect();

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

//controllers
app.post('/api/users', async(req, res)=>{
    try {
        const {name, email, password, age}= req.body;

        if(!name || !email || !password || !age){
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExist= await User.findOne({email});
        if(userExist){
            return res.status(409).json({message: 'User already exist'});
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= new User({
            name,
            email,
            password: hashedPassword,
            age
        })
        
        await newUser.save();
        res.status(201).json({message: 'User created successfully', user:newUser});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.get('/api/users', async(req, res)=> {
    try {
        const cachedUsers = await client.get('allUsers');
        if (cachedUsers) {
            return res.status(200).json({ message: 'Users fetched successfully (cached)', users: JSON.parse(cachedUsers) });
        }

        const users = await User.find({}, '-password');
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cache the result for future requests
        await client.set('allUsers', JSON.stringify(users), { EX: 3600 }); // Expires in 1 hour
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));


/*
/api/users
Redis Integration:

First checks Redis for cached user data (allUsers key).
If cache exists, returns the cached data.
If not, fetches users from MongoDB, caches the result in Redis with a 1-hour expiration (EX: 3600), and sends it to the client.

*/