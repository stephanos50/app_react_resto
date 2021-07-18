const Categorie = require('../models/Categorie');
const Product = require('../models/Plat');
const Picture = require('../models/Image');
const Allergene = require('../models/Allergene');

// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = async function(req, res, next){
    try {
        const products = await Product.findAll({
            include: [
                 Picture,
                 Categorie,
                 Allergene,
            ]
            
        });
        res.json(products);
    } catch (error) {
        next(error);
    }
}

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
exports.getProduct = async function(req, res, next){
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                Picture,
                Categorie
           ]
        });
        res.json(product);
    } catch (error) {
        next(error);
    }
    
}

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





