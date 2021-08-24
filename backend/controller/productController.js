const Category = require('../models/Category');
const Product = require('../models/Product');
const Picture = require('../models/Picture');
const Allergen = require('../models/Allergen');
const  asyncHandler = require ('express-async-handler')
const { v4: uuidv4 } = require('uuid');




// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = asyncHandler(async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const products = await Product.findAll({
            include: [
                 Picture,
                 Category,
            ]
        });
        
        res.json(products);
    } catch (error) {
        next(error);
    }
})

// @desc Fetch single product
// @route GET /api/products/:name
// @access Public
exports.getProductByName = asyncHandler(async function(req, res){
    console.log('getProductByName')
    res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.findOne({
        where: {
            _uuid: req.params.uuid
        },
        include: [Picture,Category,Allergen]
    });

    if(product !== null){
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc Create a product
// @route POST /api/products
// @access Private/Admin
exports.createProduct = asyncHandler( async function (req,res){
    console.log('createProduct')
        const product = new Product({
            name: 'Sample name',
            _uuid: uuidv4(),
            description: 'Sample description',
            price: 0,
            cote: 0,
            
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    
})

// @desc Update a product
// @route PUT /api/products/:name
// @access Private/Admin
exports.updateProduct = asyncHandler( async function (req,res){
    const {_uuid,name,description,price,cote, category,allergen} = req.body
    console.log(req.body)
    const product = await  Product.findOne({
        where: {
            _uuid:_uuid
        },
        include: [Category, Allergen]
    })
    
    if (product) {
        product.description = description,
        product.price = price,
        product.cote = cote
        product.categoryName = category
        await product.save()
        const allergie = allergen.map((item) =>  (item.name))
        await product.setAllergens(allergie)
           
        
        
        res.status(201).json(product)
    } else {
        res.status(404)
        throw new Error('Product not found ')
    }

    
    
})

// @desc Delete a product
// @route DELETE /api/products/:name
// @access Private/Admin
exports.deleteProduct = asyncHandler(async function(req,res){
    console.log('deleteProduct')
    const product = await Product.findByPk(req.params.name, {
        include: [Allergen,Category]
    })
    if(product){
        await product.destroy()
        res.json({message: 'Product remove'})
    } else {
        res.status(400)
        res.json('Product not found')
    }
})





