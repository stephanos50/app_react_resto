const User = require('../models/User')
const Role = require('../models/Role')
const Order = require('../models/Order')
const  asyncHandler = require ('express-async-handler')
const ErrorResponse = require('../utils/errorResponse');
const { Op } = require('sequelize');

const { body, validationResult } = require("express-validator");



// @desc   Get all users
// @route  GET /api/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {

    const user = await User.findAll({
        where: {
            email: {
                [Op.ne]: "delete@exemple.be"
            }},
        include: [Role,Order]
    })
   
   
    
    if (!user) {
        return next(new ErrorResponse('User not found', 404));
    }
    res.json(user)
   
})

// @desc   Delete all users
// @route  DELETE /api/admin/:email
// @access Private/Admin
exports.deleteUsers = asyncHandler(async (req, res) => {
  
    const user = await User.findByPk(req.params.email)
    if (user) {
        user.setDataValue('email', 'delete@exemple.be')
        await user.save()
        res.status(201).json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc   Get user by ID
// @route  GET /api/admin/:email
// @access Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
   
    const user = await User.findByPk(req.params.id,{
        include: Role
    })
    if(user) {
        res.json(user)
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})


// @desc   Update user 
// @route  PUT /api/admin/:email
// @access Private/Admin
exports.updateUserById = [

    body('first_name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({ max: 20, min:5 }),
    body('last_name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({ max: 20, min:5 }),

    asyncHandler(async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Vérifier votre nom, prénom et email')
        }
        
        const user = await User.findByPk(req.params.email)

        if (user) {
            
            user.first_name = req.body.first_name || user.first_name
            user.last_name = req.body.last_name || user.last_name
            
            user.setRoles(req.body.role)
            
            const updatedUser = await user.save()
    
            res.json({
                email: updatedUser.email,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
            })
        } else {
            res.status(404)
            throw new Error('User not found ')
        }
    })

]








