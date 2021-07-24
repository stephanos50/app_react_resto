
const express = require("express");
const router = express.Router();

const productController = require('../controller/productController');
const pictureController = require('../controller/pictureController');
const allergenController = require('../controller/allergenController');

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.get('/image/:id', pictureController.getPicture);

router.get('/allergenes/:id', allergenController.getAllergen);



module.exports = router;