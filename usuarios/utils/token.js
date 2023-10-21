const jwt = require('jsonwebtoken');
const config = require('../config');


const createToken = (id, user) => {
    return jwt.sign({ id, user }, config.jwtKey, { expiresIn: config.jwtExpires });
}

module.exports = createToken;
