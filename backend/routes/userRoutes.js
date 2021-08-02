const express = require("express");
const router = express.Router();

const authentificaionUser = require('../controller/userController')
const profileUser = require('../controller/userController')
const registerUser = require('../controller/userController')
const updateUser = require('../controller/userController')

const protect = require('../middleware/authMiddleware')

router.post('/',registerUser.registerUser )
router.post('/login',authentificaionUser.authUser)

router.get('/profile',protect,profileUser.getUserProfile)
router.put('/profile', protect, updateUser.updateUserProfile)


module.exports = router;