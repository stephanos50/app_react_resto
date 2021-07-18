const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");



class Ville extends Model {
    get url() {
        return `/ville/${this.id}`;
    }
}

Ville.init(
    {
       nom: {
            type: DataTypes.STRING,
            unique: true,
        },
        codepostal: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    {
        sequelize,
        modelName:' Ville'
    },
);


module.exports = Ville;