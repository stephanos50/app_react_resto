const  asyncHandler = require ('express-async-handler')
const Order = require('../models/Order')
const ProductOrder = require('../models/ProductOrdrer')
const Address = require('../models/Address')
const Product = require('../models/Product')
const User = require('../models/User')
const sequelize = require('../models/sequelize');
const { v4: uuidv4 } = require('uuid');





// @desc  Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
    
    const { orderItems, shippingAddress, paymentMethode } = req.body
    
    if(orderItems && orderItems.lenght === 0){
        res.status(400)
        throw new Error('No order items')
        return 
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
        
        const productOrder = new ProductOrder()
        orderItems.map( async (element) => {
            let product =  await Product.findByPk(element.product)
            if(product !== null){
                productOrder.setDataValue('_uuid',order._uuid)
                productOrder.setDataValue('quantity', element.qty)
                productOrder.setDataValue('prix', await productOrder.calculSubTotal(element.qty,element.price) )
                order.setDataValue('total', await order.calculTotal(productOrder.prix) )
                productOrder.setDataValue('orderId', order.id)
                productOrder.setDataValue('productId',element.product)
                await productOrder.save()
            } else {
                res.status(400)
                throw new Error('No order items')
                return 
            }
            await order.save()
        })

        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})






