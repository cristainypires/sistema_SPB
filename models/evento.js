const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Evento = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusVenda: {
      type: DataTypes.ENUM("ABERTO", "FECHADO", "SOUL-OUT", "TERMINADO"),
      allowNull: false,
      defaultValue: "ABERTO",
    },
    avaliacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizadorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Cliente",
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Evento;
