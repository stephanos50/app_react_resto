const  asyncHandler = require ('express-async-handler')

const Address = require('../models/Address')
const City = require('../models/City')

exports.getAddress = asyncHandler(async (req, res) => {
   
    res.status(201).json(City)
    
})

