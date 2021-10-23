const express = require("express");
const routes = express.Router();




const contactController = require('../controller/contactController')

routes.post('/', contactController.postMessage);



module.exports = routes