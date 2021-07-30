const User = require('../models/User');
const Role = require('../models/Role');
const Address = require('../models/Address');
const  asyncHandler = require ('express-async-handler')

const token = require('../utils/generateToken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;


// @desc Register a new User user && get token
// @route POST /api/users
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {

    const { first_name,family_name, email,name, number, floor, password } = req.body;
    const userExists = await User.findOne({
        where: {
            email:email
        }
    })
    if(userExists){
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        _uuid: uuidv4(),
        first_name: first_name,
        family_name: family_name,
        email: email,
        passwordHash:  await bcrypt.hash(password,saltRounds)
    })
    await user.setRoles([1]);
    
    const address = await Address.create({
        name: name,
        number: number,
        floor: floor,
        userEmail: email
    })
    await user.save();
    
    
    if(user){
        res.status(201).json({
            _uuid: user._uuid,
            first_name: first_name,
            family_name:family_name,
            email: email,
            name: name,
            number: number,
            floor: floor,
            userEmail: email,
            token: token.generateToken(user._uuid)
        })
       
        
       
        
    } else {
        res.status(400)
        throw new Error('Invalide user data')
    }

    
})



// @desc Autehtification user && get token
// @route POST /api/users/login
// @access Public
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({where:{email:email}, include: Role})
    const validated = await user.validPassword(password);
    
    if(user && validated){
        res.json({
            _uuid: user._uuid,
            username: user.username,
            email: user.email,
            role: user.roles.map((role) => role.name),
            token: token.generateToken(user._uuid)
        })
    } else {
        res.status(401)
        throw new Error('Invlid email or password')
    }

    
})



// @desc   Get user profile
// @route  Get /api/users/profile
// @access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
    const uuid = req.user.id;
    const user = await User.findOne( {uuid,include: Role})
    console.log(user)
    if (user) {
        res.json({
            _uuid: user._uuid,
            username: user.username,
            email: user.email,
            role: user.roles.map((role) => role.name)
            
           
        })
    } else {
        res.status(401)
        throw new Error('User not found ')
    }
    
    
})