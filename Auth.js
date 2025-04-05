const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

app.use(express.json());

const port= 5000;
const Mongo_URI= 'mongodb://127.0.0.1:27017/p1'

mongoose.connect(Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
}).then(()=>{
    console.log('MongoDB is connected');  
}).catch((err)=>{
    console.log(err);
});

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

const authenticate= (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({message: 'Access Denied. No token provided'});
    }

    try {
        const decoded= jwt.verify(token, 'secret_key');
        req.user= decoded;

        next();
        
    } catch (error) {
        res.status(401).json({message: 'Invalid or Expired token'})
    }
}

app.post('/api/users/signup', async(req, res)=>{
    try {
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const userExist= await User.findOne({email});
        if(userExist){
            return res.status(409).json({message: 'User already exists'});
        }

        const hashedPassword= await bcrypt.hash(password, 10);

        const newUser= new User({
            name, 
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User created successfully', user:newUser});
        
    } catch (error) {
        res.status(500).json({message: 'Intrnal server error'});
    }
});

app.post('/api/users/login', async(req, res)=>{
    try {
        const {email, password}= req.body;

        if(!email || !password){
            return res.status(400).json({message: 'Email and Password are required'});
        }

        const userExist= await User.findOne({email});
        if(!userExist){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const token= jwt.sign({id: userExist._id}, 'secret_key', {expiresIn: '1h'});
        res.status(200).json({message: 'User logged in successful', token});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

app.get('/api/users', async(req, res)=>{
    try {
        const users= await User.find({}, '-password');
        res.status(200).json({message: 'users fetched successfully', data:users});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

app.put('/api/users/update/:id', authenticate, async(req, res)=>{
    try {
        const {name, email, password}= req.body;
        const {id}= req.params;

        const updates= {};

        if(name) updates.name= name;
        if(email){
            const userExist= await User.findOne({email});
            if(userExist && userExist._id != id){
                return res.status(409).json({message: 'This email already taken by another user'});
            }
            updates.email= email;
        }

        if(password){
            const hashedPassword= await bcrypt.hash(password, 10);
            updates.password= hashedPassword;
        }

        const updateUser= await User.findByIdAndUpdate(id, updates, {new:true});
        if(!updateUser){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'user updated successfully', user: updateUser});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

app.delete('/api/users/delete/:id', async(req, res)=>{
    try {
        const {id}= req.params;

        const deleteUser= await User.findByIdAndDelete(id);
        if(!deleteUser){
           return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'User deleted successfully'});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

// app.get('/api/users/me/:id', authenticate, async(req, res)=>{
//     try {
//         const {id}= req.params;

//         const user= await User.findById(id);
//         if(!id){
//             return res.status(404).json({message: 'user not found'});
//         }

//         res.status(200).json({message: 'User fetched succssfully', user:user});
        
//     } catch (error) {
//         res.status(500).json({message: 'Internal server error'});
//     }
// })


app.get('/api/users/me', authenticate, async(req, res)=>{
    try {
       const user= await User.findById(req.user.id);

       if(!user){
        return res.status(404).json({message: 'User not found'});
       }

       res.status(200).json({message: 'User fetched successfully', user:user});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})