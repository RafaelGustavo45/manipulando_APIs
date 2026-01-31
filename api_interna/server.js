const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite requisições de outras portas (como a 5500)
app.use(express.json());

// Configuração da conexão com o MariaDB
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,          // Porta do seu MariaDB
    user: 'root',        // Seu usuário
    password: 'root',        // Sua senha
    database: 'cids'     // Nome do banco de dados
});

// Conectar ao banco
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MariaDB:', err.message);
        return;
    }
    console.log('Conectado ao MariaDB com sucesso!');
});

// Rota da API
app.get('/api/cid', (req, res) => {
    const { cod_cid, language } = req.query;

    if (!cod_cid || !language) {
        return res.status(400).json({ error: "Parâmetros 'cod_cid' e 'language' são obrigatórios." });
    }

    const sql = "SELECT name FROM nomemclatura WHERE cod_cid = ? AND language = ?";
    
    db.query(sql, [cod_cid, language], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            return res.json({ nome: results[0].name });
        } else {
            return res.status(404).json({ error: "Registro não encontrado." });
        }
    });
});

app.delete('/api/cid', (req,res) => {
    const { cod_cid, language } = req.body;
    if (!cod_cid || !language) {
        return res.status(400).json({ error: "Parâmetros 'cod_cid' e 'language' são obrigatórios." });
    }

    const sql = "DELETE FROM nomemclatura WHERE cod_cid = ? AND language = ?";
    db.query(sql, [cod_cid, language], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (results.affectedRows > 0) {
                return res.json({ message: "Registro deletado com sucesso." });
            } else {
                return res.status(404).json({ error: "Registro não encontrado." });
            }
        }
    });
});

app.post('/api/cid', (req, res) => {    
    const { cod_cid, language, name } = req.body;

    // 1. Validação básica: impede que entrem dados nulos no banco
    if (!cod_cid || !language || !name) {
        return res.status(400).json({ error: "Todos os campos (cod_cid, language, name) são obrigatórios." });
    }

    const sql = "INSERT INTO nomemclatura (cod_cid, language, name) VALUES (?, ?, ?)";
    
    db.query(sql, [cod_cid, language, name], (err, results) => {
        if (err) {
            // Caso haja erro de duplicidade (se você tiver chave única) ou erro de conexão
            return res.status(500).json({ error: err.message });
        } else {
            // 201 é o status HTTP ideal para "Recurso Criado"
            return res.status(201).json({ 
                message: "Registro inserido com sucesso!", 
                id: results.insertId 
            });
        }
    }); // Fechamento do db.query
}); // <--- Faltava fechar a função do app.post aqui!

// Inicia o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});