const mongoose = require('../database/connection');


const schema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    cpf: { type: String, unique: true, required: true },
    phone: { type: String },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Client = mongoose.model('client', schema);

module.exports = Client;
