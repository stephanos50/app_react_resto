const express = require("express");
const routes = express.Router();
const {protect, admin} = require('../middleware/authMiddleware')


const reviews = require('../controller/reviewController')

routes.route('/').get(protect,admin,reviews.userList)
routes.route('/:id').get(protect,admin,reviews.reviewsListById)
routes.route('/:id').delete(protect,admin,reviews.reviewDelete)


module.exports = routes;