const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");



class Category extends Model {
    get url() {
        return `/category/${this.id}`;
      }
}

Category.init(
    {
        name: { 
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
        }
    },
    {
        sequelize,
        modelName: 'category'
    }
);

module.exports = Category;