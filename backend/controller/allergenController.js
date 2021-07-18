const Allergen = require('../models/Allergene');
const Plat = require('../models/Plat');


exports.getAllergen = async function(req,res,next){
    
    try {
        const allergen = await Plat.findOne({
            where: {id: req.params.id},
            include: [Allergen]
        
        });
        const allergie = allergen.Allergenes.map((item) => item.nom)
        res.json(allergie);
    } catch (error) {
        next(error);
    }
}