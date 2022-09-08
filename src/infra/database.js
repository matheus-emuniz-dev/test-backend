import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from '../domain/user/user.entity.js';
import config from './config.js';

const currentConfig = config.get();

export default {
  connect() {
    mongoose.connect(currentConfig.databaseUrl);
  },

  async setupMock() {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoose.connect(uri);

    await User.create({
      nome: 'teste',
      email: 'teste@email.co',
      senha: '123',
      telefones: [],
    });

    return async () => {
      await mongod.stop();
    };
  },
};
