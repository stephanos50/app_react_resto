const User = require('../models/User');
const Role = require('../models/Role');
const Address = require('../models/Address');
const City = require('../models/City')
const Order = require('../models/Order')
const  asyncHandler = require ('express-async-handler')
const token = require('../utils/generateToken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;



// @desc Autehtification user && get token
// @route POST /api/users/login
// @access Public
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findByPk(email,{
        include: [Role,Address]
    })
    
    if( user && await user.validPassword(password)){
        res.json({
            _uuid: user._uuid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,

            address: user.address.name,
            number: user.address.number,
            floor: user.address.floor,
            city: user.cityName,

            role: user.roles.map((role) => role.name),
            token: token.generateToken(user._uuid),

            cities: await City.findAll()
        })
    } else {
        res.status(401)
        throw new Error('Invlid email or password')
    }
})

// @desc Register a new User user && get token
// @route POST /api/users
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
    const { first_name,last_name, email, password } = req.body
    
    const userExists = await User.findOne({
        where: { email:email },
    })

   if(userExists){
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        _uuid: uuidv4(),
        first_name: first_name,
        last_name: last_name,
        email: email,
        passwordHash: await bcrypt.hash(password,saltRounds),
    })
    user.setRoles([1])
    await user.save()
    if(user){
        res.status(201).json({
            _uuid: user._uuid,
            first_name: first_name,
            last_name:last_name,
            email: email,
            token: token.generateToken(user._uuid),
            cities: await City.findAll()
        })
        } else {
        res.status(400)
        throw new Error('Invalide user data')
    }
})

// @desc   Get user profile
// @route  Get /api/users/profile
// @access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findByPk(req.user.email,{include: Order})
    
    if (user) {
        res.json({
            _uuid : user._uuid,
            first_name : user.first_name,
            last_name : user.last_name,
            email: user.email,
            orders: user.orders
        })
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
})

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.body.id)
   
    
    if (user) {
        user.first_name = req.body.first_name || user.first_name
        user.last_name = req.body.last_name || user.last_name
        user.email = req.body.email || user.email
        
        if(req.body.password){
            user.password = req.body.password 
        }
        const updateUser = await user.save()
       
        res.json({
            _uuid : updateUser.uuid,
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
            email: updateUser.email,
            token: token.generateToken(updateUser._uuid),
            cities: await City.findAll()
        })
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
})