const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')

const bodyParser = require('body-parser')
const cors = require('cors')
routes.use(cors());
//body-parser
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())
const jsonParser = bodyParser.json();


const categoryController = require('../controller/categoryController')

routes.route('/').get(categoryController.getCategories)
routes.route('/:name').post(protect,admin,categoryController.createCategory)
routes.route('/:id').delete(protect,admin,categoryController.deleteCategory)


module.exports = routes;