## Para rodar a aplicação siga os passos abaixo

- 1 Realizar o clone da aplicação

```bash
git clone https://github.com/jairoevaristo/pratica-web.git
```

- 2 Entrar na pasta do projeto

```bash
cd autenticao-web
```

- 3 Baixar as dependências

```bash
npm install
```
<hr>

 **ATENÇÃO**
  - Para ter acesso ao projeto sem a parte de estilização e css é necessário acessar a branch `features/old-project`, execute o comando abaixo.

```bash
git checkout features/old-project
```

 - Em seguida é necessário configurar as variáveis de ambiente com as informações do banco de dados MongoDB no arquivo `.env.development` na raiz do projeto.
<hr>

- 4 Subir o servidor web

```bash
npm start
```


Por fim acesse o endereço `localhost:3000/produto` onde o projeto está rodando
