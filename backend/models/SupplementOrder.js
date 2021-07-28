const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Order = require('./Order');
const Supplement = require('./Supplement');

class SupplementOrder extends Model{
    get url() {
        return `/supplement_order/${this.id}`;
    }
}

SupplementOrder.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        prix: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'supplement_order'
    } 

);

SupplementOrder.belongsTo(Supplement);
Supplement.hasMany(SupplementOrder);

SupplementOrder.belongsTo(Order);
Order.hasMany(SupplementOrder);

module.exports = SupplementOrder;