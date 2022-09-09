import mongoose from 'mongoose';
import { hash, compareSync } from 'bcrypt';
import jwt from '../../infra/jwt.js';

const { Schema, model } = mongoose;

export const UserSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now(),
  },
  dataAtualizacao: {
    type: Date,
    default: Date.now(),
  },
  ultimoLogin: {
    type: Date,
    default: Date.now(),
  },
  telefones: [{
    numero: {
      type: String,
      required: true,
      trim: true,
    },
    ddd: {
      type: String,
      required: true,
      trim: true,
    },
  }],
  token: {
    type: String,
  },
}, {
  methods: {
    compareSenha(password) {
      return compareSync(password, this.senha);
    },

    generateToken() {
      this.token = jwt.sign({
        payload: {
          iss: 'test-backend',
          sub: this.id,
          iat: new Date().getTime(),
          context: {
            email: this.email,
            telefones: this.telefones,
          },
        },
      });
    },
  },
});

UserSchema.pre('save', async function (next) {
  this.senha = await hash(this.senha, 10);

  this.generateToken();

  next();
});

const User = model('User', UserSchema);

export default User;
