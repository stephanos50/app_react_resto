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
        name: { 
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                is: ['[a-z]','i'], 
                notEmpty: true, 
            }
        },
        description: { 
            type: DataTypes.TEXT,
            validate: {
                is: ['[a-z]','i'], 
                notEmpty: true, 
            }
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 1
        },
        rate: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'product'
    }
);

Category.hasMany(Product);
Product.belongsTo(Category);




module.exports = Product;