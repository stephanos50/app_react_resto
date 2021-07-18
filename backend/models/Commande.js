const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Adresse = require('./Adresse');
const Utilisateur = require('./Utilisateur');

class Commande extends Model{
    get url(){
        return `/commande/${this.id}`;
    }
}

Commande.init(
    {
        total: {
            type: DataTypes.FLOAT,
            defaultValue:0,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            defaultValue:0,
            allowNull: false,
        },
        date:{
            type:DataTypes.DATEONLY,
        }

    },
    {
        sequelize,
        modelName:'Commande',
    },
);

Commande.belongsTo(Adresse);
Adresse.hasMany(Commande);

Commande.belongsTo(Utilisateur);
Utilisateur.hasMany(Commande);


module.exports = Commande;


