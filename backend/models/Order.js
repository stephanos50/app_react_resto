const { Model, DataTypes } = require("sequelize");

const sequelize = require('./sequelize');
const Address = require('./Address');
const User = require('./User');
const {DateTime} = require("luxon");
const total = 0;

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
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING,
        },
        createAt: {
            type: DataTypes.STRING,
           
        },
        total: {
            type: DataTypes.DOUBLE,
            
        },
        isPaid:{
            type: DataTypes.BOOLEAN,
            require: true,
            defaultValue: false
        },
        isDelivered:{
            type: DataTypes.BOOLEAN,
            require: true,
            defaultValue: false
        },
        paymentMethod: { 
            type: DataTypes.STRING,  
            defaultValue: 'PayPal'
        },
        paidAt: {
            type: DataTypes.DATE,
        },
        deliveredAt: {
            type: DataTypes.DATE,
        },
        date_formated: {
            type: DataTypes.VIRTUAL,
              get() {
                return DateTime.fromISO(this.date).toLocaleString(DateTime.DATE_HUGE);
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


