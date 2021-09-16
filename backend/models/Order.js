const { Model, DataTypes } = require("sequelize");

const sequelize = require('./sequelize');
const Address = require('./Address');
const User = require('./User');
const { DateTime } = require("luxon");
const total = 0;
let numero = 0;

class Order extends Model{
    
    get url(){
        return `/order/${this.id}`;
    }
    async calculTotal(price){
        this.total = this.total + price;
        return ( this.total)
    }
}

Order.init(
    {
        number: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull:false,
           
        },
        createAt: {
            type: DataTypes.DATE,
           
        },
        total: {
            type: DataTypes.DOUBLE,
            defaultValue:0,
            allowNull:false,
        },

        isDelivered:{
            type: DataTypes.BOOLEAN,
            require: true,
            defaultValue: false,
            allowNull:false,
        },
        deliveredAt: {
            type: DataTypes.DATE,
            
        },

        date_number: {
            type: DataTypes.VIRTUAL,
            get() {
                return  DateTime.now().toFormat('MM-dd-yyyy')
            },
        },
        
       
        date_createAt: {
            type: DataTypes.VIRTUAL,
              get() {
                return DateTime.now()
              },
          },
          date_deliveredAt: {
            type: DataTypes.VIRTUAL,
              get() {
                return DateTime.now().toFormat('MM-dd-yyyy')
              },
          },

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


