const { Model, DataTypes, UUID } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require('./sequelize');
const Address = require('./Address');
const User = require('./User');

class Order extends Model{
    total = 0
    get url(){
        return `/order/${this.id}`;
    }

    async calculTotal(price){
        this.total = this.total + price;
        return ( this.total)
    }
}

Order.init(
    {
        _uuid: { 
            type: UUID , 
            isUUID: 4,
            
        },
        total: {
            type: DataTypes.DOUBLE,
           
        },
        isPaid:{
            type: DataTypes.BOOLEAN,
            require: true,
            defaultValue: false
        },
        isDelivered:{
            type: DataTypes.BOOLEAN,
            require: true,
            defaultValue: false
        },
        paymentMethod: { 
            type: DataTypes.STRING,  
            defaultValue: 'PayPal'
        },
        paidAt: {
            type: DataTypes.DATE,
        },
        deliveredAt: {
            type: DataTypes.DATE,
        },

    },
    {
        sequelize,
        modelName:'order',
    },
);

Order.belongsTo(Address);
Address.hasMany(Order);

Order.belongsTo(User);
User.hasMany(Order);


module.exports = Order;


