const { Sequelize } = require("sequelize");
const conecaoDB = require('../utils/database');



const Cliente = conecaoDB.define ('Cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: {
        type:Sequelize.STRING,
        allowNull: false
    },

    endereco:{
        type:Sequelize.STRING
    },

    telefone:{
        type:Sequelize.STRING
    },
}, 
{
    freezeTableName: true,
    timestamps: false
});

module.exports=Cliente;