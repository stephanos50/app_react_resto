const Image = require('../models/Picture');
const  asyncHandler = require ('express-async-handler')
const Product = require('../models/Product')

exports.getPicture = async function(req, res){ 
   try {
        const image = await Image.findByPk(req.params.id);
        res.json(image);
    } catch (error) {
       
    }
}

exports.addPicture = asyncHandler(async function(req,res){
    
    let product = await Product.findByPk(req.body.id)
    
    if (product) {
        product.setDataValue('url', `${req.body.url}/${req.file.filename}`)
        product.path = `${req.body.url}/${req.file.filename}`,
        product.save()
    } 
})

