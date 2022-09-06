import dotenv from 'dotenv';
import {
  beforeAll, beforeEach, describe, it,
} from 'vitest';
import request from 'supertest';
import database from '../../../infra/database';
import { app } from '../../server';
import User from '../../../domain/user/user.entity';

dotenv.config();

beforeAll(database.setupMock);

beforeEach(async (ctx) => {
  const mockUser = await User.findOne();

  // eslint-disable-next-line prefer-destructuring
  ctx.mockUser = mockUser;
});

describe('Get User', () => {
  const url = (id) => `/api/user/${id}`;
  const server = request(app);

  it('returns 401 when token is not present', ({ mockUser }) => server
    .get(url(mockUser.id))
    .expect(401));

  it('returns 401 if request token doesn\'t belong to userId', ({ mockUser }) => server
    .get(url(mockUser.id))
    .set({ Authorization: 'Bearer 123' })
    .expect(401));

  it('returns 200 if token is valid and user exists', ({ mockUser }) => server
    .get(url(mockUser.id))
    .set({ Authorization: `Bearer ${mockUser.token}` })
    .expect(200));
});
