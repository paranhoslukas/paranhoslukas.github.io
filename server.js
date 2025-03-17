const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importar o middleware cors
const connectDB = require('./db/db'); // Importar a função de conexão com o banco de dados

const app = express();
const port = 3000;

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors()); // Usar o middleware cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Adicione esta linha para analisar JSON

// Modelo Mongoose
const Contato = require('./models/Contato');

// Rota para receber dados do formulário
app.post('/contato', async (req, res) => {
    console.log('Dados recebidos:', req.body); // Log dos dados recebidos
    try {
        const novoContato = new Contato({
            nome: req.body.nome,
            telefone: req.body.telefone,
            email: req.body.email
        });

        await novoContato.save();
        res.status(200).json({ message: 'Contato salvo com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar contato:', err); // Log do erro
        res.status(500).json({ message: 'Erro ao salvar contato.' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});