const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");



class Categorie extends Model {
    get url() {
        return `/categorie/${this.id}`;
      }
}

Categorie.init(
    {
        categorie: { 
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'Categorie'
    }
);

module.exports = Categorie;