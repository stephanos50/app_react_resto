const express = require("express");
const routes = express.Router();


const cors = require('cors')
routes.use(cors());

const contactController = require('../controller/contactController')

routes.post('/', contactController.postMessage);



module.exports = routes