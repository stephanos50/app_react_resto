const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const roleController = require('../controller/roleController')

router.route('/').get(protect,admin,roleController.getRoles)
router.route('/:name').post(protect,admin,roleController.createRole)
router.route('/:id').delete(protect,admin,roleController.deleteRole)

module.exports = router;