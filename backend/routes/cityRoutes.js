const express = require('express')
const {protect, admin} = require('../middleware/authMiddleware')

const routes = express.Router()
const cors = require('cors')

routes.use(cors());



const cityController = require('../controller/cityController')

routes.route('/').get(protect, cityController.getCities)

module.exports = routes