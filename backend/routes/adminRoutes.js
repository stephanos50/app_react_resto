const express = require("express");
const router = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const adminController = require('../controller/adminController')

router.route('/').get(protect,admin,adminController.getUsers)
router.route('/:email').delete(protect,admin,adminController.deleteUsers)
router.route('/:email').get(protect,admin,adminController.getUserById)
router.route('/:email').put(protect,admin,adminController.updateUserById)



module.exports = router;