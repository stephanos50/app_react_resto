const express = require("express");
const router = express.Router();

const authentificaionUser = require('../controller/userController')
const profileUser = require('../controller/userController')
const registerUser = require('../controller/userController')
const updateUser = require('../controller/userController')

const protect = require('../middleware/authMiddleware')

router.route('/')
    .post(registerUser.registerUser )
router.route('/login')
    .post(authentificaionUser.authUser)
router.route('/profile')
    .get(protect,profileUser.getUserProfile)
    .put(protect, updateUser.updateUserProfile)


module.exports = router;