const express= require('express');
const app= express();

const myLogger= (req,res, next)=>{
    console.log('Logged');
    next();
}

app.get('/', myLogger, (req,res)=>{
    res.send('hello World')
})

app.listen(3000, ()=>{
    console.log('server is running');
})