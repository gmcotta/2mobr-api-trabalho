const mongoose = require('mongoose');
const config = require('../config');


const dbUrl = config.dbPath;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
