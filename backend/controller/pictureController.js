const Image = require('../models/Picture');
const  asyncHandler = require ('express-async-handler')


exports.getPicture = async function(req, res){ 
   try {
        const image = await Image.findByPk(req.params.id);
        res.json(image);
    } catch (error) {
       
    }
}

exports.addPicture = asyncHandler(async function(req,res){
    
    let image = await Image.findByPk(req.body.id)
    if (image) {
       image.path = `${req.body.url}/${req.file.filename}`,
        image.save()
    } else {
        const imageDetails = {
            path: `${req.body.url}/${req.file.filename}`,
            productId: req.body.id,
        }
        image = await Image.create(imageDetails)
        
    }
    image.save()
})

