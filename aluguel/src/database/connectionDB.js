const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    environment: process.env.NODE_ENV,
    logging: (log) => {
      if (log.includes("error")) {
        console.error(log);
      }
    },
  }
);

module.exports = connection;
