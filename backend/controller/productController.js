const Category = require('../models/Category');
const Product = require('../models/Product');
const Picture = require('../models/Picture');
const Allergen = require('../models/Allergen');
const  asyncHandler = require ('express-async-handler')





// @desc Fetch all products
// @route GET /api/products
// @access Public
exports.getProducts = asyncHandler(async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const products = await Product.findAll({
        include: [Picture,Category,Allergen]
    });
    if (products) {
        res.json(products);
    } else {
        res.status(404)
        throw new Error('Products not found')
    }
    
   
})

// @desc Fetch single product
// @route GET /api/products/:name
// @access Public
exports.getProductById = asyncHandler(async function(req, res){
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "*");
    const product = await Product.findByPk(req.params.id,{
        include: [Picture,Category,Allergen]
    });

    if(product){
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product not exist')
    }
})


// @desc Create a product
// @route POST /api/products
// @access Private/Admin
exports.createProduct = asyncHandler( async function (req,res){
    const product = new Product({
            name: 'Sample name',
            description: 'Sample description',
            price: 0,
            cote: 0,
            categoryId:1
            
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    
})

// @desc Update a product
// @route PUT /api/products/:name
// @access Private/Admin
exports.updateProduct = asyncHandler( async function (req,res){
    
    const {name,description,price,cote,category,allergen} = req.body
    console.log(req.body)
    console.log(category)
    const product = await  Product.findByPk(req.body.id,{
      include: [Category, Allergen]
    })
   
    if (product) {
        product.name = name,
        product.description = description,
        product.price = price,
        product.cote = cote
        product.categoryId = category
        await product.save()
        const allergie = allergen.map((item) =>  (item.id))
        await product.setAllergens(allergie)
        res.status(201).json(product)
    } else {
        res.status(404)
        throw new Error('Product not found ')
    }
})

// @desc Delete a product
// @route DELETE /api/products/:name
// @access Private/Admin
exports.deleteProduct = asyncHandler(async function(req,res){
    console.log('deleteProduct')
    const product = await Product.findByPk(req.params.id, {
        include: [Allergen,Category]
    })
    if(product){
        await product.destroy()
        res.json({message: 'Product remove'})
    } else {
        res.status(400)
        res.json('Product not found')
    }
})

// exports.updateProduct = asyncHandler( async function (req,res){
//     console.log('updateProduct')
//     const {id,name,description,price,cote, category,allergen} = req.body
    
//     const product = await  Product.findByPk(id,{
//       include: [Category, Allergen]
//     })
   
//     if (product) {
//         product.name = name,
//         product.description = description,
//         product.price = price,
//         product.cote = cote
//         product.categoryName = category
//         await product.save()
//         const allergie = allergen.map((item) =>  (item.name))
//         await product.setAllergens(allergie)
           
//         res.status(201).json(product)
//     } else {
//         res.status(404)
//         throw new Error('Product not found ')
//     }
// })





