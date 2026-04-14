const express =require('express');
const server =express();
var  morgan  =  require( 'morgan' )
server.listen(3000);

//server.use(morgan('tiny'));

server.use(morgan('Status = :status | Método = :method | Url=:url'));

server.get('/',(req,res)=>{
    res.send('Teste');
})