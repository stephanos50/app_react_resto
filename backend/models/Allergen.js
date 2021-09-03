const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Product = require('./Product');
var validator = require('validator');

class Allergen extends Model {
    get url(){
        return `/allergen/${this.id}`
    }
}

Allergen.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate: {
                is: ['[a-z]','i'], 
                notEmpty: true, 
            }
        }
    },
    {
        sequelize,
        modelName: 'allergen'
    }
);



Allergen.belongsToMany(Product, {through: 'product_allergen'});
Product.belongsToMany(Allergen,{through: 'product_allergen'});

module.exports =  Allergen;