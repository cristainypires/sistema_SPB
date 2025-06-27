const envs = require('./config');
const Sequelize = require('sequelize');

const conexaoDB = new Sequelize(
  envs.DBNAME, envs.DBUSER, envs.DBPASSWORD, {
    dialect: 'postgres',
    host: envs.DBHOST
  }
);
module.exports = conexaoDB;