const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const cors = require('cors')
routes.use(cors());


const allergenController = require('../controller/allergenController')

routes.route('/').get(protect,admin,allergenController.getAllergens)
routes.route('/:name').post(protect,admin,allergenController.createAllergen)
routes.route('/:id').delete(protect,admin,allergenController.deleteAllergen)

module.exports = routes;