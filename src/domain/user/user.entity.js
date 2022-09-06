import mongoose from 'mongoose';
import { hash, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

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
});

UserSchema.pre('save', async function (next) {
  this.senha = await hash(this.senha, 10);

  this.token = jwt.sign({
    sub: this.id,
  }, process.env.AUTH_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });

  next();
});

UserSchema.methods.comparePassword = function (password) {
  return compareSync(password, this.senha);
};

const User = model('User', UserSchema);

export default User;
