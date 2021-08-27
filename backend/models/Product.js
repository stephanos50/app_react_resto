const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const Category = require('./Category');



class Product extends Model{
    get url() {
        return `/product/${this.id}` ;
    }
}

Product.init(
    {
        name: { 
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
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