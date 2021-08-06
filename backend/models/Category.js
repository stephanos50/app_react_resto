const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");



class Category extends Model {
    get url() {
        return `/category/${this.name}`;
      }
}

Category.init(
    {
        name: { 
            type: DataTypes.STRING,
            primaryKey: true
        }
    },
    {
        sequelize,
        modelName: 'category'
    }
);

module.exports = Category;