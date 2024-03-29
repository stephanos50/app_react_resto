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
const { body, validationResult } = require("express-validator");
const ErrorResponse = require('../utils/errorResponse');
const sequelize = require('../models/sequelize')




// @desc Autehtification user && get token
// @route POST /api/users/login
// @access Public
exports.authUser = 
[
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    
    asyncHandler(
    async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400)
        throw new Error('Invlid email or password')
    }
   
    const { email, password } = req.body
    
    const user = await User.findOne({
        where: {
            email:email,
        },
        include: [Role,Order,Address]
    })

    if(!user) {
        res.status(401)
        throw new Error('Invalid email or password')
    }
   
    const address = await Address.findOne({
        include:[City,{model:User,where:{id:user.id}}],
        order: [ [ 'id', 'DESC' ]]
    })
    
    
    
    if( user && await user.validPassword(password)){
        const names = user.roles.map((role) => role.name)
        const [name] = names
        res.json({
            
            email: user.email,
            _uuid: user._uuid,
            first_name: user.first_name,
            last_name: user.last_name,
            role: name,
            address: address,
            orders:user.orders,
            token: token.generateToken(user._uuid),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})];

// @desc Register a new User user && get token
// @route POST /api/users
// @access Public
exports.registerUser = [ 
    body('first_name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({ max: 20, min:5 }),
    body('last_name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({ max: 20, min:5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    
    asyncHandler(async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Vérifier votre nom, prénom et email')
        }

        const { first_name,last_name, email, password } = req.body

        const user = await User.findOne({
            where: { email:email },
            include: Role
        })

        if(user){
            res.status(400)
            throw new Error('User already exist')
        }
        // BEGIN TRANSACTION
        const transaction = await sequelize.transaction();

        try {

            await User.create({
                email: email,
                _uuid: uuidv4(),
                first_name: first_name,
                last_name: last_name,
                passwordHash: await bcrypt.hash(password,saltRounds),
                   
            },{ transaction });

            await Address.create({
                name: 'Une adresse',
                number: 1,
                floor: 1,
                cityId:1
            }, { transaction });

            await transaction.commit(); 
            
              
        } catch (error) {

            await transaction.rollback();

        } finally {

            const user = await User.findOne({
                order: [ [ 'id', 'DESC' ]],
                include:[Role,Order,Address]
            });
            const address = await Address.findOne({
                order: [ [ 'id', 'DESC' ]],
                include:City
            });

            const transaction = await sequelize.transaction();

            try {

                await user.setAddresses(address.id),{ transaction };
                await user.setRoles(2),{ transaction };
                await transaction.commit(); 

            } catch (error) {
                await transaction.rollback();
            }
          

            const names = user.roles.map((role) => role.name)
            const [name] = names
            res.status(201).json({
                email: email,
                _uuid: user._uuid,
                first_name: first_name,
                last_name:last_name,
                role: name,
                orders: user.orders,
                address: address,
                token: token.generateToken(user._uuid),
            })
           
        }
    })]; 

// @desc   Get user profile
// @route  Get /api/users/profile
// @access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findByPk(req.user.id,{include: [Order, Role,Address]})
    if (user) {
       
        const names = user.roles.map((role) => role.name)
        const [name] = names
        res.json({
           
            email: user.email,
            _uuid : user._uuid,
            first_name : user.first_name,
            last_name : user.last_name,
            orders: user.orders,
            role: name,
            address: user.address,
           
        })
    } else {
        res.status(404)
        throw new Error('User not found ')
    }
})

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
exports.updateUserProfile = [
   
    body('email').notEmpty(),
    body('first_name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({min:5,max: 20, }),
    body('last_name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({ min:5,max: 20 }),

   
    asyncHandler(async (req, res) => {
        let token
        if(req.headers.authorization.startsWith('Bearer')){
           token = req.headers.authorization.split(' ')[1]
        }
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Invlide input')
        } else {
            const user = await User.findByPk(req.user.id, {
                include: [Order, Role, Address]
            })
            

            
            const id = user.addresses.map((item) => item.id)
            const last_entry = id.slice(-1)[0]

            const address = await Address.findByPk(last_entry,{include:City})
            
            if (user) {
                
                const names = user.roles.map((role) => role.name)
                const [name] = names
                user.first_name = req.body.first_name || user.first_name
                user.last_name = req.body.last_name || user.last_name
                if(req.body.password){
                    user.password = req.body.password 
                }
                const updateUser = await user.save()
                res.json({
                    
                    email: updateUser.email,
                    _uuid : updateUser.uuid,
                    first_name: updateUser.first_name,
                    last_name: updateUser.last_name,
                    orders:user.orders,
                    role: name,
                    address:address,
                    token: token,
                })
            } else {
                res.status(404)
                throw new Error('User not found ')
            }
        }
        
    })
]





