//const config = require("../config/mysql.json");
const config = require("../config/postgres_local.json");


const debug = require("debug")("projet-stephanos50:sequelize");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    logging: (msg) => debug(msg),
    dialect: "postgres",
    host: config.host,
    port: config.port,
    
  
  }
);

module.exports = sequelize;