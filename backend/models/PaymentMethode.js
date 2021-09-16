const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Payment = require('./Payment')

class PaymentMethod extends Model{
    get url(){
        return `/paymentmethode/${id}`
    }
}

PaymentMethod.init({
    number:{
        type: DataTypes.STRING,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    modelName:'payment_methode'
})
PaymentMethod.hasMany(Payment)
Payment.belongsTo(PaymentMethod)

module.exports = PaymentMethod