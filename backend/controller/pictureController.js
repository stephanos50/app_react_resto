const Image = require('../models/Picture');


exports.getPicture = async function(req, res){ 
   
    try {
        const image = await Image.findByPk(req.params.id);
        res.json(image);
        
    } catch (error) {
       
    }
}

exports.addPicture = async function(req,res){
    console.log(req.file.filename)
    console.log(req.body.id)
    console.log(req.body.url)
    try {
        const image = await Image.findByPk(req.body.id);
        image.path = `${req.body.url}/${req.file.filename}`,
        image.save()
    } catch (error) {
        
    }
}

