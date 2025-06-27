const dotenv = require('dotenv'); 

const variaveisAmbiente = dotenv.config();

const {parsed: envs} = variaveisAmbiente;

module.exports = envs;
