const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');



class Role extends Model{
    get url() {
        return `/role/${this.id}`;
    }
}

Role.init(
    {
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