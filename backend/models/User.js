const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');

const Role = require('./Role');

class User extends Model {
    get url() {
        return `/user/${this.id}`;
    }
}

User.init(
    {
        _uuid: { type: UUID , isUUID: 4, unique: true},
        username: { type: DataTypes.STRING, isEmail: true, primaryKey: true},
        first_name: { type: DataTypes.STRING,  allowNull: false },
        family_name: { type: DataTypes.STRING, allowNull: false},
        email: { type: DataTypes.STRING, isEmail: true },
        password: { type: DataTypes.STRING}
       
    },
    {
        sequelize,
        modelName: 'user'
    }
);

User.belongsToMany(Role, { through: "users_roles" });
Role.belongsToMany(User, { through: "users_roles" });

module.exports = User;