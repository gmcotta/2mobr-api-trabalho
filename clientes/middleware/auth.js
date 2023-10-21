const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
    const tokenCreated = req.headers.token;

    if (!tokenCreated) {
        return res.status(401).send({ output: 'Access denied' });
    }

    jwt.verify(tokenCreated, config.jwtKey, (error, result) => {
        if (error) {
            return res.status(401).send({ output: `Token failed -> ${error}`});
        }
        req.content = {
            id: result.id,
            username: result.username
        }
        return next();
    });

}

module.exports = auth;
