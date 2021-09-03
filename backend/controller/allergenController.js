const Allergen = require('../models/Allergen');
const Product = require('../models/Product');
const  asyncHandler = require ('express-async-handler')


// @desc   get a allegens
// @route  GET /admin/allergens
// @access Private/Admin
exports.getAllergens = asyncHandler(async (req,res) => {
    
const allergens = await Allergen.findAll()
    if(allergens){
        return res.json(allergens)
    } else {
        res.status(404)
        throw new Error('Allergen Nothing Found')
    }
    
});


// @desc   create a allergen
// @route  CREATE /api/allergen/:name
// @access Private/Admin
exports.createAllergen = asyncHandler( async(req,res) => {
   
    const allergen = await Allergen.findOne({
        where: {
            name:req.params.name
        }
    })
    if(!allergen){
        console.log(req.params)
        const allergen = await  Allergen.create({name:req.params.name})
        await allergen.save()
        res.status(201).json({message: 'Allergen create'})
    } else {
        res.status(404)
        throw new Error('Allergen  already exist')
    }
    
   
})

// @desc   delete a allergen by name
// @route  DELETE /api/allergen/:name
// @access Private/Admin
exports.deleteAllergen = asyncHandler(async (req,res) => {
    const allergen = await Allergen.findByPk(req.params.id)
    await allergen.destroy()
    res.status(201).json('Allergen remove')
   
})