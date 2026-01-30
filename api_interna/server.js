const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite requisições de outras portas (como a 5500)
app.use(express.json());

// Configuração da conexão com o MariaDB
const db = mysql.createConnection({
    host: 'localhost',
    port: 3000,          // Porta do seu MariaDB
    user: 'root',        // Seu usuário
    password: '',        // Sua senha
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

// Inicia o servidor na porta 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});