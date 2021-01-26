// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

// use dotenv node mdule to reference your Mysql username and password in a file not shared with git
require('dotenv').config();

// create connection to our db
let sequelize;

// if on Heroku, use JAWSDB as the MySQL DB
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} 
// else if local, use the same MySQL login code as before
else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;