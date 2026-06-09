const express = require('express');
//const mysql = ('requiremysql2');
const sqlite3 = require ('sqlite3').verbose();


const app = express();


app.listen(3000, () => {
    console.log('Servidor sqlite nos ares 3000');
})



//criar a conexão
//const connection = mysql.createConnection({
    //host:'localhost',
    //user:'user_bd_tasks',
    //password:'QL0P4TDcQGB2R97Djet7vXYHggatTZE4',
    //database:'nodejs_tasks'})

    //NOVO - CONEXAO COM SQLITE
    const connection = new sqlite3.Database('./database.db', (error) => {
        if (error) {
            console.error('Erro na conexão ao banco de dados:', error.message);
            return;
        }
        console.log('Conexão com o SQLite (arquivo local) estabelecida com sucesso!');
    });

    //preparação do ambiente

    connection.serialize(()=>{
        connection.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, status TEXT)');
    })

// connection.connect(error=>{
//     if (error) {
//         console.log('Erro ao conectar ao banco de dados:' + error.message);
//         return;
//     }
//     console.log('Conectado ao banco de dados');
// })

app.get('/', (req, res) => {
    // connection.query('SELECT * FROM tasks', (err, results,fields) => {
    //     if (err) {
    //         console.log(err.message)
    //     }
    
    //     else{ 
    //     res.send('results');
    //     }
    // })
    //NOVO (SQLITE) - método  query vira all, e o resultado vira rows
    connection.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
        console.log(err.message);
        res.send('Erro ao obter a lista de tarefas');
        } else {
        res.send(rows);
        }

   })

})
app.get('/setup',(req,res)=>{ 
    //rota para inserção de dados na tabela 
    const query = 'INSERT INTO tasks (task, status) VALUES (?,?)'; 

     connection.run(query,['Estudar rotas do Express', 'concluido']);
     connection.run(query,['Configurar o ambiente de desenvolvimento', 'concluido']);
     connection.run(query,['Instalar a extensão SQLite Viewer', 'concluido']);
     connection.run(query,['Criar a tabela de tarefas', 'concluido']);
     connection.run(query,['Configurar banco SQLite', 'em andamento']);
     connection.run(query,['Criar rota para listar tarefas', 'em andamento']);
     connection.run(query,['Testar a extenção SQLite Viewer', 'pendente'],(err)=>{ 
        if(err){ res.send('Error ao popular de dados')

        }else{res.send('<h1>Ambiente configurado com sucesso</h1><p>Vá para a rota principal para ver os dados</p>'); 

         } 
    }); 
});
app.get('/setupLuiz', (req, res) => {
    const query = 'INSERT INTO tasks (task, status) VALUES (?,?)';
    connection.run(query, ['Estudar para prova de quinta', 'pendente'], (err)=>{
        if (err) {
        res.send('Erro ao popular dados')
        }else{
        res.send('<h1>foi, configurado  </h1> <p>Vá para a rota localhost</p>');
        }
    });
});




app.get('/setupLucas', (req, res) => {
    const query = 'INSERT INTO tasks (task, status) VALUES (?,?)';
    connection.run(query, ['Estudar para a prova de quinta', 'Em Andamento'], (err)=>{
        if (err) {
        res.send('Erro ao popular dados')
        }else{
        res.send('<h1> foi desconfigurado seu buxa </h1> <p>Vá para a rota localhost</p>');
        }
    });
});