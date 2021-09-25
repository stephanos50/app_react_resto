const { Model, DataTypes } = require("sequelize");

const sequelize = require('./sequelize');
const Address = require('./Address');
const User = require('./User');
const luxon = require("luxon");
const DateTime = luxon.DateTime;
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
            type: DataTypes.DATEONLY,
            allowNull:false,
        },
        time: {
            type: DataTypes.DATE,
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
                let i = "000"
                switch (i) {
                    case (this.id >=10 && this.id <= 99 ):
                        i="00";
                        break;
                    case (this.id >=100 && this.id <= 999 ):
                        i="0";
                        break;
                    default:
                        break;
                }
                
                return DateTime.fromObject(this.time).toFormat(`yyyy-MM-${i}${this.id}`)
            },
        },

        date_time: {
            type: DataTypes.VIRTUAL,
            get() {
                return DateTime.fromObject(this.time).toLocaleString(DateTime.TIME_24_SIMPLE)
            },
        },
        
       
        date_createAt: {
            type: DataTypes.VIRTUAL,
              get() {
                return DateTime.fromObject(this.time).toFormat('dd-MM-yyyy')
                
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

Order.belongsTo(User);
User.hasMany(Order);


module.exports = Order;


