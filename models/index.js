const Cliente = require("./cliente");
const Bilhete = require("./bilhete");
const Evento = require("./evento");
const Cupon = require("./cupon");
const CategoriaUser = require("./categoriaUser");
const Utilizador = require("./utilizador");
require("./relacionamentos");
const conexaoDB = require("../utils/database");

const inicializarDB = async () => {
  try {
    await conexaoDB.authenticate();
    await conexaoDB.sync();
  } catch (erro) {
    console.log("Erro conectar/sincronizar BD", erro);
    process.exit(1);
  }
};

module.exports = {
  inicializarDB,
  Cliente,
  Bilhete,
  Evento,
  Cupon,
  CategoriaUser,
  Utilizador,
};
