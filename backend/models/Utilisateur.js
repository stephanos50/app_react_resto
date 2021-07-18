const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Role = require('./Role');

class Utilisateur extends Model {
    get url() {
        return `/utilisateur/${this.id}`;
    }
}

Utilisateur.init(
    {
        nom: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            isEmail: true,
            unique: true,
        },
        mot_de_passe: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize,
        modelName: 'Utilisateur'
    }
);

Utilisateur.belongsToMany(Role, { through: "Utilisateur_roles" });
Role.belongsToMany(Utilisateur, { through: "Utilisateur_roles" });

module.exports = Utilisateur;