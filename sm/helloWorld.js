const jwt= require('jsonwebtoken');

const payload= {
    id: 123,
    username: "suraj mendhe"
};

const secretKey= 'secretkey';
const options= {expiresIn:'2h'};

const token= jwt.sign(payload, secretKey, options);

console.log(token);