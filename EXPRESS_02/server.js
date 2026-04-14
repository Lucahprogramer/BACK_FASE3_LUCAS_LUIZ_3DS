const express = require('express');
const server = express();

server.listen(3000);

//routes
/*
home
services
about
erro
 */

server.get('/',(req,res)=>{
    res.sendFile('./VIEWS/home.html',{root: __dirname});
})

server.get('/servicos',(req,res)=>{
    res.sendFile('./VIEWS/services.html',{root: __dirname});
})

server.get('/sobre',(req,res)=>{
    res.sendFile('./VIEWS/about.html',{root: __dirname});
})

server.use((req,res)=>{
    res.status(404).sendFile('./VIEWS/404.html',{root: __dirname});
})


