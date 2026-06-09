const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.listen(3000, () => {
    console.log('Servidor sqlite nos ares 3000');
});

const connection = new sqlite3.Database('./database.db', (error) => {
    if (error) {
        console.error('Erro na conexão ao banco de dados:', error.message);
        return;
    }
    console.log('Conexão com o SQLite (arquivo local) estabelecida com sucesso!');
});

connection.serialize(() => {
    connection.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, status TEXT)');
});

app.get('/', (req, res) => {
    connection.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send('Erro ao obter a lista de tarefas');
        }

        let html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Sistema de Tarefas</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; }
                    .botoes { margin-bottom: 20px; }
                    .btn { padding: 10px 15px; margin-right: 10px; text-decoration: none; background-color: #28a745; color: white; border-radius: 5px; font-weight: bold;}
                    .btn-muitos { background-color: #007bff; }
                    .btn:hover { opacity: 0.8; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; background-color: white; }
                    th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
                    th { background-color: #eaeaea; }
                </style>
            </head>
            <body>
                <h1>Página de Entrada - Tarefas</h1>
                
                <div class="botoes">
                    <a href="/poucos" class="btn">Popular Poucos Dados</a>
                    <a href="/muitos" class="btn btn-muitos">Popular Muitos Dados (100)</a>
                </div>
                <hr>
                <h2>Conteúdo do Banco de Dados:</h2>
        `;

        if (rows.length === 0) {
            html += '<p>O banco de dados está vazio. Clique nos botões acima para inserir dados.</p>';
        } else {
            html += `
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Tarefa</th>
                        <th>Status</th>
                    </tr>
            `;
            
            rows.forEach(row => {
                html += `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.task}</td>
                        <td>${row.status}</td>
                    </tr>
                `;
            });
            
            html += '</table>';
        }

        html += `
            </body>
            </html>
        `;

        res.send(html);
    });
});

app.get('/poucos', (req, res) => {
    const query = 'INSERT INTO tasks (task, status) VALUES (?,?)';
    
    connection.serialize(() => {
        connection.run(query, ['Estudar para prova de quinta (Luiz)', 'pendente']);
        
        connection.run(query, ['Estudar para a prova de quinta (Lucas)', 'Em Andamento'], (err) => {
            if (err) {
                res.status(500).send('Erro ao popular dados');
            } else {
                res.send(`
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h1>foi desconfigurado seu buxa (Poucos dados inseridos)</h1>
                        <br>
                        <a href="/" style="padding: 10px 15px; background: #6c757d; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Voltar para a página principal</a>
                    </div>
                `);
            }
        });
    });
});

app.get('/muitos', (req, res) => {
    const query = 'INSERT INTO tasks (task, status) VALUES (?,?)'; 

    connection.serialize(() => {
        for (let i = 1; i <= 100; i++) {
            if (i === 100) {
                connection.run(query, [`Tarefa gerada automaticamente número ${i}`, 'concluído'], (err) => { 
                    if(err) { 
                        res.status(500).send('Erro ao popular os 100 dados');
                    } else {
                        res.send(`
                            <div style="font-family: Arial, sans-serif; padding: 20px;">
                                <h1>Eita! 100 dados foram inseridos com sucesso no banco.</h1>
                                <br>
                                <a href="/" style="padding: 10px 15px; background: #6c757d; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Voltar para a página principal</a>
                            </div>
                        `); 
                    } 
                });
            } else {
                connection.run(query, [`Tarefa gerada automaticamente número ${i}`, 'pendente']);
            }
        }
    });
});