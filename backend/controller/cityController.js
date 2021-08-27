const City = require('../models/City')
const  asyncHandler = require ('express-async-handler')




exports.getCities = asyncHandler(async(req,res) => {
    console.log('getCities')
    const cities = await City.findAll()
    console.log(cities)
    if (cities) {
        res.status(200).json(cities)
    } else {
        res.status(404)
        throw new Error('Nothing found')
    }
}) 