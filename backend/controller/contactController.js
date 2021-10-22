const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');
const  asyncHandler = require ('express-async-handler')
const { body, validationResult } = require("express-validator");





// @desc   post a message by user
// @route  POST /api/contact/
// @access PUBLIC
exports.postMessage = [

    body('email').not().notEmpty().matches(/^[a-zA-Z '.@éàéç!]/), 
    body('text').not().notEmpty().matches(/^[a-zA-Z 'éàéç]/).isLength({ max: 50 }),
    
    
    asyncHandler(async (req,res) => {
        const errors = validationResult(req.body);
        console.log(req.body)
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error('Caractère non valide')
        }
        try {
            const {email, text} = req.body
            await sendEmail({
                email: email,
                subject: 'Message',
                message: text,
              })
              res.status(200).json({ success: true, data: 'Votre message a bien été envoyé'})
        } catch (error) {
            return next(new ErrorResponse('Email could not be sent', 500));
        }
    })
]