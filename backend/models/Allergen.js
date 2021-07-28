const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Product = require('./Product');


class Allergen extends Model {
    get url(){
        return `/allergen/${this.id}`
    }
}

Allergen.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'Allergen'
    }
);



Allergen.belongsToMany(Product, {through: 'product_allergen'});
Product.belongsToMany(Allergen,{through: 'product_allergen'});

module.exports =  Allergen;