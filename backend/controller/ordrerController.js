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





// @desc  Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
    
    const { cartItems, shippingAddress, paymentMethode } = req.body
    
    if(cartItems && cartItems.lenght === 0){
        res.status(400)
        console.log.log(' IF No order items')
        throw new Error('No order items')
       
        
       
    } else {

       const addressDetails = { 
            name: shippingAddress.address,
            number: shippingAddress.number,
            floor: shippingAddress.floor,
        }

        const address =  await Address.create(addressDetails)
        address.setDataValue('cityName',shippingAddress.city )
        address.setDataValue('userEmail',shippingAddress.email )
        await address.save()

        orderDetails = {
            total: 0,
            status: false,
            date: new Date()
        }
        
        const order = await Order.create({})
        order.setDataValue('addressId', address.id);
        order.setDataValue('userEmail', shippingAddress.email);
        order.setDataValue('_uuid', uuidv4());
        order.setDataValue('date', new Date());
        await order.save()
        
        const productOrder = new ProductOrder()
        cartItems.map( async (element) => {
            let product =  await Product.findOne({where:{
                _uuid: element.uuid
            }})
            if(product !== null){
                let sub_total = await productOrder.calculSubTotal(element.qty,element.price)
               
                productOrder.setDataValue('_uuid',order._uuid)
                productOrder.setDataValue('quantity', element.qty)
                productOrder.setDataValue('prix', sub_total )
                productOrder.setDataValue('orderId', order.id)
                productOrder.setDataValue('productName',element.name)
                order.setDataValue('total',await order.calculTotal(productOrder.prix))
                await productOrder.save()
            } else {
                res.status(400)
                console.log(' ELSE No order items')
                throw new Error('No order items')
                
            }
            await order.save()
           
        })
        
        const createOrder = await order.save()
       
        res.status(201).json(createOrder)
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








