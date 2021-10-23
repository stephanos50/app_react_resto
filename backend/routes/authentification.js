const express = require("express");
const routes = express.Router();




const password = require('../controller/authentification')

routes.route('/forgotpassword').post(password.forgotpassword);
routes.route('/resetpassword').post(password.resetPassword);

module.exports = routes