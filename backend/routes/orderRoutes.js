const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')

const orderController = require('../controller/ordrerController');

router.route('/').post(protect, orderController.addOrderItems).get(protect, admin, orderController.getOrders)
router.get('/:id', protect,  orderController.getOrderById)
router.get('/myorders',protect, orderController.getMyOrders)
router.put('/:id/pay', protect, orderController.updateOrderToPaid)
router.route('/:id/deliver').put(protect,orderController.updateOrderToDelivered)




module.exports = router;

