const  asyncHandler = require ('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order')
const ProductOrder = require('../models/ProductOrdrer')
const Address = require('../models/Address')
const Product = require('../models/Product')
const User = require('../models/User')
const getUuid = require('uuid-by-string')




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
            cityName: shippingAddress.city,
        }
       
       
      
        const user = await User.findOne({
            where: {
                email: shippingAddress.email
            }
        })
        const address =  await Address.create(addressDetails)
        address.setDataValue('userUuid', user._uuid );
        await address.save()

        orderDetails = {
            total: 0,
            status: false,
            date: new Date()
        }
        let orderTotal = 0
        const order = await Order.create(orderDetails)
        order.setDataValue('addressId', address.getDataValue('id'));
        order.setDataValue('userUuid', user._uuid );
       
        await order.save()
        
        
        
        const productOrder = await new ProductOrder()
        orderItems.map( async (element) => {
            let product =  await Product.findByPk(element.product)
            if(product !== null){
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
       
      
        
        res.status(201).json(productOrder)
    }
})

async function createProductOrder(productOrder, qty, price,productId , orderId, orderTotal){
    let subTotal = await productOrder.calculSubTotal(qty,price)
    orderTotal = orderTotal + subTotal
    try {
       
        
    } catch (error) {
        
    }
   
};




