const express = require('express');
const sequelize = require('../utils/database'); 

const adminController = require('../controllers/admincontroller');

const router = express.Router();

//router.post('/add-organizador', adminController.addOrganizador);
router.put('/evento-aprovar', adminController.aprovarEvento); 
router.put('/eventos-rejeitar', adminController.rejeitarEvento); 
module.exports = router;