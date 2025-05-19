const express= require('express');
const app= express();
const mysql=  require('mysql2/promise');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

app.use(express.json());

const port= 5000;
const jwt_secret= 'surajmendhe';

const host= 'localhost';
const user= 'root';
const password= 'Suraj123@@@...';
const db_name= 'mysqll'


const db= mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: db_name
});

db.getConnection()
    .then(()=>{
        console.log('Connected to MySQL Database');
    })
    .catch((err)=>{
        console.log(err);
    })


    const User= {
        findByMail: async(email)=>{
            const query= 'SELECT * FROM users WHERE email=?';
            const [results]= await db.query(query, [email]);
            return results;
        },
        create: async(name, email, hashedPassword)=>{
            const query= 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            const [result]= await db.query(query, [name, email, hashedPassword]);
            return result;
        },
        findAll: async()=>{
            const query= 'SELECT *  FROM users';
            const [result]= await db.query(query);
            return result;
        },
        delete: async(id)=>{
            const query= 'DELETE FROM users WHERE id=?';
            const [result]= await db.query(query, [id]);
            return result;
        },
        findById: async(id)=>{
            const query= 'SELECT * FROM users WHERE id=?';
            const [results]= await db.query(query, [id]);
            return results;
        }
    };

app.post('/api/users/signup', async(req, res)=>{
        try {
            const {name, email, password}= req.body;
    
            if(!name || !email || !password){
                return res.status(400).json({message: 'All fields are required'});
            }
    
            const userExist= await User.findByMail(email);
            if(userExist.length > 0){
                return res.status(409).json({message: 'User already exists.'});
            }
    
            const hashedPassword= await bcrypt.hash(password, 10);
            
            await User.create(name, email, hashedPassword);
            res.status(200).json({message: 'User sign up successfully'});
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
});
    
app.post('/api/users/login', async(req, res)=>{
        try {
            const {email, password}= req.body;
    
            if(!email || !password){
                return res.status(400).json({message:'Email and Password are required'});
            }
    
            const userExist= await User.findByMail(email);
            if(userExist.length == 0){
                return res.status(401).json({message: 'Invalid Credentials'});
            }
    
            const isMatch= await bcrypt.compare(password, userExist[0].password);
            if(!isMatch){
                return res.status(401).json({message: 'Invalid Credentials'});
            }
    
            const token= jwt.sign({id: userExist.id}, jwt_secret, {expiresIn: '1h'});
            res.status(200).json({message: 'User login successfully', token});
            
        } catch (error) {
            return res.status(500).json({message: 'Internal server error'});
        }
    });
    
app.get('/api/users', async(req, res)=>{
        try {
            const users= await User.findAll();
    
            if(users.length == 0){
                return res.status(404).json({message: 'Users not found'});
            }
    
            res.status(200).json({message: 'Users fetched successfully', user:users});
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    });

app.delete('/api/users/:id', async(req, res)=>{
        try {
            const {id}= req.params;
    
            const deleteUser= await User.delete(id);
    
            if(deleteUser.affectedRows == 0){
                return res.status(404).json({message: 'User not found'});
            }
    
            res.status(200).json({message: 'User deleted successfully'});
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    });
    
app.get('/api/users/:id', async(req, res)=>{
        try {
            const {id}= req.params;
    
            const user= await User.findById(id);
            if(user.length == 0){
                return res.status(404).json({message: 'User not found'});
            }
    
            res.status(200).json({message: 'User fetched successfuly', user:user});
            
        } catch (error) {
           return res.status(500).json({message: 'Internal server error'}); 
        }
    });


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})