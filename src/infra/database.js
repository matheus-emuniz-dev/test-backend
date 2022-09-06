import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from '../domain/user/user.entity';

export default {
  connect() {
    mongoose.connect(process.env.DATABASE_URL);
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
