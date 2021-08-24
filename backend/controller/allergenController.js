const Allergen = require('../models/Allergen');
const Product = require('../models/Product');
const  asyncHandler = require ('express-async-handler')


// @desc Get a allegen
// @route GET /admin/allergen
// @access Public
// exports.getAllergen = asyncHandler(async (req,res) => {
    
//     const allergen = await Product.findOne({
//             where: {id: req.params.id},
//             include: [Allergen]
//     });
//     if (allegen) {
//         const getAllegen = allergen.Allergenes.map((item) => item.nom)
//         res.json(getAllegen);
//     } else {
//         res.status(404)
//         throw new Error('Allegen not found')
//     }
// });
// @desc Get a allegen
// @route GET /admin/allergen
// @access Public
exports.getAllergen = asyncHandler(async (req,res) => {
    console.log(req.params.name)
    const product = await Product.findByPk(req.params.name, {
        include: Allergen,
      });
    const allergens = await Allergen.findAll()




    if (allergens) {
        const selectedAllergens = product.allergens.map(allergen => allergen.name);
        for (let i = 0; i < allergens.length; i++) {
        const allergen = allergens[i];
        if (selectedAllergens.indexOf(allergen.name) > -1) {
            allergen.checked = true;
        }
      }
        return res.json(allergens)
    } else {
        res.status(404)
        throw new Error('Nothing found')
    }
    
   
});

// @desc create a allergen
// @route CREATE /api/allergen
// @access Private/Admin
exports.createAllergen = asyncHandler( async(req,res) => {
    const allergenDetails = {
        name: req.body.allergen
    }
    const allergen = new Allergen(allergenDetails)
    const createAllergen = await allergen.save()
    res.status(201).json({message: 'Allergen create'})
   
})

// @desc delete a allergen by name
// @route DELETE /api/allergen/:name
// @access Private/Admin
exports.deleteAllergen = asyncHandler(async (req,res) => {
    const allergen = await Allergen.findByPk(req.params.name)
    await allergen.destroy()
    res.status(201).json('Allergen remove')
   
})