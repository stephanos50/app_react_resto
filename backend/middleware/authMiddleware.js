const jwt = require('jsonwebtoken')
const User = require('../models/User')
const  asyncHandler = require ('express-async-handler')


const protect = asyncHandler(async function (req, res, next) {
    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
           
            req.user = await User.findOne({
                where: { _uuid : decoded.id}
            })
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized not token')
    }

    
})

module.exports = protect;