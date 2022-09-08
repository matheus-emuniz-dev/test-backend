import {
  beforeAll, describe, expect, it,
} from 'vitest';
import request from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../server';
import database from '../../../../infra/database';

dotenv.config();

beforeAll(database.setupMock);

describe.concurrent('Sign In', () => {
  const url = '/api/auth/signin';

  const server = request(app);

  it('should return 401 when email is missing', () => server.post(url).send({
    email: '',
    senha: '123',
  }).expect(401));

  it('should return 401 when senha is missing', () => server.post(url).send({
    email: 'teste@email.com',
    senha: '',
  }).expect(401));

  it('should return 401 when senha is wrong', () => server.post(url).send({
    email: 'teste@email.com',
    senha: '124',
  }).expect(401));

  it('should return 401 when user doesn\'t exist', () => server.post(url).send({
    email: 'teste@emai.com',
    senha: '124',
  }).expect(401));

  it('should return 200 when credentials are correct', () => server.post(url).send({
    email: 'teste@email.co',
    senha: '123',
  }).expect(200)
    .then((response) => expect(response.body).toEqual(
      expect.objectContaining({
        nome: expect.any(String),
        email: expect.any(String),
        telefones: expect.any(Array),
        dataCriacao: expect.any(String),
        dataAtualizacao: expect.any(String),
        ultimoLogin: expect.any(String),
        token: expect.any(String),
      }),
    )));
});
