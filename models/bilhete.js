const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Bilhete = sequelize.define(
  "Bilhete",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidadeDisponivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qrCodeData: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Evento",
        key: "id",
      },
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cliente",
        key: "id",
      },
    },
    cuponId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Cupon",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Bilhete;
