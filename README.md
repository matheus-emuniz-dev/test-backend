# test-backend

## Pré-requisitos

### Node 
- A versão utilizada no desenvolvimento foi v16.17.0

### MongoDB 
- MongoDB Atlas utilizado no desenvolvimento

### Criar e preencher .env com variáveis de ambiente
```
NODE_ENV = 'development'

DEV_DATABASE_URL = 'mongodb+srv://...'

DEV_SECRET = 'YOUR_DEV_SECRET'

```

## Rodando a aplicação e testes

- Aplicação
```
npm install
npm run start:dev
```
- Testes unitários (MongoDB mockado)
```
npm run test
```
