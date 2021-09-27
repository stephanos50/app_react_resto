const Category = require('../models/Category');
const Product = require('../models/Product');
const Picture = require('../models/Picture');
const Allergen = require('../models/Allergen');
const Review = require('../models/Review');
const User = require('../models/User')
const  asyncHandler = require ('express-async-handler')
const { body, validationResult } = require("express-validator");
const sequelize = require('../models/sequelize');







// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const products = await Product.findAll({
        include: [Picture,Category,Allergen]
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
    // res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.findByPk(req.params.id,{
        include: [Picture,Category,Allergen,Review]
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
    
    asyncHandler( async function (req,res){

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Invalid input')
        }
    
        const {name,description,price,category,allergen} = req.body

        const product = await  Product.findByPk(req.body.id,{
          include: [Category, Allergen]
        })
       
        if (product) {
            product.name = name,
            product.description = description,
            product.price = price,
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
        include: [Allergen,Category]
    })
    if(product){
        await product.destroy()
        res.json({message: 'Product remove'})
    } else {
        res.status(400)
        throw new Error('Product not found')
    }
})


// @desc Create new review
// @route PUT /api/products/:id/reviews
// @access Private
exports.createProductReviews = [ 
    
    body('rating').not().notEmpty().matches(/[0-9]/),
    body('comment').not().notEmpty().matches(/^[0-9a-zA-Z !?'éàéç ]/),

    asyncHandler( async function (req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Le champ ne peut-être vide')
        }
       
        const {rating, comment} = req.body
        const review = await Review.findAll( {
            where: { 
                productId: req.params.id,
                userEmail: req.user.email
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

           
            const reviewsDetails = {
                name:req.user.first_name,
                rating: rating,
                comment:comment
            }
            const rewiew = await Review.create(reviewsDetails)
            rewiew.setDataValue('productId', req.params.id)
            rewiew.setDataValue('userEmail', req.user.email)
            const createReviews = await rewiew.save()
            res.status(201).json(createReviews)
        } else  { 
            res.status(404)
            throw new Error('Vous avez déja posté une annonce.')
           
        }
    })
]





