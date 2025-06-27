

const express = require('express');
const { inicializarDB } = require('./models/index'); 
const bodyParser = require('body-parser');
const sequelize = require('../sistema_SPB/models/index');


const rotasAdmin = require('../sistema_SPB/routes/admin'); 
const rotasUser = require('../sistema_SPB//routes/users');
const rotasOrganizador = require('../sistema_SPB//routes/organizador_evento');
const rotasClientes = require('../sistema_SPB//routes/clientes');
const Utilizador = require('../sistema_SPB/models/utilizador');

require('dotenv').config();
const servidor = express();


servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;



servidor.use('/admin', rotasAdmin);

servidor.use('/organizador', rotasOrganizador);

servidor.use('/users', rotasUser);

servidor.use('/clientes', rotasClientes);





inicializarDB()
  .then(() => {
    console.log('BD ok. Conexão estabelecida com sucesso.');
    servidor.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    
  }).catch(erro => {
    console.error('Falha fatal ao inicializar BD: ', erro);
    process.exit(1);

  });