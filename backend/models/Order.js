const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Address = require('./Address');
const User = require('./User');

class Order extends Model{
    get url(){
        return `/order/${this.id}`;
    }
}

Order.init(
    {
        total: {
            type: DataTypes.FLOAT,
            defaultValue:0,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            defaultValue:0,
            allowNull: false,
        },
        date:{
            type:DataTypes.DATEONLY,
        }

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


