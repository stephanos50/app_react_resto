
const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')
const productController = require('../controller/productController');

router.route('/').get(productController.getProducts).post(protect,admin,productController.createProduct);
router.get('/:uuid', productController.getProductByName);
router.route('/:name').delete(protect,admin,productController.deleteProduct)
router.route('/:uuid').put(protect,admin,productController.updateProduct)






module.exports = router;