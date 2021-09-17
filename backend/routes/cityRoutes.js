const express = require('express')
const {protect, admin} = require('../middleware/authMiddleware')

const routes = express.Router()

const bodyParser = require('body-parser')

const cors = require('cors')
routes.use(cors());
//body-parser
routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json())
const jsonParser = bodyParser.json();


const cityController = require('../controller/cityController')

routes.route('/').get(protect, cityController.getCities)

module.exports = routes