const express = require('express');
const app = express();
const dbConnect = require('./config/db');

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
});
