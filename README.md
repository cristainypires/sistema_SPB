Software para Plataforma de Bilhetes - SPB

Objetivo Geral:
Desenvolver e criar um sistema para fazer compra de bilhetes de um determinado evento,
permitindo que os utilizadores façam compras via web ou aplicativo, armazenando as
informações num base de dados.

Funcionalidades:
Cadastro e login de users
Criação, listagem, atualização e remoção de eventos
Compra de bilhetes com ou sem cupom de desconto
Histórico de bilhetes comprados por cliente
Visualização de bilhete por ID
Criação e aplicação de cupons
Rotas administrativas para aprovação ou rejeição de eventos
Proteção de rotas com autenticação JWT
Mensagens de erro detalhadas para facilitar o uso e o debug

Como o sistema funciona
Utilizadores (users) podem se registrar e fazer login.
Clientes podem se cadastrar, visualizar eventos, comprar bilhetes, aplicar cupons e ver seu histórico de compras.
Organizadores podem criar, editar, remover eventos, criar bilhetes e cupons para seus eventos.
Administradores podem aprovar ou rejeitar eventos criados pelos organizadores.
Todas as informações são armazenadas em um banco de dados PostgreSQL.
O sistema retorna mensagens claras de sucesso ou erro para cada operação.



Principais Endpoints
Users 
POST /users/registar
Registrar novo utilizador 
POST /users/login
Login de utilizador 
Clientes
POST /clientes/
Cadastrar novo cliente
GET /clientes/
Listar todos os clientes
GET /clientes/eventos
Listar eventos disponíveis
GET /clientes/eventos/:id
Ver detalhes de um evento
POST /clientes/comprar-bilhetes
Comprar bilhetes para um evento
(Body: clienteId, eventoId, quantidade, tipo, preco, quantidadeDisponivel)
GET /clientes/meus-bilhetes/:userId
Ver histórico de bilhetes do cliente
GET /clientes/bilhetes/:id
Ver detalhes de um bilhete
POST /clientes/aplicar-cupom
Aplicar cupom de desconto (code, eventoId)
POST /clientes/avaliar-evento
Avaliar evento 

Organizador
POST /organizador/eventos
Criar novo evento
GET /organizador/eventos/:organizadorId
Listar eventos do organizador
PUT /organizador/eventos/:id
Atualizar evento
DELETE /organizador/eventos/:id
Remover evento
PUT /organizador/eventos/:id/status-venda
Atualizar status de venda do evento
POST /organizador/bilhetes
Criar bilhete para evento
GET /organizador/bilhetes/:id
Ver bilhete por ID
POST /organizador/cupons
Criar cupom de desconto

Administrador
PUT /admin/evento-aprovar
Aprovar evento (Body: { "eventoId": 1 })
PUT /admin/eventos-rejeitar
Rejeitar evento (Body: { "eventoId": 1 })
