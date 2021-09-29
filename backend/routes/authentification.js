const express = require("express");
const routes = express.Router();


const cors = require('cors')
routes.use(cors());

const password = require('../controller/authentification')
routes.post('/forgotpassword', password.forgotPassword );
routes.put('/resetpassword/:resettoken', password.resetPassword);


module.exports = routes