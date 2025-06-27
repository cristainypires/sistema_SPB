const { Evento, Bilhete } = require("../models");
const Cupon = require("../models/cupon");

// Função chamada por: POST /eventos
exports.criarEvento = async (req, res) => {
  const {
    titulo,
    data,
    descricao,
    local,
    preco,
    quantidadeTotal,
    organizadorId,
    statusVenda,
    avaliacao,
  } = req.body;
  if (!titulo || !data || !preco || !quantidadeTotal || !organizadorId) {
    return res.status(400).json({ msg: "Campos obrigatórios em falta." });
  }

  try {
    const novoEvento = await Evento.create({
      titulo,
      data,
      descricao,
      local,
      preco,
      quantidadeTotal,
      organizadorId,
      statusVenda,
      avaliacao,
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Erro no servidor.",
      erro: error.message,
      stack: error.stack,
    });
  }
};

// Função chamada por: GET /eventos/:organizerId
exports.listarMeusEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { organizadorId: req.params.Idorganizer },
    });
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: PUT /eventos/:id
exports.atualizarEvento = async (req, res) => {
  const eventoId = req.params.id;

  const { titulo, data, descricao, local, preco, quantidadeTotal } = req.body;

  try {
    const evento = await Evento.findByPk(eventoId);
    if (!evento) {
      return res.status(404).json({ msg: "Evento não encontrado." });
    }

    await Evento.update(
      { titulo, data, descricao, local, preco, quantidadeTotal },
      { where: { id: eventoId } }
    );

    res.json({ msg: "Evento atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: DELETE /eventos/:id
exports.removerEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).json({ msg: "Evento não encontrado." });
    }
    await Evento.destroy({ where: { id: req.params.id } });

    res.json({ msg: "Evento removido com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: PUT /eventos/:id/status-venda
exports.atualizarStatusVenda = async (req, res) => {
  const { statusVenda } = req.body;
  const statusPermitidos = ["open", "paused", "sold_out", "finished"];

  if (!statusVenda || !statusPermitidos.includes(statusVenda)) {
    return res.status(400).json({ msg: "Status de venda inválido." });
  }

  try {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) {
      return res.status(404).json({ msg: "Evento não encontrado." });
    }

    evento.statusVenda = statusVenda;
    await evento.save();

    res.json({
      msg: `Status da venda atualizado para '${statusVenda}'.`,
      evento,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: POST /bilhetes/validar
exports.validarBilhete = async (req, res) => {
  const { qrCodeData } = req.body;

  try {
    const bilhete = await Bilhete.findOne({ where: { qrCodeData } });
    if (!bilhete) {
      return res.status(404).json({ msg: "Bilhete inválido." });
    }

    if (bilhete.status === "used") {
      return res.status(400).json({ msg: "Este bilhete já foi utilizado." });
    }
    if (bilhete.status === "cancelled") {
      return res.status(400).json({ msg: "Este bilhete foi cancelado." });
    }

    bilhete.status = "used";
    await bilhete.save();

    res.json({ msg: "Bilhete validado com sucesso!", bilhete });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: POST /cupons
exports.criarCupon = async (req, res) => {
  try {
    const { code, descricao, valor, Dataexpira } = req.body;
    // Verifica se já existe cupom com o mesmo código
    const cuponExistente = await Cupon.findOne({ where: { code } });
    if (cuponExistente) {
      return res
        .status(400)
        .json({ msg: "Já existe um cupom com esse código." });
    }
    const novoCupon = await Cupon.create({
      code,
      descricao,
      valor,
      Dataexpira,
    });
    res.status(201).json(novoCupon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao criar cupom.", erro: error.message });
  }
};

// Função chamada por: POST /bilhetes
exports.criarBilhete = async (req, res) => {
  try {
    const {
      tipo,
      preco,
      quantidadeDisponivel,
      qrCodeData,
      eventoId,
      clienteId,
      cuponId,
    } = req.body;
    const novoBilhete = await Bilhete.create({
      tipo,
      preco,
      quantidadeDisponivel,
      qrCodeData,
      eventoId,
      clienteId,
      cuponId,
    });
    res.status(201).json(novoBilhete);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Erro ao criar bilhete.", erro: error.message });
  }
};

// Função chamada por: GET /bilhetes/:id
exports.verBilhetePorId = async (req, res) => {
  try {
    const bilhete = await Bilhete.findByPk(req.params.id);
    if (!bilhete) {
      return res.status(404).json({ msg: "Bilhete não encontrado." });
    }
    res.status(200).json(bilhete);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Erro ao buscar bilhete.", erro: error.message });
  }
};
