const Evento = require("../models/evento");
const sequelize = require("../utils/database");

// Função para aprovar um evento
exports.aprovarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.body.eventoId); // Corrigido para buscar pelo body
    if (!evento) {
      return res.status(404).json({ msg: "Evento não encontrado." });
    }

    evento.statusVenda = "ABERTO";
    await evento.save();

    res.json({ msg: "Evento aprovado com sucesso.", evento });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função para rejeitar um evento
exports.rejeitarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.body.eventoId); // Corrigido para buscar pelo body
    if (!evento) {
      return res.status(404).json({ msg: "Evento não encontrado." });
    }

    evento.statusVenda = "FECHADO";
    await evento.save();

    res.json({ msg: "Evento rejeitado com sucesso.", evento });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};
