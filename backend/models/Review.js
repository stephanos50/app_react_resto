const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Product = require('./Product');
const User = require('./User');

class Review extends Model{
    get url(){
        return ` /review/${this.id}`;
    }
}

Review.init(
    {
        name: {
            type: DataTypes.STRING, require:true,
        },
        rating: {
            type: DataTypes.INTEGER, 
            require:true, 
            defaultValue:0
        },
       comment: {
            type: DataTypes.STRING,
            validate: {
                is: /^[a-zA-Zéèà'!,.? ]+$/i, 
            },
        },
        

    }, {
        sequelize,
        modelName: 'review'
    }
);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);


module.exports = Review;