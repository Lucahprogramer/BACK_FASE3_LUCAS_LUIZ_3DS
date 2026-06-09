const express = require('express');
const mysql = require('mysql2');
const mysql_config = require('./mysql_config');

const app = express();
app.listen(3000, () => {
    console.log('Servidor rodando na sua portinha 3000');
});

// criar a conexão
const connection = mysql.createConnection(mysql_config);

// rotas
app.get('/', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results, fields) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err.message);
            return res.status(500).send('Erro ao obter as tarefas.');
        }

        res.json(results);
    });
});