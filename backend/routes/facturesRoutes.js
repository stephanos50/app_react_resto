const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')

const cors = require('cors')
routes.use(cors());

const invoices = require('../controller/invoiceControler')

routes.route('/').get(protect, admin,invoices.invoicesList)



module.exports = routes;