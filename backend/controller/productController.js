const Category = require('../models/Category');
const Product = require('../models/Product');
const Allergen = require('../models/Allergen');
const Review = require('../models/Review');
const Order = require('../models/Order');
const ProductOrder = require('../models/ProductOrder')
const User = require('../models/User')
const  asyncHandler = require ('express-async-handler')
const { body, validationResult } = require("express-validator");
const sequelize = require('../models/sequelize');
const jwt = require('jsonwebtoken')







// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const products = await Product.findAll({
        include: [Category,Allergen,Review]
    });
    if (products) {
        res.json(products);
    } else {
        res.status(404)
        throw new Error('Products not found')
    }
    
   
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
exports.getProductById = asyncHandler(async function(req, res){
    
    res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.findByPk(req.params.id,{
        include: [Category,Allergen,{model:Review,include:[{model:User}]}]
        
    });
    if(product){
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not exist')
    }
})


// @desc Create a product
// @route POST /api/products
// @access Private/Admin
exports.createProduct = asyncHandler( async function (req,res){
    const product = new Product({
            url:'',
            name: 'Sample name',
            description: 'Sample description',
            price: 1,
            rate: 0,
            comment:0,
            categoryId:1
            
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})

// @desc Update a product
// @route PUT /api/products/:name
// @access Private/Admin
exports.updateProduct =  [

    body('name').notEmpty(),
    body('price').notEmpty().isNumeric(),
    body('category').notEmpty().trim(),
    body('description').isLength({max : 250}).withMessage(' Longueur de la description 500 caractères'),
   
    
    asyncHandler( async function (req,res){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Vérifiez vos champs ! Longueur de la description 200 caractères')
        }
    
        const {name,description,price,category,allergen} = req.body

        
        
        const cast = Number(price)
        const prix = (Math.round((cast + Number.EPSILON) * 100) / 100);
       
        const product = await  Product.findByPk(req.body.id,{
          include: [Category, Allergen]
        })
       
        if (product) {
            product.name = name,
            product.description = description,
            product.price = prix,
            product.categoryId = category,
            await product.save()
            const allergie = allergen.map((item) =>  (item.id))
            await product.setAllergens(allergie)
            res.status(201).json(product)
        } else {
            res.status(404)
            throw new Error('Product not found ')
        }
    })
]

// @desc Delete a product
// @route DELETE /api/products/:name
// @access Private/Admin
exports.deleteProduct = asyncHandler(async function(req,res){
    const product = await Product.findByPk(req.params.id, {
        include: [Allergen,Category,ProductOrder]
    })
    const food = await ProductOrder.findOne({
        where:{
            productId: req.params.id
        }
    })
   

    if(product && !food){
        await product.destroy()
        res.status(201).json({message: 'Product remove'})
    } else {
        res.status(400)
        throw new Error('Product exist in Order ')
    }
})


// @desc Create new review
// @route PUT /api/products/:id/reviews
// @access Private
exports.createProductReviews = [ 
    
    body('rating').not().notEmpty().matches(/[0-9]/),
    body('comment').not().notEmpty().matches(/^[0-9a-zA-Z !?'éàéç ]/).isLength({  max: 50 }),

    asyncHandler( async function (req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Longueur maximum 50 caractères')
        }
        const token = req.headers.authorization.split(' ')[1]
            
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({
            where: { _uuid : decoded.id},
            
        })
       
        const {rating, comment} = req.body
     
        const review = await Review.findAll( {
            where: { 
                productId: req.params.id,
                userId: user.id
                
            }
        })
       
    
        if (!review || Object.keys(review).length === 0){
            const product = await Product.findByPk(req.params.id);
            const result = await Review.findAndCountAll({
                where: {
                    productId:req.params.id
                },
              })
              
              const rates = await product.calculRate(product.rate, rating, result.count);
              product.setDataValue('rate',rates)
              const int_comment = await product.setComment(product.comment)
              product.setDataValue('comment', int_comment)
              await product.save()

            const date = new Date()
            const reviewsDetails = {
                rating: rating,
                comment:comment,
                date:date
            }
            const rewiew = await Review.create(reviewsDetails)
            rewiew.setDataValue('productId', req.params.id)
            rewiew.setDataValue('userId', req.user.id)
            const createReviews = await rewiew.save()
            res.status(201).json(createReviews)
        } else  { 
            res.status(404)
            throw new Error('Vous avez déja posté cette annonce.')
           
        }
    })
]





