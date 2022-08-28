#  <img src="http://logonoid.com/images/laravel-logo.png" width="35"> Laravel - Endpoint REST

Projeto de API NestJS e MySQL.

Criar uma API, que responde as funcionalidades CRUD para uma entidade "Usuários" com acesso restrito mediante autenticação.

## Funcionalidades

- Exibir lista de usuários cadastrados
- Cadastrar um novo usuário
- Editar um usuário cadastrado
- Autenticação de usuário com JWT
- Busca de usuários pelo nome, email, telefone e/ou níveis de acesso (podendo facilmente acrescentar ou reduzir os itens da lista de filtro)
- Dois níveis de acesso de usuário: padrão e admin
	- O usuário padrão poderá apenas consultar informações e editar seu próprio perfil
	- O usuário admin poderá consultar informações e cadastrar/editar todos usuários

```json
{
  "name": "Nome Sobrenome",
  "password": "Andromeda@7",
  "email": "nome.sobrenome@email.com",
  "permission": "admin || standard",
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

