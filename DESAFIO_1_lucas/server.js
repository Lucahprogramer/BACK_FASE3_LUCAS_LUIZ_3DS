const server = require('express')();
const sqlite3 = require('sqlite3').verbose();

const app = server;
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});