const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const Category = require('./Category');
const { v4: uuidv4 } = require('uuid');


class Product extends Model{
    get url() {
        return `/product/${this.name}` ;
    }
}

Product.init(
    {
        name: { 
            type: DataTypes.STRING,
            primaryKey: true
        },
        _uuid: { 
            type: UUID , 
            isUUID: 4,
           
        },
        description: { type: DataTypes.TEXT },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        cote: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        }
    }, {
        sequelize,
        modelName: 'product'
    }
);

Category.hasMany(Product);
Product.belongsTo(Category);




module.exports = Product;