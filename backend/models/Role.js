const { Model, DataTypes, INTEGER } = require("sequelize");
const sequelize = require('./sequelize');

class Role extends Model{
    get url() {
        return `/role/${this.id}`;
    }
}

Role.init(
    {
        id:{
            type: DataTypes.INTEGER, autoIncrement:true, primaryKey:true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[a-zA-Z]+$/i, 
            },
          },
    },
    {
        sequelize,
        modelName: 'role',
    }
);
module.exports = Role;