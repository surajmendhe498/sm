// const jwt= require('jsonwebtoken')

// const payload= {
//     id: 123,
//     username: 'suraj mendhe'
// };

// const secretkey= 'secretkey'
// const option= {expiresIn:'5h'}

// const token= jwt.sign(payload,secretkey,option)

// console.log(token);

const jwt= require('jsonwebtoken')
const payload= {
    id: 123,
    name: "suraj"
};

const secretkey= 'surajmendhe';
const options= {expiresIn: '1h'};

const token= jwt.sign(payload, secretkey, options);

console.log(token);

/*
const express= require('express');
const app= express();
const jwt= require('jsonwebtoken');

const secretkey= 'surajmendhe';

app.post('/login', (req,res)=>{
    const user= {
        id: 1,
        name: 'suraj',
        age: 20
    }

    jwt.sign({user}, secretkey, {expiresIn: '1h'}, (err, token)=>{
        if(err){
            console.log(err.message);
        }
        res.json({token})
    })
})

app.listen(3000, ()=>{
    console.log('server is running');
})
*/ 