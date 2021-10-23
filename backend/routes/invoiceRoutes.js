const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')



const invoices = require('../controller/invoiceControler')

routes.route('/').get(protect,admin,invoices.userinvoiceList)
routes.route('/:id').get(invoices.invoiceListById)
routes.route('/:id').delete(invoices.deleteInvoice)


module.exports = routes;