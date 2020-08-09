const express = require('express');
const { dbConnection } = require('./database/configuration');

require('dotenv').config();

const app = express();

// DB Connection
dbConnection();

//Parsing body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo");

})

