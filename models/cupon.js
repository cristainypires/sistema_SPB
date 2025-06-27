const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Cupon = sequelize.define('Cupon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    Dataexpira: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Cupon;