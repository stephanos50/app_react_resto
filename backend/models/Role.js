const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');



class Role extends Model{
    get url() {
        return `/role/${this.id}`;
    }
}

Role.init(
    {
        role: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
          },
    },
    {
        sequelize,
        modelName: 'Role',
    }


);




module.exports = Role;