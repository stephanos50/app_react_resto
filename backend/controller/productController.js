const Category = require('../models/Category');
const Product = require('../models/Product');
const Picture = require('../models/Picture');
const Allergen = require('../models/Allergen');
const  asyncHandler = require ('express-async-handler')


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
    
    res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.findOne({
        where: {
            _uuid: req.params.uuid
        },
        include: [
            Picture,
            Category,
            Allergen
        ]
    });

    if(product !== null){
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
        
    
    
})

exports.putProduct = async function(req,res,next){
    try {
        res.send('I am Put Backend');
    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async function(req,res,next){
    try {
        res.send('I am Delete Backend');
    } catch (error) {
        next(error);
    }
}





