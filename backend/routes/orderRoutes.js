const express = require("express");
const routes = express.Router();

const cors = require('cors')
routes.use(cors());

const {protect, admin} = require('../middleware/authMiddleware')
const orderController = require('../controller/ordrerController');

routes.route('/').post(protect, orderController.addOrderItems).get(protect,orderController.getOrders)
routes.get('/:id', protect,  orderController.getOrderById)
// routes.get('/myorders',protect, orderController.getMyOrders)
routes.put('/:id/pay', protect, orderController.updateOrderToPaid)
routes.route('/:id/deliver').put(protect,orderController.updateOrderToDelivered)
routes.route('/:id').delete(protect,orderController.deleteViewOrder)




module.exports = routes;

