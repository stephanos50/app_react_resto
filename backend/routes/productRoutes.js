
const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')
const productController = require('../controller/productController');

const bodyParser = require('body-parser')
const cors = require('cors')
routes.use(cors());

//body-parser
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())
const jsonParser = bodyParser.json();



routes.route('/').get(productController.getProducts).post(protect,admin,productController.createProduct);


routes.route('/:id').get(productController.getProductById);
routes.route('/:id').delete(protect,admin,productController.deleteProduct)
routes.route('/:id').put(protect,admin,productController.updateProduct)
routes.route('/:id/reviews').post(protect,productController.createProductReviews)

module.exports = routes;