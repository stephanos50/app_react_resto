const { Model, DataTypes, UUID } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
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
        _uuid: { 
            type: UUID , 
            isUUID: 4,
            defaultValue: uuidv4(),
        },
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


