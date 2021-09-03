const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const allergenController = require('../controller/allergenController')

router.route('/').get(protect,admin,allergenController.getAllergens)
router.route('/:name').post(protect,admin,allergenController.createAllergen)
router.route('/:id').delete(protect,admin,allergenController.deleteAllergen)

module.exports = router;