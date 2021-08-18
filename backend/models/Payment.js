
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
        update_time: { 
            type: DataTypes.STRING 
        },
        email: { 
            type: DataTypes.STRING 
        },
    },
    {
        sequelize,
        modelName:'payment'
    }
      
);

Order.belongsTo(Payment);
Payment.hasMany(Order);

module.exports = Payment;

