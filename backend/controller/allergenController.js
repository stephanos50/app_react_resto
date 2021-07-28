const Allergen = require('../models/Allergen');
const Product = require('../models/Product');


exports.getAllergen = async function(req,res,next){
    
    try {
        const allergen = await Product.findOne({
            where: {id: req.params.id},
            include: [Allergen]
        
        });
        const allergie = allergen.Allergenes.map((item) => item.nom)
        res.json(allergie);
    } catch (error) {
        next(error);
    }
}