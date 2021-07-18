const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Plat = require('./Plat');


class Allergene extends Model {
    get url(){
        return `/allergene/${this.id}`
    }
}

Allergene.init(
    {
        nom: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: 'Allergene'
    }
);



Allergene.belongsToMany(Plat, {through: 'AllergenePlat'});
Plat.belongsToMany(Allergene,{through: 'AllergenePlat'});

module.exports =  Allergene;