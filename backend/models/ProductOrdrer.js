const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require("./sequelize");

const Order = require('./Order');
const Product = require('./Product');



class ProductOrdrer extends Model{
    get url() {
        return `/product_order/${this.id}`;
    }
    async calculSubTotal(qty, price){
        return (qty * price)
    }
}

ProductOrdrer.init(
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
        modelName: 'product_ordrer'
    } 

);

ProductOrdrer.belongsTo(Order);
Order.hasMany(ProductOrdrer);

ProductOrdrer.belongsTo(Product);
Product.hasMany(ProductOrdrer);


module.exports = ProductOrdrer;