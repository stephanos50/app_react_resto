const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');


class Supplement extends Model{
    get url() {
        return `/supplement/${this.id}`;
    }
}

Supplement.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        price:{
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull:false,
        }
    }, 
    {
        sequelize,
        modelName: 'supplement'
    }
);

module.exports = Supplement;

