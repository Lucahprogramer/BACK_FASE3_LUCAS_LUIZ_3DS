const express = require('express');
const app = express();

app.listen(3000,()=>{
    console.log("Servidor em execução")
});

//rotas

app.get('/',(req, res)=>{
    res.send("Olá mundo cruel do CESF");
})

//rota com parâmetro
app.get('/ola/:nome',(req,res)=>{
    res.send('Olá '+req.params.nome)
});

//rota com dois parâmetros
app.get('/ola/:nome/:empresa',(req,res)=>{
    res.send('Olá '+req.params.nome+' da '+req.params.empresa);
});

app.get('/soma/:a/:b',(req,res)=>{
    res.send('Resultado: '+(parseInt(req.params.a)+parseInt(req.params.b)));
});


