const express = require("express");
const router = express.Router();

const clienteController = require("../controllers/clienteController");

router.get("/eventos", clienteController.listarEventosDisponiveis);

router.get("/eventos/:id", clienteController.verEvento);

router.post("/comprar-bilhetes", clienteController.comprarBilhetes);

router.get("/meus-bilhetes/:userId", clienteController.verHistorico);

router.post("/avaliar-evento", clienteController.avaliarEvento);

router.post("/aplicar-cupom", clienteController.aplicarCupom);

// Adiciona um novo cliente
router.post("/", clienteController.criarCliente);

// Adiciona rota para listar todos os clientes
router.get("/", clienteController.listarClientes);

module.exports = router;
