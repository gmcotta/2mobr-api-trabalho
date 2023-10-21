const mongoose = require('../database/connection');


const schema = new mongoose.Schema({
    bankName: { type: String, required: true },
    accountType: { type: String, required: true },
    holderName: { type: String, required: true },
    cardLimit: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const Banking = mongoose.model('banking', schema);

module.exports = Banking;
