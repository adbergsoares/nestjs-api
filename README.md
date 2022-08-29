<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

Projeto de API NestJS e MySQL.

Criar uma API, que responde as funcionalidades CRUD para uma entidade "Usuários" com acesso restrito mediante autenticação.

## Funcionalidades

- Exibir lista de usuários cadastrados
- Cadastrar um novo usuário
- Editar um usuário cadastrado
- Autenticação de usuário com JWT
- Busca de usuários pelo nome, email, telefone e/ou níveis de acesso (podendo facilmente acrescentar ou reduzir os itens da lista de filtro)
- Dois níveis de acesso de usuário: padrão e admin ("admin || standard")
	- O usuário padrão poderá apenas consultar informações e editar seu próprio perfil
	- O usuário admin poderá consultar informações e cadastrar/editar todos usuários

User seed criado conforme abaixo:

```json
{
  "name": "Nome Sobrenome",
  "password": "Andromeda@7",
  "email": "nome.sobrenome@email.com",
  "permission": "admin",
  "phone": "011955551234"
}
```
E-mail único por usuário com validação de formato.
Acrescido validador básico para força da senha:
- 6 a 20 caracteres 
- 1 letra maiúscula 
- 1 letra minuscula 
- 1 numero ou carácter especial
Senha encriptada persistida no banco.
Formato 0 + DDD + numero (nono digito opcional)

## Para rodar este projeto localmente
```bash
$ git clone https://github.com/adbergsoares/nestjs-api
$ cd nestjs-api
$ cp .env.example .env
$ npx prisma migrate dev --name init #antes de rodar este comando verifique sua configuracao com banco em .env
$ npx prisma db seed #para gerar o user seed
$ npm run start
```
O projeto fica disponível no IP local na porta definida em .env

## Acessar API

Realizar login enviando email e password via POST para: http://URL:PORT/login que retorna access_token usado nas demais requisições

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{
      "email": "nome.sobrenome@email.com", 
      "password": "Andromeda@7"
      }' \
    http://URL:PORT/login
```

Receber lista de usuários cadastrados

```bash
curl -X GET -H "Content-Type: application/json" \
    -H "Authorization: Bearer {token}" \
    http://URL:PORT/user
```

Receber lista de usuários usando um ou mais filtros
 
```bash
curl -X GET -H "Content-Type: application/json" \
    -H "Authorization: Bearer {token}" \
    -d '{
      "name": "Nome Sobrenome", 
      "email": "nome.sobrenome@email.com",
      "permission": "admin",
      "phone": "011955551234"
      }' \
    http://URL:PORT/user
```

Cadastrar usuário

```bash
curl -X POST -H "Content-Type: application/json" \
    -H "Authorization: Bearer {token}" \
    -d '{
      "name": "Nome Sobrenome", 
      "email": "nome.sobrenome@email.com",
      "password": "Andromeda@7",
      "permission": "admin",
      "phone": "011955551234"
      }' \
    http://URL:PORT/user
```

Editar usuário

```bash
curl -X PATCH -H "Content-Type: application/json" \
    -H "Authorization: Bearer {token}" \
    -d '{
      "name": "Nome Sobrenome", 
      "email": "nome.sobrenome@email.com",
      "password": "Andromeda@7",
      "permission": "admin",
      "phone": "011955551234"
      }' \
    http://URL:PORT/user
```
