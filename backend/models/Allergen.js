const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Product = require('./Product');


class Allergen extends Model {
    get url(){
        return `/allergen/${this.name}`
    }
}

Allergen.init(
    {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
          
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