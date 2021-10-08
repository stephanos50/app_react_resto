const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Payment = require('./Payment')


class Invoice extends Model {
  
}

Invoice.init (
    {
        uid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
          }
    },
    {
        sequelize,
        modelName:'invoice'
    },
)

Payment.hasOne(Invoice)
Invoice.belongsTo(Payment)



module.exports  = Invoice