const express = require('express');
const { dbConnection } = require('./database/configuration');
const cors = require('cors');

require('dotenv').config();

const app = express();

// DB Connection
dbConnection();

//CORS
app.use(cors());

//Parsing body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo");

})

