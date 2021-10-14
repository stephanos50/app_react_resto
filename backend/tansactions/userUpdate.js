const User = require('../models/User')
const bcrypt = require('bcrypt')
const sequelize = require('../models/sequelize')
const { v4: uuidv4 } = require('uuid');

class userUpdate {
    

    
    transactionupdate = async ()  => {
       
        try {
            const result = await sequelize.transaction(async (t) => {
            
          
             const user = await User.create({
                 email: 'bababa@exemple.be',
                _uuid: uuidv4(),
                first_name: 'bababa',
                last_name: 'bababa',
                passwordHash: await bcrypt.hash('password',10),

            }, { transaction: t });
            
            return user;
          
        });
            
            // If the execution reaches this line, no errors were thrown.
            // We commit the transaction.
            
           
          
          } catch (error) {
          
            // If the execution reaches this line, an error was thrown.
            // We rollback the transaction.
            console.log(error)
            
          
          }
    }

}

module.exports = userUpdate