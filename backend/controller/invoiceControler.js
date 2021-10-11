const Product = require('../models/Product')
const  asyncHandler = require ('express-async-handler')
const Review = require('../models/Review')
const User = require('../models/User')
const Order = require('../models/Order')
const Payment = require('../models/Payment');
const PaymentMethode = require('../models/PaymentMethode')
const Invoice = require('../models/Invoice')



// @desc   Get a user 
// @route  GET /admin/invoices
// @access Private Admin
exports.userinvoiceList = asyncHandler(async (req,res)=> {
   
    const users = await User.findAll({
       include:[{model:Order,include:[{model:Payment,include:[{model:Invoice},{model:PaymentMethode}] }]}]
    });
    if (!users) {
        res.status(404)
        throw new Error("Liste des commentaires n'existe pas")
        
    } else {
        return res.json(users)
    }
});

// @desc   Get a reviws 
// @route  GET /admin/invoice/:id
// @access Private Admin
exports.invoiceListById = asyncHandler(async (req,res)=> {
   
    const invoices = await Order.findAll({
         include: [
             User,
             {model:Payment,where: {
                status: 'COMPLETED'
            },
            include:[{model:Invoice},{model:PaymentMethode}]}],
            where: {
                userId: req.params.id, 
            },
    });
   
    if (!invoices) {
        res.status(404)
        throw new Error("Liste des commentaires n'existe pas")
        
    } else {
        
        return res.json(invoices)
    }
});


// @desc   delete  user invoice 
// @route  DELETE /admin/invoices/:id
// @access Private Admin
exports.deleteInvoice  = asyncHandler(async (req,res) => {
    
    const invoice = await Invoice.findOne({
        include: [{
            model:Payment, where:{
                orderId:req.params.id
            },
            include:[{model:Order,include:[{model:User}]}],
        }]
    })

    
    await invoice.payment.order.user.deleteInvoice(invoice)

    
    res.status(201).json(invoice)
})