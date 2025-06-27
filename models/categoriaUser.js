const Sequelize = require('sequelize');
const conexaoDB = require('../utils/database');

const CategoriaUser 
= conexaoDB.define('CategoriaUser', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
},{
  freezeTableName: true,
  timestamps: false
});
module.exports = CategoriaUser;