const express = require("express");
const routes = express.Router();
const {protect } = require('../middleware/authMiddleware')


const cors = require('cors')
routes.use(cors());



const address = require('../controller/addressController')

routes.route('/').get(protect,address.getAddressById)


routes.route('/shipping').post(address.createAddress)


module.exports = routes;