const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware')

const orderController = require('../controller/ordrerController');


router.post('/', protect, orderController.addOrderItems)
router.get('/:id', protect,  orderController.getOrderById)


module.exports = router;

