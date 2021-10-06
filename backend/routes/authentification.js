const express = require("express");
const routes = express.Router();


const cors = require('cors')
routes.use(cors());

const password = require('../controller/authentification')

routes.route('/forgotpassword').post(password.forgotpassword);
routes.route('/resetpassword').post(password.resetPassword);

module.exports = routes