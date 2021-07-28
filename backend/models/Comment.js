const { Model, DataTypes } = require("sequelize");
const sequelize = require('./sequelize');
const Product = require('./Product');
const User = require('./User');

class Comment extends Model{
    get url(){
        return ` /commentaire${this.id}`;
    }
}

Comment.init(
    {
       commentaire: {
            type: DataTypes.STRING,
        },
        valeur: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }

    }, {
        sequelize,
        modelName: 'Commentaire'
    }
);

Product.hasMany(Comment);
Comment.belongsTo(Product);

User.hasMany(Comment);
Comment.belongsTo(User);


module.exports = Comment;