const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const City = require('./City');


class Address extends Model{
    get url() {
        return `/address/${this.id}`;
    }
}

Address.init(
    {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ['[a-z]','i'], 
                notEmpty: true, 
            }
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,   
            isInt: {
                msg: "Must be an integer number "
              }
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull:false,
            isInt: true,   
            isInt: {
                msg: "Must be an integer number "
            }
        } 
    },
    { 
        sequelize, 
        modelName: 'address'
    }
);


City.hasMany(Address);
Address.belongsTo(City);



module.exports = Address;