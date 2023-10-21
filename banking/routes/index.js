const express = require('express');

const auth = require('../middleware/auth');
const Banking = require('../models/Banking');


const router = express.Router();

router.get('/search', auth, (req, res) => {
    Banking.find()
        .then((result) => {
            const payload = result.map(data => ({
                id: data._id,
                bankName: data.bankName,
                accountType: data.accountType,
                holderName: data.holderName,
                cardLimit: data.cardLimit
            }));
            res.status(200).send({ output: 'Search completed', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Search failed => ${error}`});
        });
});

router.get('/search/:id', auth, (req, res) => {
    Banking.findById(req.params.id)
        .then((result) => {
            const payload = {
                id: result._id,
                bankName: result.bankName,
                accountType: result.accountType,
                holderName: result.holderName,
                cardLimit: result.cardLimit
            }
            res.status(200).send({ output: 'Banking info found', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Search failed => ${error}`});
        });
});

router.post('/add', auth, (req, res) => {
    const data = new Banking(req.body);
    const payload = {
        id: data._id,
        bankName: data.bankName,
        accountType: data.accountType,
        holderName: data.holderName,
        cardLimit: data.cardLimit
    };
    data.save()
        .then(() => {
            res.status(201).send({ output: 'New banking info inserted', payload });
        })
        .catch((error) => {
            res.status(400).send({ output: `Insertion failed => ${error}`});
        });
});

router.put('/update/:id', auth, (req, res) => {
    Banking.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            if (!result) {
                res.status(400).send({ output: 'Update error' });
            }
            const payload = {
                id: result._id,
                bankName: result.bankName,
                accountType: result.accountType,
                holderName: result.holderName,
                cardLimit: result.cardLimit
            };
            res.status(200).send({ output: 'Updated', payload });
        })
        .catch((error) => {
            res.status(500).send({ output: `Update error -> ${error}`});
        });
});

router.delete('/delete/:id', auth, (req, res) => {
    Banking.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(500).send({ output: `Deletion error -> ${error}`});
        });
});

module.exports = router;
