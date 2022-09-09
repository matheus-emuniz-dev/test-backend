# test-backend

## Pré-requisitos

### Node 
- A versão utilizada no desenvolvimento foi v16.17.0

### MongoDB 
O projeto inclui um docker-compose.yml para start local de um MongoDB. Caso o utilize, no .env inserir o DEV_DATABASE_URL = mongodb://admin:OQAFI4t-6q.=0(Wg@localhost:27017/admin

### Criar e preencher .env com variáveis de ambiente
```
NODE_ENV = 'development'

DEV_DATABASE_URL = 'mongodb://...'

DEV_SECRET = 'YOUR_DEV_SECRET'

```

## Rodando a aplicação e testes

- Instalação
```
npm install
```

- Aplicação
```
npm run start:dev
```
- Testes unitários (MongoDB mockado)
```
npm run test
```
