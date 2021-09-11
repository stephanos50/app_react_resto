const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const Category = require('./Category');



class Product extends Model{
    
    get url() {
        return `/product/${this.id}` ;
    }

    async calculRate(moyen, current){
        if(moyen == 0){
            return current;
        } else if (moyen >= current) {
            return ((moyen+current)/2);
        } else {
            return ((current+moyen)/2);
        }
    }
    async setComment(comment,current){
       return  comment == 0 ? current : (comment += current);
    }
}

Product.init(
    {
        id: {
            type: 
                DataTypes.INTEGER, autoIncrement:true, primaryKey:true,
        },
        name: { 
            type: DataTypes.STRING,
            unique: true,
            validate: {
                is: /^[a-zA-Zéè ']+$/i, 
            },
        },
        description: { 
            type: DataTypes.TEXT,
            validate: {
                is: /^[a-zA-Zéè ']+$/i, 
            },
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 1, 
            validate: {
                isDecimal: true,
            }
        },
        rate: {
            type: DataTypes.FLOAT,
            defaultValue:0,
          
        },
        comment: {
            type:DataTypes.INTEGER,
            
        },
    }, {
        sequelize,
        modelName: 'product'
    }
);

Category.hasMany(Product);
Product.belongsTo(Category);




module.exports = Product;