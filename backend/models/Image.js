const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');

const Plat = require('./Plat');

class Image extends Model{
    get url() {
        return `/Image/${this.id}`
    }
}

Image.init(
    {
        image: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName:'Image'
    }
);


Image.belongsTo(Plat);
Plat.hasMany(Image);

module.exports = Image;