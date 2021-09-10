const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const Category = require('./Category');



class Product extends Model{
    
    get url() {
        return `/product/${this.id}` ;
    }

    async calculRate(last_rate, current_rate){
        return ( ( (last_rate + current_rate) / 10) * 5)
    }

}

Product.init(
    {
        id: {
            type: 
                DataTypes.INTEGER, autoIncrement:true, primaryKey:true,
            
        },
        name: { 
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[a-zA-Zéè ']+$/i, 
            },
        },
        description: { 
            type: DataTypes.TEXT,
            validate: {
                is: /^[a-zA-Zéè ']+$/i, 
            },
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 1, 
            validate: {
                isDecimal: true,
            }
        },
        rate: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            validate: {
                isInt: true,
            }
        }
    }, {
        sequelize,
        modelName: 'product'
    }
);

Category.hasMany(Product);
Product.belongsTo(Category);




module.exports = Product;