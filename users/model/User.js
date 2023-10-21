const bcrypt = require('bcrypt');
const config = require('../config');
const mongoose = require('../database/connection');


const table = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    createdAt: { type: Date, default: Date.now }
});

table.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    } 
    bcrypt.hash(user.password, config.bcryptSalt, (error, result) => {
        user.password = result;
        return next();
    });
});

module.exports = mongoose.model('user', table);
