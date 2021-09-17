const express = require("express");
const routes = express.Router();

const cors = require('cors')
routes.use(cors());





const {protect} = require('../middleware/authMiddleware')

const userController = require('../controller/userController')

routes.post('/',userController.registerUser)
routes.route('/login').post(userController.authUser)
routes.route('/profile').get(protect,userController.getUserProfile).put(protect, userController.updateUserProfile)


module.exports = routes;