const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const adminController = require('../controller/adminController')

routes.route('/').get(protect,admin,adminController.getUsers)
routes.route('/:email').delete(protect,admin,adminController.deleteUsers)
routes.route('/:id').get(protect,admin,adminController.getUserById)
routes.route('/:email').put(protect,admin,adminController.updateUserById)

module.exports = routes;