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
                is: /^[a-zA-Zéèà' ]+$/i, 
            },
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,   
           
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull:false,
            isInt: true,   
            
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