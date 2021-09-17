const express = require("express");
const routes = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
routes.use(cors());

//body-parser
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())
const jsonParser = bodyParser.json();




const {protect, admin} = require('../middleware/authMiddleware')
const orderController = require('../controller/ordrerController');

routes.route('/').post(protect, orderController.addOrderItems).get(protect, admin, orderController.getOrders)
routes.get('/:id', protect,  orderController.getOrderById)
routes.get('/myorders',protect, orderController.getMyOrders)
routes.put('/:id/pay', protect, orderController.updateOrderToPaid)
routes.route('/:id/deliver').put(protect,orderController.updateOrderToDelivered)




module.exports = routes;

