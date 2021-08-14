const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');

const Product = require('./Product');

class Picture extends Model{
    get url() {
        return `/picture/${this.id}`
    }
}

Picture.init(
    {
        path: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName:'picture'
    }
);


Picture.belongsTo(Product);
Product.hasMany(Picture);

module.exports = Picture;