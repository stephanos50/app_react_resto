
const  asyncHandler = require ('express-async-handler')

const User = require('../models/User')
const Review = require('../models/Review')
const Product = require('../models/Product');



// @desc   Get a user 
// @route  GET /admin/reviews
// @access Private Admin
exports.userList = asyncHandler(async (req,res)=> {
   
    const users = await User.findAll({
       include:[{model:Review,include:[{model:Product}]}]
    });
    if (!users) {
        res.status(404)
        throw new Error("Liste des commentaires n'existe pas")
        
    } else {
        return res.json(users)
    }
});

// @desc   Get a reviws 
// @route  GET /admin/reviews/:id
// @access Private Admin
exports.reviewsListById = asyncHandler(async (req,res)=> {
   
    const reviews = await Review.findAll({
        where: {
            userId: req.params.id
        }, include:[Product, User]
    });
   
    if (!reviews) {
        res.status(404)
        throw new Error("Liste des commentaires n'existe pas")
        
    } else {
        
        return res.json(reviews)
    }
});



// @desc   delete a reviews 
// @route  DELETE /admin/reviews/:id
// @access Private Admin
exports.reviewDelete = asyncHandler(async (req,res)=> {
    
    const reviews = await Review.findByPk(req.params.id, {
        include: [User,Product]
    })
    
    

    const product = await Product.findOne({
        where: {
            id : reviews.productId
        }
    })
    const ratingReviews = reviews.getDataValue('rating')
    const comment = product.getDataValue('comment')
    const ratingProduct = product.getDataValue('rate')
    
    
    const origine = ratingProduct * comment;
    
    const lastrating = origine - ratingReviews;
    const newcomment = comment - 1;
    const newrate = (lastrating / newcomment);
   

    product.setDataValue('comment',newcomment)
    product.setDataValue('rate',newrate)

    

    
    await product.save()
    const reviewdeleted = await reviews.destroy()
   
    if(reviewdeleted){
        res.status(201)
        return json({message: 'review deleted'})
    } else {
        res.status(404)
        throw new Error("review not found")
    }
});