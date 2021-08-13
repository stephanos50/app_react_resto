const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require("./sequelize");

const Order = require('./Order');
const Product = require('./Product');



class ProductOrder extends Model{
    get url() {
        return `/product_order/${this.id}`;
    }
    async calculSubTotal(qty, price){
        return (qty * price)
    }
}

ProductOrder.init(
    {
        _uuid: { 
            type: UUID , 
            isUUID: 4,
        },
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
        modelName: 'product_order'
    } 

);

ProductOrder.belongsTo(Order);
Order.hasMany(ProductOrder);

ProductOrder.belongsTo(Product);
Product.hasMany(ProductOrder);


module.exports = ProductOrder;