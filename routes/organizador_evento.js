const express = require("express");
const router = express.Router();

const organizadorController = require("../controllers/organizadorController");

router.post("/eventos", organizadorController.criarEvento);

router.get("/eventos/:Idorganizer", organizadorController.listarMeusEventos);

router.put("/eventos/:id", organizadorController.atualizarEvento);

router.delete("/eventos/:id", organizadorController.removerEvento);

router.post("/bilhetes/validar", organizadorController.validarBilhete);

router.put(
  "/eventos/:id/status-venda",
  organizadorController.atualizarStatusVenda
);

router.post("/cupons", organizadorController.criarCupon);

router.post("/bilhetes", organizadorController.criarBilhete);

module.exports = router;
