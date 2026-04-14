const express = require('express');
const server = express();

server.listen(3000);

//MIDDLEWARE
server.use((req,res,next)=>{
    console.log('Teste de acesso prévio');
    next();
})

server.use((req,res,next)=>{
    req.resquestTime=Date.now();
    next();
})

server.get('/',(req,res)=>{
    res.send('<h1>Teste de Entrada 3</h1>');
    console.log(req.resquestTime);
})