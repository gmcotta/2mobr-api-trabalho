const mongoose = require('../database/connection');


const tableManager = new mongoose.Schema({
    userId: { type: String },
    username: { type: String },
    information: [{}],
    loginDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('manager_user', tableManager);
