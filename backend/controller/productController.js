const Categorie = require('../models/Categorie');
const Product = require('../models/Plat');
const Picture = require('../models/Image');
const Allergene = require('../models/Allergene');
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
                 Categorie,
            ]
        });
        
        res.json(products);
    } catch (error) {
        next(error);
    }
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
exports.getProductById = asyncHandler(async function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.findByPk(req.params.id, {
        include: [
            Picture,
            Categorie,
            Allergene
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





