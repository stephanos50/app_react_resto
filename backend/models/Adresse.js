const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Ville = require('./Ville');


class Adresse extends Model{
    get url() {
        return `/adresse/${this.id}`;
    }
}

Adresse.init(
    {
        
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        etage: {
            type: DataTypes.INTEGER,
            allowNull:false
        } 
    },
    { 
        sequelize, 
        modelName: 'Adresse'
    }
);


Ville.hasMany(Adresse);
Adresse.belongsTo(Ville);



module.exports = Adresse;