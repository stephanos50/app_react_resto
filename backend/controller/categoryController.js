const  asyncHandler = require ('express-async-handler')
const Category = require('../models/Category')
const Product = require('../models/Product')
const { body, validationResult } = require("express-validator");

// @descc Get caterogies
// @route Get /api/categories
// @access Public
exports.getCategories =  asyncHandler(async (req,res) => {
    const categories = await Category.findAll()
   
    if (categories) {
        return res.json(categories)
    } else {
        res.status(401)
        throw new Error('Nothing found')
    }
});

// @desc Delete a caterogy 
// @route DELETE /api/categories/:id
// @access Private/Admin
exports.deleteCategory = asyncHandler(async (req,res) =>{
    const category = await Category.findByPk(req.params.id, {include: Product})
    const deleteCategory = await category.destroy()
    if(deleteCategory){
        res.json({message: 'Categogy remove'})
    } else {
        res.status(404)
        throw new Error('Category not found')
    }
});


// @desc create a caterogy 
// @route CREATE /api/categories/:name
// @access Private/Admin
exports.createCategory = [ 
    body('name').notEmpty(),

    asyncHandler(async (req,res) => {
       
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Le champs est vide')
        }
         const category = await Category.findOne({
             where: {
                 name:req.body.name
             }
         })
        if(!category){
            const category = await Category.create({name:req.body.name})
             await category.save()
             res.status(202)
             throw new Error('La categorie a été ajouté')
           
         } else {
             res.status(404)
             throw new Error('La categorie existe')
         }
         
     })

];
   




