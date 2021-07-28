const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");



class City extends Model {
    get url() {
        return `/city/${this.id}`;
    }
}

City.init(
    {
       name: {
            type: DataTypes.STRING,
            unique: true,
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    {
        sequelize,
        modelName:'city'
    },
);


module.exports = City;