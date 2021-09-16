const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Payment = require('./Payment')


class ProofPayment extends Model {
    get url() {
        return  `/proofpayment/${this.id}`;
    }
}

ProofPayment.init ({
    number: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
   
    name: {
        type:DataTypes.STRING,
    },
    
   },
   {
    sequelize,
    modelName:'proof_payment'
    },
)

Payment.hasOne(ProofPayment)
ProofPayment.belongsTo(Payment)



module.exports  = ProofPayment