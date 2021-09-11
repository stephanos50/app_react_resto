const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const Category = require('./Category');
let comment = 0;
let rate = 0;


class Product extends Model{
    
    get url() {
        return `/product/${this.id}` ;
    }

    async calculRate( current){
        return ( ( (this.rate + current) / 10) * 5)
    }
    async setComment(current){
        (this.comment + current)
    }

    async getComment() {
        return this.comment
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
            type: DataTypes.FLOAT,
            
          
        },
        comment: {
            type:DataTypes.INTEGER,
            defaultValue:0,
        },
    }, {
        sequelize,
        modelName: 'product'
    }
);

Category.hasMany(Product);
Product.belongsTo(Category);




module.exports = Product;