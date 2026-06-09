const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

const connection = new sqlite3.Database('./database.db', (error) => {
    if (error) {
        console.error(error.message);
        return;
    }
    console.log('Conexão estabelecida!');
});

connection.serialize(() => {
    connection.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, status TEXT)');
});

app.get('/', (req, res) => {
    connection.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            res.status(500).send('Erro ao obter tarefas');
        } else {
            res.json(rows);
        }
    });
});

app.get('/5tarefas', (req, res) => {
    const query = 'INSERT INTO tasks (task, status) VALUES (?, ?)';
    
    const tarefas = [
        ['Criar repositório da atividade', 'concluido'],
        ['Instalar Express e SQLite3', 'concluido'],
        ['Criar rota principal', 'concluido'],
        ['Fazer a rota de poucos itens', 'em andamento'],
        ['Fazer a rota do loop de 100 itens', 'pendente']
    ];

    connection.serialize(() => {
        tarefas.forEach((tarefa) => {
            connection.run(query, tarefa);
        });
        res.send('<h1>5 tarefas inseridas com sucesso!</h1><p>Acesse a rota / para ver os dados.</p>');
    });
});

app.get('/100', (req, res) => {
    const query = 'INSERT INTO tasks (task, status) VALUES (?, ?)';
    
    connection.serialize(() => {
        connection.run("BEGIN TRANSACTION");
        
        for (let i = 1; i <= 100; i++) {
            connection.run(query, [`Tarefa gerada por script automático #${i}`, 'pendente']);
        }
        
        connection.run("COMMIT", (err) => {
            if (err) {
                res.status(500).send('Erro na inserção em massa');
            } else {
                res.send('<h1>100 tarefas populadas num piscar de olhos!</h1><p>Acesse a rota / para conferir a lista gigante.</p>');
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});