const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Plat = require('./Plat');
const Utilisateur = require('./Utilisateur');

class Commentaire extends Model{
    get url(){
        return ` /commentaire${this.id}`;
    }
}

Commentaire.init(
    {
       commentaire: {
            type: DataTypes.STRING,
        },
        valeur: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }

    }, {
        sequelize,
        modelName: 'Commentaire'
    }
);

Plat.hasMany(Commentaire);
Commentaire.belongsTo(Plat);

Utilisateur.hasMany(Commentaire);
Commentaire.belongsTo(Utilisateur);


module.exports = Commentaire;