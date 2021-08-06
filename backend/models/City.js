const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");



class City extends Model {
    get url() {
        return `/city/${this.name}`;
    }
}

City.init(
    {
       name: {
            type: DataTypes.STRING,
            primaryKey: true
            
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