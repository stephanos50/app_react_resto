const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');


class Supplement extends Model{
    get url() {
        return `/supplement/${this.id}`;
    }
}

Supplement.init(
    {
        nom: {
            type: DataTypes.STRING,
            unique: true
            
        },
        prix:{
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull:false,
        }
    }, 
    {
        sequelize,
        modelName: 'Supplement'
    }
);

module.exports = Supplement;

