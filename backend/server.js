const express = require('express');
const dotenv = require('dotenv');
const apiRoute = require('./routes/api');

dotenv.config();

const app = express();

app.use('/api', apiRoute);
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const PORT = process.env.PORT || 5000

app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));
