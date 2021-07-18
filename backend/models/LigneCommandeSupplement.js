const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Commande = require('./Commande');
const Supplement = require('./Supplement');

class LigneCommandeSupplement extends Model{
    get url() {
        return `/commandeSupplement/${this.id}`;
    }
}

LigneCommandeSupplement.init(
    {
       quantite: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        prix: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'LigneCommandeSupplement'
    } 

);

LigneCommandeSupplement.belongsTo(Supplement);
Supplement.hasMany(LigneCommandeSupplement);

LigneCommandeSupplement.belongsTo(Commande);
Commande.hasMany(LigneCommandeSupplement);

module.exports = LigneCommandeSupplement;