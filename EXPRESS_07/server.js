const express = require('express');
const app = express();

app.listen(3000,()=>{
    console.log("Servidor no ar");
})

const clientes = [
    {id:1,nome:'Adamastor',fone:'111',email:'ada@email'},
    {id:2,nome:'Bernadete',fone:'222',email:'berna@email'},
    {id:3,nome:'Clementina',fone:'333',email:'cleme@email'},
    {id:4,nome:'Deusdeti',fone:'444',email:'deu@email'},
    {id:5,nome:'Emengarda',fone:'555',email:'eme@email'},
    {id:6,nome:'Itapior',fone:'666',email:'ita@email'}
];

//rotas
app.get('/',(req,res)=>{
    res.send("Seja benvindo à nossa API de Clientes");
})

//rota que apresenta o total de clientes
app.get('/total_clientes',(req,res)=>{
    res.send('Total de clientes: '+clientes.length)
});

//rota para apresentar dados de um cliente específico
app.get('/clientes/:id',(req,res)=>{
    const cliente = clientes.find(c=>c.id ===parseInt(req.params.id))

    //não acha cliente
    if(!cliente){
        res.status(404).send("Cliente não encontrado!!")
    }
    res.send(`O cliente é: ${cliente.nome}, telefone: ${cliente.fone}, email: ${cliente.email}`);
})//rota para apresentar dados de um cliente específico
app.get('/clientes/:id',(req,res)=>{
    const cliente = clientes.find(c=>c.id ===parseInt(req.params.id))

    //não acha cliente
    if(!cliente){
        res.status(404).send("Cliente não encontrado!!")
    }
    res.send(`O cliente é: ${cliente.nome}, telefone: ${cliente.fone}, email: ${cliente.email}`);
})