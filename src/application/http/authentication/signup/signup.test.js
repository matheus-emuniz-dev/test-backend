import {
  beforeAll, describe, expect, it,
} from 'vitest';
import request from 'supertest';
import dotenv from 'dotenv';
import { app } from '../../../server';
import database from '../../../../infra/database';

dotenv.config();

beforeAll(database.setupMock);

describe.concurrent('Sign Up', () => {
  const url = '/api/auth/signup';
  const server = request(app);

  it('should return 400 when there is a validation error', () => server.post(url).send({}).expect(400));

  it('should return 422 when email already exists', () => server.post(url).send({
    nome: 'teste',
    email: 'teste@email.co',
    senha: '123',
    telefones: [{
      numero: '333333333',
      ddd: '123',
    }],
  }).expect(422));

  it('should return 200 when payload is valid', () => server.post(url).send({
    nome: 'teste',
    email: 'testenaoexiste@email.co',
    senha: '123',
    telefones: [{
      numero: '333333333',
      ddd: '123',
    }],
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
