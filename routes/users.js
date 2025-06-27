const express = require("express");
const gerirUsers = require("../controllers/gerirUsers");
const Utilizador = require("../models/utilizador");
const router = express.Router();

router.post(`/registar`, gerirUsers.registarUser);
router.post(`/login`, gerirUsers.fazerLogin);

module.exports = router;
