const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const bcrypt = require("bcrypt");
const Role = require('./Role');
const Address = require('./Address');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


class User extends Model {
    get url() {
        return `/user/${this.email}`;
    };

    async validPassword(passwordToTest) {
        return  await bcrypt.compare(passwordToTest, this.passwordHash);
    };
    // Generate and hash password token
    async getResetPasswordToken () {
        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
  
        // Hash token and set to resetPasswordToken field
        this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
        // Set expire
        this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    
        return resetToken;
  };

  // Sign JWT and return
    async getSignedJwtToken () {
        return jwt.sign({ id: this._uuid }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
  };
   
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
        resetPasswordToken: DataTypes.STRING,
        resetPasswordExpire: DataTypes.DATE,
        
        
       
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