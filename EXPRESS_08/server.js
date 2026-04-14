const express = require('express');
const app = express();
app.listen(3000,()=>{
    console.log("Servidor rodando na sua portinha apertada 3000")
});


app.get('/distancia/:pontoA/:pontoB', (req,res)=>{
    const pontoA = parseFloat(req.params.pontoA);
    const pontoB = parseFloat(req.params.pontoB);
    const distancia = Math.abs(pontoA - pontoB);
    res.send('A distância entre os pontos é: ' + distancia);
});


app.get('/produto/:produtoA/:produtoB', (req,res)=>{

    const produtoA = parseFloat(req.params.produtoA);
    const produtoB = parseFloat(req.params.produtoB);
    const produto = produtoA * produtoB;

    res.send('O produto dos valores é: ' * produto);
});

