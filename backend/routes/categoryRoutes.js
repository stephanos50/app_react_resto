const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const cors = require('cors')
routes.use(cors());



const categoryController = require('../controller/categoryController')

routes.route('/').get(categoryController.getCategories)
routes.route('/').post(protect,admin,categoryController.createCategory).get(protect, admin, categoryController.getCategories)
routes.route('/:id').delete(protect,admin,categoryController.deleteCategory)


module.exports = routes;