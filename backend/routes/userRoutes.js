const express = require("express");
const routes = express.Router();

const bodyParser = require('body-parser')
const cors = require('cors')
routes.use(cors());

//body-parser
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())
const jsonParser = bodyParser.json();



const {protect} = require('../middleware/authMiddleware')

const userController = require('../controller/userController')

routes.post('/',userController.registerUser)
routes.route('/login').post(userController.authUser)
routes.route('/profile').get(protect,userController.getUserProfile).put(protect, userController.updateUserProfile)


module.exports = routes;