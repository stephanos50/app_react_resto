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
            validate: {
                isEmail: true,
                notEmpty: true,     
            }
        },
        _uuid: { 
            type: UUID , 
            isUUID: 4
        },
        first_name: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                is: ['[a-z]','i'],
                notEmpty: true,  
            }
        },
        last_name: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                is: ['[a-z]','i'], 
                notEmpty: true, 
            }
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