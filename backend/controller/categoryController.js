const  asyncHandler = require ('express-async-handler')
const Category = require('../models/Category')
const Product = require('../models/Product')

// @descc Get caterogy
// @route Get /api/categories
// @access Public
exports.getCategory =  asyncHandler(async (req,res) => {

  
    const categories = await Category.findAll()
    if (categories) {
        return res.json(categories)
    } else {
        res.status(401)
        throw new Error('Nothing found')
    }
    
});

// @desc Delete a caterogy 
// @route DELETE /api/categories/:name
// @access Private/Admin
exports.deleteCategory = asyncHandler(async (req,res) =>{
    const category = await Category.findByPk(req.params.name, {include: Product})
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
exports.createCategory = asyncHandler(async (req,res) => {
    
    const category = await Category.findByPk(req.body.name)
   
    if(!category){  
        const category = new Category(req.body.name)
        const createCategory = await category.save()
        res.status(201).json(createCategory)
    } else {
        res.status(404)
        throw new Error('Category exist')
    }
});

