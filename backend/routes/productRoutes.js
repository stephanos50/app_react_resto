
const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')
const productController = require('../controller/productController');

router.route('/').get(productController.getProducts).post(protect,admin,productController.createProduct);


router.route('/:id').get(productController.getProductById);
router.route('/:id').delete(protect,admin,productController.deleteProduct)
router.route('/:id').put(protect,admin,productController.updateProduct)
router.route('/:id/reviews').post(protect,productController.createProductReviews)

module.exports = router;