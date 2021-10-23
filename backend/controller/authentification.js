
const ErrorResponse = require('../utils/errorResponse');
const  asyncHandler = require ('express-async-handler')
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const saltRounds = 10;




// @desc      Forgot password
// @route     POST /api/authentification/forgotpassword
// @access    Public
exports.forgotpassword = asyncHandler(async (req, res, next) => {
    
    const user = await User.findOne( { where: { email:req.body.email}});
    if (!user) {
      return next(new ErrorResponse('Aucun utilisateur avec ce mail', 404));
    }
    // No Hash
    const reseToken = user.getResetPasswordToken();
    await user.save();
    //Create reset url
    const restUrl = `${req.protocol}://${req.get('host')}/resetpassword/${ await reseToken}`
    
    const message = `Vous recevez cette email parceque vous désirer modifier votre motde passe. Svp faite un update to:\n\n ${restUrl}`;

     try {
        await sendEmail({
          email: 'stefan.arvanitis@yahoo.fr',
          subject: 'Password reset token',
          message
        })
        res.status(200).json({ success: true, data: 'Email Sent'})
     } catch (error) {
       
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire= undefined;
        await user.save();
        return next(new ErrorResponse('Email could not be sent', 500));
     }
    
   
});


// @desc      Reset password
// @route     POST /api/authentification/resetpassword
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const {resetoken, password} = req.body
    
    const user = await User.findOne({
      where: {
        resetPasswordToken:resetoken,
      }
    });

    
  
    if (!user) {
      
      return next(new ErrorResponse('Invalid token', 400));
    }
    const hashpassword = await bcrypt.hash(req.body.password,saltRounds)
   
      // Set new password
      user.passwordHash = hashpassword
      user.resetPasswordToken = null;
      user.resetPasswordExpire = null;
      await user.save();

      res.status(200)
      
});
















