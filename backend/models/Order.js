const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Address = require('./Address');
const User = require('./User');

class Order extends Model{
    total = 0
    get url(){
        return `/order/${this.id}`;
    }

    async calculTotal(price){
        return (total += price)
    }
}

Order.init(
    {
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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


