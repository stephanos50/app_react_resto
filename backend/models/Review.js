const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Product = require('./Product');
const User = require('./User');
const luxon = require("luxon");
const DateTime = luxon.DateTime;

class Review extends Model{
    get url(){
        return ` /review/${this.id}`;
    }
}

Review.init(
    {
        
        rating: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            require:true, 
            defaultValue:0
        },
       comment: {
            type: DataTypes.STRING,
            allowNull: false,
            require:true,
           
        },
        date: {
            type:DataTypes.DATE,
            allowNull:false,
        }, 
        date_reviews: {
            type: DataTypes.VIRTUAL,
              get() {
                return DateTime.fromObject(this.date).toFormat('dd-MM-yyyy')
                
              },
        },
    
        

    }, {
        sequelize,
        modelName: 'review'
    },
   
);


Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);


module.exports = Review;