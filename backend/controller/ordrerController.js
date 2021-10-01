const  asyncHandler = require ('express-async-handler')
const Order = require('../models/Order')
const ProductOrder = require('../models/ProductOrder')
const Address = require('../models/Address')
const Product = require('../models/Product')
const City =require('../models/City')
const User = require('../models/User')
const Payment = require('../models/Payment')
const {DateTime} = require("luxon");
let id = "000";
const admin = 'admin'
const livreur = 'livreur'



// @desc  Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
    const { cartItems,  user } = req.body
    
    if(cartItems && cartItems.lenght === 0){
        res.status(400)
        throw new Error('No order items')
       
    } else {
        const address = await Address.findOne({ where: { userEmail: user } })
       
        const detailsOrder = {
            number: 'number',
            time: 'time',
            createAt: new Date(),
            total: 0,
        }
        const order = await Order.create(detailsOrder)
        order.setDataValue('number', order.date_number)
        order.setDataValue('time', order.date_time)
        order.setDataValue('addressId', address.id);
        order.setDataValue('userEmail', user);
        await order.save()
        
        
        cartItems.map( async (element) => {
            const product =  await Product.findByPk(element.id)
            if(product !== null){
                const productOrder = await  ProductOrder.create({})
                let sub_total = await productOrder.calculSubTotal(element.qty,element.price)
                productOrder.setDataValue('quantity', element.qty)
                productOrder.setDataValue('price', sub_total )
                productOrder.setDataValue('orderId', order.id)
                productOrder.setDataValue('productId',element.id)
                order.setDataValue('total',await order.calculTotal(productOrder.price))
                await productOrder.save()
            } else {
                res.status(400)
                throw new Error('No order items')
            }
            await order.save()
        })
        await order.save()

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

    if( req.user.role.name == admin|| req.user.role.name == livreur ){
        const orders = await Order.findAll({
            include: [User, {model:Payment, where:{status:'COMPLETED'}}],
         
         })
     
         if(orders){
             res.json(orders)
         } else {
             res.status(404)
             throw new Error('Order not found')
         }
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
   
})

// @desc  Update order to paid
// @route Get /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id,{
        include: [Payment]
    }) 
    if(order) {
        order.isPaid = true,
        order.paidAt = new Date()
        await order.save()
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

    const payementDetal = {
        status: req.body.status,
        update_time: req.body.update_time,
        email: req.body.payer.email_address,
    }

    const payment =  await  Payment.create(payementDetal)
    payment.setDataValue('orderId', order.id)
    payment.setDataValue('paymentMethodeId', 1)
    await payment.save()
    res.json(order)
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
    
    const order = await Order.findByPk(req.params.id)
    
    if (order) {
        order.isDelivered = true
        order.deliveredAt = new Date()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})









