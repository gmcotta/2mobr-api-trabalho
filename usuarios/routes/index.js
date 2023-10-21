const bcrypt = require('bcrypt');
const express = require('express');

const config = require('../config');
const ManagerUser = require('../model/ManagerUser');
const User = require('../model/User');
const createToken = require('../utils/token');


const router = express.Router();

router.get('/', (req, res) => {
    res.send({ output: req.headers });
});

router.post('/add', (req, res) => {
    const data = new User(req.body);
    const payload = {
        username: data.username
    };
    data.save()
        .then(() => {
            res.status(201).send({ output: 'New user inserted', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Insertion failed => ${error}`})
        });
});

router.put('/change-password', (req, res) => {
    const { username, email, newPassword } = req.body;

    User.findOne({ username, email }, (error, userData) => {
        if (error) {
            return res.status(500).send({ output: 'Change password error' });
        }
        if (!userData) {
            return res.status(404).send({ output: 'User or email incorrect' });
        }
        bcrypt.hash(newPassword, config.bcryptSalt, (error, passwordEncrypted) => {
            if (error) {
                res.status(500).send({ output: 'Change password error' });
            }
            User.updateOne({ username, email }, { password: passwordEncrypted })
                .then(() => {
                    res.status(200).send({ output: 'Password changed' });
                })
                .catch(() => {
                    res.status(500).send({ output: 'Change password error' });
                });
        });
    });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }, (error, userData) => {
        if (error) {
            return res.status(500).send({ output: 'Login error' });
        }
        if (!userData) {
            return res.status(404).send({ output: 'User or password incorrect' });
        }
        bcrypt.compare(password, userData.password, (error, result) => {
            if (!result) {
                return res.status(400).send({ output: 'User or password incorrect' });
            }
            const token = createToken(userData._id, userData.username);
            const info = new ManagerUser({
                userId: userData._id,
                username: userData.username,
                information: req.headers
            });
            info.save();
            const payload = { id: userData._id, username: userData.username };
            res.status(200).send({ output: 'Authenticated', payload, token });
        });
    });
});

module.exports = router;
