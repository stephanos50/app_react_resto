const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Categorie= require('./Categorie');


class Plat extends Model{
    get url() {
        return `/plat/${this.id}` ;
    }
}

Plat.init(
    {
        plat: { 
            type: DataTypes.STRING,
        
            
        },
        description: { type: DataTypes.TEXT },
        prix: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        cote: {
            type: DataTypes.INTEGER,
            defaultValue: 5
        }
    }, {
        sequelize,
        modelName: 'Plat'
    }
);

Categorie.hasMany(Plat);
Plat.belongsTo(Categorie);




module.exports = Plat;