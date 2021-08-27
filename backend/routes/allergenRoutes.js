const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const allergenController = require('../controller/allergenController')

router.route('/').get(protect,admin,allergenController.getAllergen)
router.route('/').post(protect,admin,allergenController.createAllergen)
router.route('/:name').delete(protect,admin,allergenController.deleteAllergen)

module.exports = router;