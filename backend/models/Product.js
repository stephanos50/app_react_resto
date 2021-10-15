const { Model, DataTypes, UUID } = require("sequelize");
const sequelize = require('./sequelize');
const Category = require('./Category');
let cpt = 0;


class Product extends Model{
    
    get url() {
        return `/product/${this.id}` ;
    }

    async calculRate(product_rate, rating, count ){
       return product_rate == 0 ? rating :  (( (product_rate * count) + Number(rating) ) / ++count)
    }
     
    async setComment(comment){
       return  comment == 0 ? 1 : (comment + 1);
    }
}

Product.init(
    {
        url: {
            type:DataTypes.STRING,
            unique:true,
        },
        name: { 
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
            validate: {
                is: /^[a-zA-Zéèà ']+$/i, 
            },
        },
        description: { 
            type: DataTypes.TEXT,
            validate: {
                is: /^[a-zA-Zéèà,'. œ]+$/i, 
                max:250
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull:false,
            defaultValue: 1, 
            validate: {
                isDecimal: true,
            }
        },
        rate: {
            type: DataTypes.FLOAT,
            allowNull:false,
            defaultValue:0,
          
        },
        comment: {
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false,
           
            
        },
    }, {
        sequelize,
        modelName: 'product'
    }
);

Category.hasMany(Product);
Product.belongsTo(Category);




module.exports = Product;