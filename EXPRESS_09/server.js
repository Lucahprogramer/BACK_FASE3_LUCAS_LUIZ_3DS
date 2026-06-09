const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

const funcoes = require('./functions');

 app.get('/', (req, res) => {
    res.send('TESTE COM ARQUIVOS EXTERNOS ERNOS ao O servidor or');
})



app.get('/add/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const resultado = funcoes.add (a, b);
    res.send(`a soma de ${a} e ${b} é igual a ${resultado}`);
});