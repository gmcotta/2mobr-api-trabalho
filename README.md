# 2MOBR - API and Microservices Development

Trabalho final para a disciplina de API and Microservices Development, do MBA de Mobile Development da FIAP (versão com Docker).

## Atividade

O aluno deve desenvolver três estruturas de backend , sendo a primeira para cadastrar usuários, onde este deva conter os seguintes campos: nomeusuario, email, senha, nomecompleto, telefone, datacadastro. Nesta estrutura deve haver as seguintes ações: 

- cadastrar usuario; 
- criptografar a senha; 
- autenticar usuário; 
- gerar o token com jwt; 
- alterar senha. 

Quando o usuário realizar o processo de autenticação e este for confirmado, teremos de retorno algumas informações do usuário dentre elas o token. Esse token é importante, pois é com ele que iremos acessar os outros serviços que serão criados.

Para a segunda parte da atividade, crie uma estrutura de backend para manipular os dados do cliente, tais como cadastrar e atualizar os clientes em um banco de dados. Lembre-se que para realizar o cadastro e atualização dos dados será necessário estar logado e fornecer o token

Para a terceira parte da atividade, o aluno deve criar uma estrutura para cadastrar e atualizar informações financeiras dos usuários. Neste projeto o aluno deve construir o código de tal forma que ao tentar cadastrar ou atualizar os dados os usuários, será requisitado o token gerado na autenticação do primeiro serviço. As informações financeiras só poderão ser cadastras e/ou atualizadas se houver um token válido. Os dados financeiros serão: 

 - nome_banco, tipo_conta, nome_titular, limite_cartao. 

*Utilize o banco de dados MongoDB para os serviços. 

## Principais tecnologias
- NodeJS
- JavaScript
- Express
- Bcrypt
- CORS
- MongoDB
- Mongoose
- JWT
- Nodemon
- Docker

## Como rodar o projeto

1) Baixar o repositório
2) Verificar se o NodeJS está instalado (estou usando a versão 18.18.2)
3) Verificar se tem o Docker instalado
4) Criar o arquivo `.env` baseado no `.env.example` e preencher as variáveis de ambiente (chave secreta do JWT, variáveis de configuração do MongoDB e as portas de cada serviço)
5) Rodar o comando `docker compose up -d` para iniciar as aplicações

## Rotas

1) Serviço Users
- GET http://localhost:[port]/api/v1/user

  Response (200)
  - output ([headers]: String)

- POST http://localhost:[port]/api/v1/user/add

  Body:
  - username (String)
  - email (String)
  - password (String)
  - fullName (String)
  - phone (String)

  Response (201):
  - output (String)
  - payload
    - username (String)

  Response (400):
  - output (String)

- PUT http://localhost:[port]/api/v1/user/change-password

  Body:
  - username (String)
  - email (String)
  - newPassword (String)

  Response (200):
  - output (String)

  Response (404):
  - output (String)

  Response (500):
  - output (String)

- POST http://localhost:[port]/api/v1/user/login

  Body:
  - username (String)
  - password (String)

  Response (200):
  - output (String)
  - payload
    - id (String)
    - username (String)

  Response (400):
  - output (String)

  Response (404):
  - output (String)

  Response (400):
  - output (String)

2) Serviço Clients 
Necessário acessar o serviço Users, na rota `/user/login` para obter o token e colocá-lo no Header token para acessar as rotas deste serviço.

- GET http://localhost:[port]/api/v1/client/search

  Header
  - token

  Response (200):
  - output (String)
  - payload
    - id (String)
    - fullName (String)
    - email (String)
    - cpf (String)
    - phone (String)
    - age (String)

  Response (400):
  - output (String)

- GET http://localhost:[port]/api/v1/client/search/:id

  Header
  - token
  
  Params:
  - id

  Response (200):
  - output (String)
  - payload
    - id (String)
    - fullName (String)
    - email (String)
    - cpf (String)
    - phone (String)
    - age (String)

  Response (400):
  - output (String)

- POST http://localhost:[port]/api/v1/client/add

  Header
  - token

  Body:
  - fullName (String)
  - email (String)
  - cpf (String)
  - phone (String)
  - age (String)

  Response (201):
  - output (String)
  - payload
    - id (String)
    - fullName (String)
    - email (String)
    - cpf (String)
    - phone (String)
    - age (String)

  Response (400):
  - output (String)

- PUT http://localhost:[port]/api/v1/client/update/:id

  Header
  - token

  Params:
  - id

  Body:
  - fullName (String)
  - email (String)
  - cpf (String)
  - phone (String)
  - age (String)

  Response (200):
  - output (String)
  - payload
    - id (String)
    - fullName (String)
    - email (String)
    - cpf (String)
    - phone (String)
    - age (String)

  Response (400):
  - output (String)

  Response (500):
  - output (String)

- DELETE http://localhost:[port]/api/v1/client/delete/:id

  Header
  - token

  Params:
  - id

  Response (204)

  Response (500):
  - output (String)

3) Serviço Banking 
Necessário acessar o serviço Users, na rota `/user/login` para obter o token e colocá-lo no Header token para acessar as rotas deste serviço.

- GET http://localhost:[port]/api/v1/banking/search

  Header
  - token

  Response (200):
  - output (String)
  - payload
    - id (String)
    - bankName (String)
    - accountType (String)
    - holderName (String)
    - cardLimit (Number)

  Response (400):
  - output (String)

- GET http://localhost:[port]/api/v1/banking/search/:id

  Header
  - token
  
  Params:
  - id

  Response (200):
  - output (String)
  - payload
    - id (String)
    - bankName (String)
    - accountType (String)
    - holderName (String)
    - cardLimit (Number)

  Response (400):
  - output (String)

- POST http://localhost:[port]/api/v1/banking/add

  Header
  - token

  Body:
  - bankName (String)
  - accountType (String)
  - holderName (String)
  - cardLimit (Number)

  Response (201):
  - output (String)
  - payload
    - id (String)
    - bankName (String)
    - accountType (String)
    - holderName (String)
    - cardLimit (Number)

  Response (400):
  - output (String)

- PUT http://localhost:[port]/api/v1/banking/update/:id

  Header
  - token

  Params:
  - id

  Body:
  - bankName (String)
  - accountType (String)
  - holderName (String)
  - cardLimit (Number)

  Response (200):
  - output (String)
  - payload
    - id (String)
    - bankName (String)
    - accountType (String)
    - holderName (String)
    - cardLimit (Number)

  Response (400):
  - output (String)

  Response (500):
  - output (String)

- DELETE http://localhost:[port]/api/v1/banking/delete/:id

  Header
  - token
  
  Params:
  - id

  Response (204)

  Response (500):
  - output (String)
