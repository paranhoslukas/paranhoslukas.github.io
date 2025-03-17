const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://juninho:eEXSob9WK4AKlpOf@ativapi.ttzdm.mongodb.net/?retryWrites=true&w=majority&appName=ativAP');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;