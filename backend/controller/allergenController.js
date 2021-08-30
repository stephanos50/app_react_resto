const Allergen = require('../models/Allergen');
const Product = require('../models/Product');
const  asyncHandler = require ('express-async-handler')


// @desc   get a allegen
// @route  GET /admin/allergen
// @access Private/Admin
exports.getAllergen = asyncHandler(async (req,res) => {
    
const allergens = await Allergen.findAll()
    if(allergens){
        return res.json(allergens)
    } else {
        res.status(404)
        throw new Error('Allergen Nothing Found')
    }
    
});


// @desc   create a allergen
// @route  CREATE /api/allergen
// @access Private/Admin
exports.createAllergen = asyncHandler( async(req,res) => {
    const allergenDetails = {
        name: req.body.allergen
    }
    const allergen = new Allergen(allergenDetails)
    await allergen.save()
    res.status(201).json({message: 'Allergen create'})
   
})

// @desc   delete a allergen by name
// @route  DELETE /api/allergen/:name
// @access Private/Admin
exports.deleteAllergen = asyncHandler(async (req,res) => {
    const allergen = await Allergen.findByPk(req.params.name)
    await allergen.destroy()
    res.status(201).json('Allergen remove')
   
})