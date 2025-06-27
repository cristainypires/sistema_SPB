
const Cliente = require('./cliente');
const Evento = require('./evento');
const Bilhete = require('./bilhete');
const Cupon = require('./cupon');
const Utilizador = require('./utilizador');
const CategoriaUser = require('../models/categoriaUser');

CategoriaUser.hasMany(Utilizador, {
  foreignKey: {
    name: 'id_categoria',
    allowNull: false
  },
  as: 'utilizadores'
});

Utilizador.belongsTo(CategoriaUser, {
  foreignKey: {
    name: 'id_categoria',
    allowNull: false
  },
  as: 'categoria'
});

//  "organizador de eventos tem um ou mais eventos associados a ele"

Cliente.hasMany(Evento, {
  foreignKey: { name: 'organizadorId', allowNull: false },
  as: 'eventosOrganizados'
});
Evento.belongsTo(Cliente, {
  foreignKey: { name: 'organizadorId', allowNull: false },
  as: 'organizador'
});


//  "um evento tem vários bilhetes associados a ele"

Evento.hasMany(Bilhete, {
  foreignKey: { name: 'eventoId', allowNull: false },
  as: 'bilhetesVendidos'
});
Bilhete.belongsTo(Evento, {
  foreignKey: { name: 'eventoId', allowNull: false },
  as: 'evento'
});


//  "um cliente tem um ou mais bilhetes associados a ele"

Cliente.hasMany(Bilhete, {
  foreignKey: { name: 'clienteId', allowNull: false },
  as: 'bilhetesComprados'
});
Bilhete.belongsTo(Cliente, {
  foreignKey: { name: 'clienteId', allowNull: false },
  as: 'comprador'
});




Cupon.hasMany(Bilhete, {
  foreignKey: {
    name: 'cuponId',
    allowNull: true 
  },
  as: 'bilhetesOndeFoiUsado'
});
Bilhete.belongsTo(Cupon, {
  foreignKey: {
    name: 'cuponId',
    allowNull: true
  },
  as: 'cupomAplicado'
});



module.exports = {
  Cliente,
  Evento,
  Bilhete,
  Cupon
};