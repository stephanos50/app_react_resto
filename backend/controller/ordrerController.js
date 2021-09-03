const  asyncHandler = require ('express-async-handler')
const Order = require('../models/Order')
const ProductOrder = require('../models/ProductOrder')
const Address = require('../models/Address')
const Product = require('../models/Product')
const City =require('../models/City')
const User = require('../models/User')
const Payment = require('../models/Payment')
const sequelize = require('../models/sequelize');
const { v4: uuidv4 } = require('uuid');
const {DateTime} = require("luxon");






// @desc  Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
    const { cartItems, shippingAddress, paymentMethode, user } = req.body
    if(cartItems && cartItems.lenght === 0){
        res.status(400)
        throw new Error('No order items')
       
    } else {
        let address = await Address.findOne({ where: { userEmail: user } })
        if(address){
            address.name = shippingAddress.address,
            address.number = shippingAddress.number,
            address.floor = shippingAddress.floor,
            address.setDataValue('cityId',shippingAddress.city.id )
            await address.save()
        } else {
            const details_address = {
                name: shippingAddress.address,
                number: shippingAddress.number,
                floor: shippingAddress.floor,
            }
            address = await Address.create(details_address)
            address.setDataValue('cityId',shippingAddress.city.id )
            await address.save()
        }
        
        const order = await Order.create({})
        
        order.setDataValue('number', DateTime.fromISO(new Date().toISOString()).toFormat(`yyyy-MM-00${order.id}-dd`))
        order.setDataValue('time',DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE	))
        order.setDataValue('createAt', DateTime.now().toLocaleString(DateTime.DATE_HUGE))
        order.setDataValue('total', 0);
        order.setDataValue('addressId', address.id);
        order.setDataValue('userEmail', user);
        await order.save()
        
        cartItems.map( async (element) => {
            let product =  await Product.findByPk(element.id)
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
        include: [ProductOrder, {model:Address,include:[{model:City}]}, User] 
    })

    if(order){
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc  Get all orders
// @route Get /api/orders/:id
// @access Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
       include: User
    })

    if(orders){
        res.json(orders)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc  Update order to paid
// @route Get /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
    
    const order = await Order.findByPk(req.params.id)
    if(order) {
        order.isPaid = true,
        order.paidAt = new Date(Date.UTC(2016, 0, 1))
        await order.save()
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

    const payementDetal = {
        status: req.body.status,
        createdAt: req.body.create_time,
        updatedAt: req.body.update_time,
        email: req.body.payer.email_address,
    }

    const payment =  await  Payment.create(payementDetal)
    await payment.save()
    res.json(order)
})

// @desc  Get logged in user orders 
// @route Get /api/orders/myorders
// @access Private

exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        where: {
            addressId: req.user.id
        }
    })
    res.json(orders)
})


// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})







