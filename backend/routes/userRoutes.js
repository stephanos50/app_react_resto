const express = require("express");
const router = express.Router();

const authentificaionUser = require('../controller/userController');
const profileUser = require('../controller/userController');
const registerUser = require('../controller/userController')

const protect = require('../middleware/authMiddleware')

router.post('/',registerUser.registerUser );
router.post('/login',authentificaionUser.authUser);
//router.route('/profile').get(protect,profileUser.getUserProfile);
router.get('/profile',protect,profileUser.getUserProfile);


module.exports = router;