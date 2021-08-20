const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')

const userController = require('../controller/userController')

router.post('/',userController.registerUser)
router.route('/login').post(userController.authUser)
router.route('/profile').get(protect,userController.getUserProfile).put(protect, userController.updateUserProfile)


module.exports = router;