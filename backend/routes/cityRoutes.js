const express = require('express')
const {protect, admin} = require('../middleware/authMiddleware')

const router = express.Router()


const cityController = require('../controller/cityController')

router.route('/').get(protect, cityController.getCities)

module.exports = router