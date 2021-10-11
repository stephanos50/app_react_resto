const  asyncHandler = require ('express-async-handler')
const Address = require('../models/Address')
const City = require('../models/City')
const User = require('../models/User')
const { body, validationResult } = require("express-validator");



// @desc   get a address
// @route  GET /address
// @access Private
exports.getAddressById = asyncHandler(async (req, res) => {
    try {
        const address = await Address.findByPk(req.body.id,{include:City})
    } catch (error) {
        
    }
});

// @desc   create a address
// @route  POST /address
// @access Private
exports.createAddress = [ 
    
    body('name').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/),
    body('number').not().notEmpty().matches(/^[0-9]/), 
    body('floor').not().notEmpty().matches(/^[0-9]/),

    asyncHandler(async (req, res) => {
       const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Invlide input')
        }
        const addressDetails = {
            name:req.body.name,
            number:req.body.number,
            floor:req.body.floor,
            cityId:req.body.city.id
        }
        const address = await Address.create(addressDetails)
        const createAddress = address.save()
        const user = await User.findOne({where:{email:req.body.email}})
        
        await address.setUsers(user)
        await user.save()
        
        if(createAddress){
            res.status(201).json({
                uid:address.id,
                name: address.name,
                number: address.number,
                floor:address.floor,
                cityId:address.cityId
            })
        } else {
            res.status(404)
            throw new Error('Enregistrement impossible')
        }
})];

// @desc   get a address
// @route  GET /admin/address
// @access Private/Admin
exports.createAdresss = asyncHandler(async (req, res) => {
   
    try {
        const addressDetails = {
            name: req.body.data.name,
            number: req.body.data.number,
            floor: req.body.data.floor,
        }
        const address_user_exist = await Address.findOne({
            where: {
                userEmail:req.body.data.email
            }
        })
        if(!address_user_exist){
            const address = await Address.create(addressDetails)
            address.setDataValue('userEmail', req.body.data.email)
            address.setDataValue('cityId',req.body.data.city.id)
            const createAddress = await address.save()
            res.status(201).json(createAddress)
        }else {
            address_user_exist = new Address({
                name: req.body.data.name,
                number: req.body.data.number,
                floor: req.body.data.floor,
                cityId:req.body.data.city.id,
                userEmail:req.body.data.email
            })
        }
        
    } catch (error) {
        res.status(404)
        throw new Error('register impossible')
    }
})



