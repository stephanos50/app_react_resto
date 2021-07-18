const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Commande = require('./Commande');
const Plat = require('./Plat');



class LigneCommandePlat extends Model{
    get url() {
        return `/commandePlat/${this.id}`;
    }
}

LigneCommandePlat.init(
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
        modelName: 'LigneCommandePlat'
    } 

);

LigneCommandePlat.belongsTo(Commande);
Commande.hasMany(LigneCommandePlat);

LigneCommandePlat.belongsTo(Plat);
Plat.hasMany(LigneCommandePlat);


module.exports = LigneCommandePlat;