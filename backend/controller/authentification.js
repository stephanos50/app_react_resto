const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const  asyncHandler = require ('express-async-handler')
const sendEmail = require('../utils/sendEmail');
const User = require('../models/User');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const generate = require('../utils/generateToken')






// @desc      Forgot password
// @route     POST /api/authentification/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.body.email);
    if (!user) {
      return next(new ErrorResponse('Aucun utilisateur avec ce mail', 404));
    }
    // No Hash
    const reseToken = user.getResetPasswordToken();
    await user.save();
    //Create reset url
    const restUrl = `${req.protocol}://${req.get('host')}/api/authentification/resetpassword/${ await reseToken}`
    
    const message = `Vous recevez cette email parceque vous désirer modifier votre motde passe. Svp faite un update to:\n\n ${restUrl}`;

     try {
        await sendEmail({
          email: 'stefan.arvanitis@yahoo.fr',
          subject: 'Password reset token',
          message
        })
        res.status(200).json({ success: true, data: 'Email Sent'})
     } catch (error) {
        // console.log(err)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire= undefined;
        await user.save();
        return next(new ErrorResponse('Email could not be sent', 500));
     }
    
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc      Reset password
// @route     PUT /api/authentification/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
 
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');
    
    const user = await User.findOne({
      where: {
        resetPasswordToken:resetPasswordToken,
      }
    });

  
  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }
  
  // Set new password
  user.setDataValue('passwordHash',await bcrypt.hash(req.body.password,saltRounds));
  user.setDataValue('resetPasswordToken', null); 
  user.setDataValue('resetPasswordExpire', null); 
  
  await user.save();
  
  sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
    
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
    });
};

