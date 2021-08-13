
const express = require("express");
const router = express.Router();

const productController = require('../controller/productController');


router.get('/', productController.getProducts);
router.get('/:uuid', productController.getProductByName);


module.exports = router;