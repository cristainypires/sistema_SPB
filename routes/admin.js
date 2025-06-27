const express = require('express');
const sequelize = require('../utils/database'); 

const adminController = require('../controllers/admincontroller');

const router = express.Router();

//router.post('/add-organizador', adminController.addOrganizador);
router.put('/evento-aprovar', adminController.aprovarEvento); //atualizar o evento para aprovado
router.put('/eventos-rejeitar', adminController.rejeitarEvento); //atualizar o evento para rejeitado

module.exports = router;