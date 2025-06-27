const models = require("../models");
const Cliente = models.Cliente;
const Evento = models.Evento;
const Bilhete = models.Bilhete;
const Cupon = models.Cupon;
const sequelize = models.sequelize || require("../utils/database");
const { v4: uuidv4 } = require("uuid");

const { Op } = require("sequelize");

// Função chamada por: GET /eventos
exports.listarEventosDisponiveis = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: {
        data: { [Op.gt]: new Date() },
      },
      include: [
        {
          model: Cliente,
          as: "organizador",
          attributes: ["nome"], // Corrigido para 'nome' conforme model Cliente
          required: false, // Permite eventos mesmo sem organizador válido
        },
      ],
      order: [["data", "ASC"]], // Ordena por data, mostrando os mais próximos primeiro
    });
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro no servidor.", erro: error.message });
  }
};

// Função chamada por: GET /eventos/:id
exports.verEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id, {
      include: {
        model: Cliente,
        as: "organizador",
        attributes: ["name"],
      },
    });

    if (!evento) {
      return res.status(404).json({ msg: "Evento não encontrado." });
    }
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: POST /aplicar-cupom
exports.aplicarCupom = async (req, res) => {
  const { code, eventoId } = req.body;
  try {
    const cupom = await Cupon.findOne({ where: { code: code.toUpperCase() } });

    if (!cupom) {
      return res.status(404).json({ msg: "Cupom inválido." });
    }

    res.json({
      msg: "Cupom válido!",
      desconto: cupom.valor,
      tipo: cupom.discountType,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: POST /comprar-bilhetes
// Define o preço final como o preço original do evento.
// Se um cupom válido for fornecido, aplica o desconto do cupom.
// Garante que o preço final não fique abaixo de zero.
exports.comprarBilhetes = async (req, res) => {
  const {
    clienteId,
    eventoId,
    quantidade,
    cuponId,
    tipo,
    preco,
    quantidadeDisponivel,
  } = req.body;
  if (!tipo || !preco || !quantidadeDisponivel) {
    return res.status(400).json({
      msg: "Campos obrigatórios do bilhete (tipo, preco, quantidadeDisponivel) em falta.",
    });
  }
  

  try {
    const evento = await Evento.findByPk(eventoId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!evento) throw new Error("Evento não encontrado.");

    if (evento.quantidadeVendida + quantidade > evento.quantidadeTotal) {
      throw new Error("Não há bilhetes suficientes disponíveis.");
    }

    let precoFinal = evento.preco;

    if (cuponId) {
      const cupom = await Cupon.findByPk(cuponId, { transaction: t });
      if (cupom) {
        precoFinal = Math.max(0, evento.preco - cupom.valor);
      }
    }

    // Cria os bilhetes e atualiza a contagem de vendidos
    for (let i = 0; i < quantidade; i++) {
      await Bilhete.create(
        {
          tipo,
          preco,
          quantidadeDisponivel,
          precoPago: precoFinal,
          qrCodeData: uuidv4(),
          clienteId,
          eventoId,
          cuponId: cuponId || null,
        },
        { transaction: t }
      );
    }

    evento.quantidadeVendida += quantidade;
    await evento.save({ transaction: t });

    // Se tudo deu certo, confirma a transação
    await t.commit();
    res.status(201).json({ msg: "Compra realizada com sucesso!" });
  } catch (error) {
  
    res
      .status(500)
      .json({ msg: error.message || "Erro ao processar a compra." });
  }
};

// Função chamada por: GET /meus-bilhetes/:userId
exports.verHistorico = async (req, res) => {
  try {
    console.log("userId recebido:", req.params.userId);
    const bilhetes = await Bilhete.findAll({
      where: { clienteId: req.params.userId },
      
    });
    console.log("Resultado da busca de bilhetes:", bilhetes);
    res.json(bilhetes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor.");
  }
};

// Função chamada por: POST /avaliar-evento
exports.avaliarEvento = async (req, res) => {
  res
    .status(501)
    .json({ msg: "Funcionalidade de avaliação ainda não implementada." });
};

// Função chamada por: POST /clientes
exports.criarCliente = async (req, res) => {
  try {
    const { nome, endereco, telefone } = req.body;
    const novoCliente = await Cliente.create({ nome, endereco, telefone });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Erro ao criar cliente.",
      erro: error.message,
      stack: error.stack,
    });
  }
};

// Função chamada por: GET /clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Erro ao buscar clientes.", erro: error.message });
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
