const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

app.use(express.json());

const port= 3000;
const MONGO_URI= 'mongodb://127.0.0.1:27017/s';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`Database connected`);
}).catch((err)=>{
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

const User= mongoose.model('user', userSchema);

app.post('/api/users/signup', async(req, res)=>{
    try {
        const {name, email, password}= req.body;
        if(!name || !email || !password){
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
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User sign up successfully', user:newUser});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'internal server error'});
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
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isMatch= await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token= jwt.sign({id: userExist._id}, 'secret_key', {expiresIn: '1h'});

        res.status(200).json({message: 'User login successfully', token});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.get('/api/users', async(req, res)=>{
    try {
        const users= await User.find({}, '-password');

        if(users.length==0){
            res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'Users fetched successfully', users});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.put('/api/users/update/:id', async(req, res)=>{
    try {
        const {name, email, password}= req.body;
        const {id}= req.params;

        const updates= {};

        if(name) updates.name= name;
        if(email){
            const userExist= await User.findOne({email});
            if(userExist && userExist._id != id){
                return res.status(409).json({message: 'This email is taken by another user'});
            }
            updates.email= email;
        }

        if(password){
            const hashedPassword= await bcrypt.hash(password, 10);
            updates.password= hashedPassword;
        }

        const updateUser= await User.findByIdAndUpdate(id, updates, {new:true});
        if(!updateUser){
            return res.status(400).json({message: 'User not found'});
        }

        res.status(200).json({message: 'User updated successfully', user:updateUser});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.delete('/api/users/delete/:id', async(req, res)=>{
    try {
        const {id}= req.params;

        const deleteUser= await User.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(201).json({message: 'User deleted successfully'});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.get('/api/users/me/:id', async(req, res)=>{
    try {
        const {id}= req.params;

        const user= await User.findById(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({message: 'User fetched successfully', user:user});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})