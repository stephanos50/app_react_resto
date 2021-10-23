const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const roleController = require('../controller/roleController')

routes.route('/').post(protect,admin,roleController.createRole).get(protect,admin,roleController.getRoles)
routes.route('/:id').delete(protect,admin,roleController.deleteRole)

module.exports = routes;