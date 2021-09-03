const  asyncHandler = require ('express-async-handler')
const Category = require('../models/Category')
const Product = require('../models/Product')

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
// @route CREATE /api/categories
// @access Private/Admin
exports.createCategory = asyncHandler(async (req,res) => {
    const category = await Category.findOne({
        where: {
            name:req.params.name
        }
    })

    if(!category){
        const category = await Category.create({name:req.params.name})
        await category.save()
        res.json({message: 'Categogy created'})
    } else {
        res.status(404)
        throw new Error('Category exist ')
    }
    
});

// @desc Update a category
// @route PUT /api/category/:id
// @access Private/Admin
exports.updateCategory = asyncHandler( async function (req,res){
    
    const {name} = req.body
    const category = await  Category.findByPk(req.body.id)
   
    if (category) {
        category.name = name,
        await category.save()
        res.status(201).json(category)
    } else {
        res.status(404)
        throw new Error('Category not found ')
    }
})

