const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(
    `mongodb://${config.get(dbConfig.host)}:${config.get(dbConfig.port)}/${config.get(dbConfig.dbName)}`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true
    }
);