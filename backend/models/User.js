const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const bcrypt = require("bcrypt");
const Role = require('./Role');
const Address = require('./Address');

class User extends Model {
    get url() {
        return `/user/${this.email}`;
    }

    async validPassword(passwordToTest) {
        return  await bcrypt.compare(passwordToTest, this.passwordHash);
      }
}

User.init(
    {
        email: { 
            type: DataTypes.STRING, 
            primaryKey: true,
            allowNull: false,
        },
        _uuid: { 
            allowNull: false,
            type: UUID , 
            isUUID: 4
        },
        first_name: { 
            type: DataTypes.STRING, 
            allowNull: false,
           
        },
        last_name: { 
            type: DataTypes.STRING, 
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            require: true,
            defaultValue: false
        },
       
        passwordHash: DataTypes.STRING,  
        
       
    },
    {
        sequelize,
        modelName: 'user'
    }
);

User.belongsToMany(Role, { through: "users_roles" });
Role.belongsToMany(User, { through: "users_roles" });

User.hasOne(Address)
Address.belongsTo(User)

module.exports = User;