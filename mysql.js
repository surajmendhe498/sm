const express= require('express');
const app= express();
const mysql= require('mysql2');

app.use(express.json());

const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Suraj123@@@...',
    database: 'node_crud'
});

db.connect((err)=>{
   if(err){
    console.log('Database connection failed', err);
   } else{
    console.log(`Connected to mysql database`);
   }
});

app.post('/api/users', (req, res)=>{
    const {name, email, age}= req.body;

    const sql= 'INSERT INTO users (name, email, age) VALUES(?,?,?)';
    db.query(sql, [name, email, age], (err, result)=>{
        if(err){
            res.status(500).json({message: 'Internal server error'});
        }
        res.status(201).send({ message: 'User created successfully.'});
    })
});

app.get('/api/users', (req, res)=>{
    const sql= 'SELECT * FROM users';
    db.query(sql, (err, results)=>{
        if(err){
            res.status(500).json({message: 'Internal server error'});
        }
        res.status(200).json({message: 'Users fetched successfully', results});
    })
})

app.get('/api/users/:id', (req, res)=>{
    const {id}= req.params;

    const sql= 'SELECT * FROM users WHERE id= ?';
    db.query(sql, [id], (err, results)=>{
        if(err){
            res.status(500).json({message: 'Internal server error'});
        }
        if(results.length == 0){
            return res.status(404).json({message: 'User not found'});
        }
        else{
            res.status(200).json(results[0]);
        }
    })
})

app.put('/api/users/update/:id', (req, res)=>{
    const {id}= req.params;
    const {name, email, age}= req.body;

    const sql= 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(sql, [name, email, age, id], (err, result)=>{
        if(err){
            console.log(err);
            res.status(500).json({message: 'Internal server error'});
        }
        if(result.affectedRows==0){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'User updated successfully'})
    })
})

app.delete('/api/users/delete/:id', (req, res)=>{
    const {id}= req.params;

    const sql= 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result)=>{
        if(err){
            res.status(500).json({message: 'Internal server error'});
        }
        if(result.affectedRows==0){
            return res.status(404).json({message: 'User not found'});
        }
        else{
            res.status(200).json({message: 'User deleted succssfully'});
        }
    })

})


const port= 3000;
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})