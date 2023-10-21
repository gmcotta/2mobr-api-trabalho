require('dotenv').config();

const cors = require('cors');
const express = require('express');

const router = require('./routes');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/user', router);

app.listen(process.env.PORT, () => {
    console.log(`User server is online on http://localhost:${process.env.PORT}`);
});
