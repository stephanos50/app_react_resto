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


const roleController = require('../controller/roleController')

routes.route('/').get(protect,admin,roleController.getRoles)
routes.route('/:name').post(protect,admin,roleController.createRole)
routes.route('/:id').delete(protect,admin,roleController.deleteRole)

module.exports = routes;