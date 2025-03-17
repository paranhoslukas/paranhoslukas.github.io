const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Contato', contatoSchema);