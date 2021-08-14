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
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull:false
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