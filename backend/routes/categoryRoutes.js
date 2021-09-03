const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const categoryController = require('../controller/categoryController')

router.route('/').get(protect,admin,categoryController.getCategories)
router.route('/:name').post(protect,admin,categoryController.createCategory)
router.route('/:id').delete(protect,admin,categoryController.deleteCategory)


module.exports = router;