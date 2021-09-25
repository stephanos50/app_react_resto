const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require("./sequelize");

const Order = require('./Order');
const Product = require('./Product');



class ProductOrder extends Model{
    get url() {
        return `/product_order/${this.id}`;
    }
    async calculSubTotal(qty, price){
        let total = (qty*price)
        return total
    }
}

ProductOrder.init(
    {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                isDecimal: true,
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1,
            validate: {
                isDecimal: true,
            }
            
        }
    },
    {
        sequelize,
        modelName: 'product0rder'
    } 

);

ProductOrder.belongsTo(Order);
Order.hasMany(ProductOrder);

ProductOrder.belongsTo(Product);
Product.hasMany(ProductOrder);


module.exports = ProductOrder;