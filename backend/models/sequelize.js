//const config = require("../config/mysql.json");
const config = require("../config/postgres.json");

const debug = require("debug")("projet-stephanos50:sequelize");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    logging: (msg) => debug(msg),
    dialect: "postgres",
    protocol: 'postgres',
    host: config.host,
    port: config.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // 
      }
    }
  }
);

module.exports = sequelize;
