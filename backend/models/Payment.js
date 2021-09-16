
const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Order = require('./Order');

class Payment extends Model {
    get url(){
        return `/payment/${this.id}`;
    }
}

Payment.init(
    {
       status: { 
            type: DataTypes.STRING 
        },
        Date: { 
            type: DataTypes.DATEONLY 
        },
      
    },
    {
        sequelize,
        modelName:'payment'
    }
      
);

Order.hasOne(Payment);
Payment.belongsTo(Order);

module.exports = Payment;

