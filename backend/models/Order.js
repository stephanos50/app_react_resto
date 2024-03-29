const { Model, DataTypes } = require("sequelize");

const sequelize = require('./sequelize');
const Address = require('./Address');
const luxon = require("luxon");
const DateTime = luxon.DateTime;
const date = DateTime.fromISO(new Date().toISOString())


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
            unique: true,
            allowNull:false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull:false,
           
        },
        createAt: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        total: {
            type: DataTypes.DOUBLE,
            defaultValue:0,
            allowNull:false,
        },
        delete: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
            require: true,
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
       
        date_time: {
            type: DataTypes.VIRTUAL,
            get(){
                return date.toLocaleString(DateTime.TIME_24_SIMPLE)
            }

        },

        date_createAt: {
            type: DataTypes.VIRTUAL,
              get() {
                return this.createAt.toLocaleString(DateTime.DATE_HUGE)
                
              },
        },

       

          date_deliveredAt: {
            type: DataTypes.VIRTUAL,
              get() {
                return DateTime.fromISO(this.isDelivered).toFormat('yyyy-MM UTC');
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




module.exports = Order;


