const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const cors = require('cors');
const authRoute = require('./routes/api/auth');

dbConnect();

app.use(express.json());
app.use(cors());

app.use('/api/auth/', authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`)
});
