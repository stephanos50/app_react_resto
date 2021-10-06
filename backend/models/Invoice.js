const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Payment = require('./Payment')


class Invoice extends Model {
    
}

Invoice.init ({
    id: {
        type:DataTypes.DATE,
        primaryKey:true
    },
   },
   {
    sequelize,
    modelName:'invoice'
    },
)

Payment.hasOne(Invoice)
Invoice.belongsTo(Payment)



module.exports  = Invoice