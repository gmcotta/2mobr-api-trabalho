const express = require('express');

const auth = require('../middleware/auth');
const Client = require('../models/Client');


const router = express.Router();

router.get('/search', auth, (req, res) => {
    Client.find()
        .then((result) => {
            const payload = result.map(data => ({
                id: data._id,
                fullName: data.fullName,
                email: data.email,
                cpf: data.cpf,
                phone: data.phone,
                age: data.age
            }));
            res.status(200).send({ output: 'Search completed', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Search failed => ${error}`});
        });
});

router.get('/search/:id', auth, (req, res) => {
    Client.findById(req.params.id)
        .then((result) => {
            const payload = {
                id: result._id,
                fullName: result.fullName,
                email: result.email,
                cpf: result.cpf,
                phone: result.phone,
                age: result.age
            }
            res.status(200).send({ output: 'Client found', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Search failed => ${error}`});
        });
});

router.post('/add', auth, (req, res) => {
    const data = new Client(req.body);
    const payload = {
        id: data._id,
        username: data.username
    };
    data.save()
        .then(() => {
            res.status(201).send({ output: 'New client inserted', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Insertion failed => ${error}`});
        });
});

router.put('/update/:id', auth, (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                res.status(400).send({ output: 'Update error' });
            }
            const payload = {
                id: result._id,
                fullName: result.fullName,
                email: result.email,
                cpf: result.cpf,
                phone: result.phone,
                age: result.age
            };
            res.status(200).send({ output: 'Updated', payload });
        })
        .catch((error) => {
            res.status(500).send({ output: `Update error -> ${error}`});
        });
});

router.delete('/delete/:id', auth, (req, res) => {
    Client.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).send({ output: `Deletion error -> ${error}`});
        });
});

module.exports = router;
