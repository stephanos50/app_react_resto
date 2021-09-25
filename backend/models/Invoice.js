const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Payment = require('./Payment')


class Invoice extends Model {
    get url() {
        return  `/proofpayment/${this.id}`;
    }
}

Invoice.init ({
    number: {
        type:DataTypes.DATE,
        allowNull:false
    },
   
    name: {
        type:DataTypes.STRING,
        allowNull:false
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