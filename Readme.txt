Software para Plataforma de Bilhetes - SPB

Objetivo Geral
Desenvolver e criar um sistema para fazer compra de bilhetes de um determinado evento,
permitindo que os utilizadores façam compras via web ou aplicativo, armazenando as
informações num base de dados.

Funcionalidades:
- Cadastro e login de utilizadores
- Criação, listagem, atualização e remoção de eventos
- Compra de bilhetes com ou sem cupom de desconto
- Histórico de bilhetes comprados por cliente
- Visualização de bilhete por ID
- Criação e aplicação de cupons
- Rotas administrativas para aprovação ou rejeição de eventos
- Proteção de rotas com autenticação JWT
- Mensagens de erro detalhadas para facilitar o uso e o debug

Como o sistema funciona:
- Utilizadores (users) podem se registrar e fazer login.
- Clientes podem se cadastrar, visualizar eventos, comprar bilhetes, aplicar cupons e ver seu histórico de compras.
- Organizadores podem criar, editar, remover eventos, criar bilhetes e cupons para seus eventos.
- Administradores podem aprovar ou rejeitar eventos criados pelos organizadores.
- O sistema retorna mensagens claras de sucesso ou erro para cada operação.

Para que o cadastro de utilizadores funcione corretamente, 
você precisa inserir as categorias de usuário ( admin, organizador, cliente) 
na tabela CategoriaUser diretamente no banco de dados.

INSERT INTO "CategoriaUser" ("id", "nome") VALUES (1, 'admin');
INSERT INTO "CategoriaUser" ("id", "nome") VALUES (2, 'organizador');
INSERT INTO "CategoriaUser" ("id", "nome") VALUES (3, 'cliente');

Principais Endpoints 

## Users
Registrar novo utilizador
POST /users/registar
json
{
  "nome": "Maria",
  "email": "maria@gmail.com",
  "senha": "123456",
  "categoriaUserId": 2
}


Login de utilizador
POST /users/login
json
{
  "email": "maria@gmail.com",
  "senha": "123456"
}


## Clientes
Cadastrar novo cliente**
POST /clientes/
json
{
  "nome": "Cristiany",
  "endereco": "Rua das Flores",
  "telefone": "9968754"
}

Listar todos os clientes
GET /clientes/

Listar eventos disponíveis
GET /clientes/eventos

Ver detalhes de um evento
GET /clientes/eventos/:id

Comprar bilhetes para um evento
POST /clientes/comprar-bilhetes
json
{
  "clienteId": 1,
  "eventoId": 1,
  "quantidade": 2,
  "tipo": "VIP",
  "preco": 100,
  "quantidadeDisponivel": 1
}

Ver histórico de bilhetes do cliente
GET /clientes/meus-bilhetes/:userId

Ver detalhes de um bilhete
GET /clientes/bilhetes/:id

Aplicar cupom de desconto
POST /clientes/aplicar-cupom
json
{
  "code": "PROMO10",
  "eventoId": 1
}


Avaliar evento
POST /clientes/avaliar-evento
json
{
  "clienteId": 1,
  "eventoId": 1,
  "avaliacao": "Evento excelente!"
}


## Organizador
Criar novo evento
POST /organizador/eventos
json
{
  "titulo": "Show de Rock",
  "data": "2025-08-01",
  "descricao": "Grande show",
  "local": "Estádio",
  "preco": 100,
  "quantidadeTotal": 1000,
  "organizadorId": 1,
  "statusVenda": "ABERTO",
  "avaliacao": "a definir"
}


Listar eventos do organizador
GET /organizador/eventos/:organizadorId

Atualizar evento
PUT /organizador/eventos/:id
json
{
  "titulo": "Show de Rock Atualizado",
  "data": "2025-08-02",
  "descricao": "Show ainda maior",
  "local": "Arena",
  "preco": 120,
  "quantidadeTotal": 1200
}


Remover evento
DELETE /organizador/eventos/:id

Atualizar status de venda do evento
PUT /organizador/eventos/:id/status-venda
json
{
  "statusVenda": "FECHADO"
}


Criar bilhete para evento
POST /organizador/bilhetes
json
{
  "tipo": "VIP",
  "preco": 100,
  "quantidadeDisponivel": 1,
  "qrCodeData": "codigo_unico_qr",
  "eventoId": 1,
  "clienteId": 1,
  "cuponId": null
}


Ver bilhete por ID
GET /organizador/bilhetes/:id

Criar cupom de desconto
POST /organizador/cupons
json
{
  "code": "PROMO10",
  "descricao": "Desconto de 10%",
  "valor": 10,
  "Dataexpira": "2025-12-31"
}


## Administrador
Aprovar evento
PUT /admin/evento-aprovar
json
{
  "eventoId": 1
}


**Rejeitar evento**
PUT /admin/eventos-rejeitar
json
{
  "eventoId": 1
}




