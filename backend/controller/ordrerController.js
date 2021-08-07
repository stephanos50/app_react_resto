const  asyncHandler = require ('express-async-handler')
const Order = require('../models/Order')
const ProductOrder = require('../models/ProductOrdrer')
const Address = require('../models/Address')
const Product = require('../models/Product')
const User = require('../models/User')
const sequelize = require('../models/sequelize');





// @desc  Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
    
    const { orderItems, shippingAddress, paymentMethode } = req.body
    
    console.log(shippingAddress)

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
        
        const order = await Order.create(orderDetails)
              order.setDataValue('addressId', address.getDataValue('id'));
              order.setDataValue('userEmail', shippingAddress.email);
        const createOrder = await order.save()
        
        
        
        const productOrder = new ProductOrder()
        orderItems.map( async (element) => {
            let product =  await Product.findByPk(element.product)
            if(product !== null){
                productOrder.setDataValue('_uuid',await order.getDataValue('_uuid'))
                productOrder.setDataValue('quantity', element.qty)
                productOrder.setDataValue('prix', await productOrder.calculSubTotal(element.qty,element.price) )
                productOrder.setDataValue('orderId',await order.getDataValue('id'))
                productOrder.setDataValue('productId',element.product)
                await productOrder.save()
            } else {
                res.status(400)
                throw new Error('No order items')
                return 
            }
        })
        
        
        res.status(201).json(createOrder)
    }
})






