const Image = require('../models/Picture');


exports.getPicture = async function(req, res, next){ 
    try {
        const image = await Image.findByPk(req.params.id);
        res.json(image);
        
    } catch (error) {
        next(error);
    }
}

