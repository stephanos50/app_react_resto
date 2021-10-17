const  asyncHandler = require ('express-async-handler')
const Order = require('../models/Order')
const ProductOrder = require('../models/ProductOrder')
const Address = require('../models/Address')
const Product = require('../models/Product')
const City =require('../models/City')
const User = require('../models/User')
const Payment = require('../models/Payment')
const PaymentMethode =require('../models/PaymentMethode')
const Invoice = require('../models/Invoice')
const luxon = require("luxon");
const DateTime = luxon.DateTime;





const admin = 'admin'
const livreur = 'livreur'
const sendEmail = require('../utils/sendEmail');



// @desc  Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
   const { cartItems } = req.body
   
   if(cartItems && cartItems.lenght === 0){
        res.status(400)
        throw new Error('No order items')
       
    } else {
       const user = await User.findOne({
            where: {
                email:req.body.user,
            },include:Address,
       }, { order: [ [ 'id', 'DESC' ]]}
        )
       
        const lastValue = Array.from(user.addresses).pop();
        const date = DateTime.fromISO(new Date().toISOString(),{zone: 'Europe/Brussels'});
        const format = DateTime.fromISO(new Date().toISOString(),{zone: 'Europe/Brussels'});
        const numero = format.toFormat('yyyy-MM-');        
        const detailsOrder = {
            number: 'number',
            time: 'time',
            createAt: date,
            total: 0,
        }
        const order = await Order.create(detailsOrder)
        order.setDataValue('number',`${numero}${index(order.id)}${order.id}`)
        order.setDataValue('time', order.date_time)
        order.setDataValue('createAt', order.date_createAt)
        order.setDataValue('addressId', lastValue.id);
        order.setDataValue('userId', user.id);
        await order.save()
        console.log(order)
        
       
        cartItems.map( async (element) => {
            const product =  await Product.findByPk(element.id)
            if(product !== null){
                const detailProductOrder = {
                    quantity: element.qty,
                    price: product.price,
                    orderId: order.id,
                    productId: element.id,
                }
                const productOrder = await  ProductOrder.create(detailProductOrder)
                productOrder.setDataValue('price',await productOrder.calculSubTotal(element.qty,element.price))
                await productOrder.save()
                order.setDataValue('total',await order.calculTotal(productOrder.price))
                await order.save()
                
            } else {
                res.status(400)
                throw new Error('No order items')
            }
        })
        
        const orderCreate = await Order.findByPk(order.id, {
            include: [ProductOrder, {model:Address,include:[{model:City}]}, User] 

        })
        
        res.status(201).json(orderCreate)
    }
})

// @desc  Get order by ID
// @route Get /api/orders/:id
// @access Private
exports.getOrderById = asyncHandler(async (req, res) => {
   
    const order = await Order.findByPk(req.params.id, {
        include: [User,Payment, {model:ProductOrder,include:{model:Product}}, {model:Address,include:[{model:City}]}] 
      
    })
    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc  Get all orders
// @route Get /api/orders/
// @access Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
    
    const roles = req.user.roles.map((role) => role.name)
    const [role] = roles
        
        if( role === admin || role === livreur){
            const orders = await Order.findAll({
                include: [User, {model:Payment, where:{status:'COMPLETED'}}],
            })
            if(orders){
                res.json(orders)
            } else {
                res.status(404)
                throw new Error('Order not found')
            }
        }
    })


// @desc  Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {

    const date = new Date()
    const order = await Order.findByPk(req.params.id,{
        include: [Payment, User]
    }) 
    if(order) {
        order.isPaid = true
        order.paidAt = date
        await order.save()
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
    const methode = await PaymentMethode.findOne();
    
    const payementDetal = {
        status: req.body.status,
        date: date,
        orderId: order.id,
        paymentMethodeId:methode.id
    }
    const payment = await Payment.create(payementDetal)
    await payment.save()

    const invoiceDetails = {
        paymentId:payment.id
    }

    const invoice = await Invoice.create(invoiceDetails)
    await invoice.save()
    try {
        await sendEmail({
          email: 'stefan.arvanitis@yahoo.fr',
          subject: 'Votre commande ',
          message: `
                Etablisement: Au coeur bleu
                Adresse : Chaussée d'Alsemberg 4, 1630 Linkebeek
                Téléphone : 02 378 21 66 
                ------------------------------------------------
                Votre nom: ${order.user.first_name}
                Votre prénom: ${order.user.last_name}
                Votre email: ${order.userEmail}
                Numéro de commande: ${order.number}
                Commandé le ${order.date_createAt} à ${order.time}
                Montant total: ${order.total}
                Livraidon: ${order.isDelivered}
            `
        })
        
     } catch (error) {
        return next(new ErrorResponse('Email could not be sent', 500));
     }
     res.status(200).json(order)

    
})

// @desc  Get logged in user orders 
// @route Get /api/orders/myorders
// @access Private
exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findOne({
        where: {
            addressId: req.user.id
        },
        include: [Payment],
    })
    res.json(orders)
})


// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
    const date = new Date()
    const order = await Order.findByPk(req.params.id)
    
    if (order) {
        order.setDataValue("isDelivered", true)
        order.setDataValue("deliveredAt",date)
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})



// @desc    Delete order 
// @route   delete /api/orders/:id
// @access  Private 
exports.deleteViewOrder = asyncHandler(async (req, res) => {
    console.log("deleteViewOrder")
    const order = await Order.findByPk(req.params.id, {
        include: [Payment,User]
    })
   
   
    if (order) {
        if(order.payment === null){
            
            const orderdelete =  await order.destroy()
            if(orderdelete){
                res.status(201).json({message: 'delete'})
            }

        } else {
            console.log("delete")
           if(await order.user.deleteOrder(order)){
               res.status(201).json({message: 'deleteView'})
            }
        }
       
       
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

function index(number){
    let index
    if(number < 10 ){
      index = "00"
    } else if(number > 10) {
      index = "0"
    } else {
      index = 0
    }
     
    return index
  }









