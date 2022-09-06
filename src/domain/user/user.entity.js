import mongoose from 'mongoose';
import { genSalt, hash, compareSync } from 'bcrypt';
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
    validate: {
      validator(val, a) {
        console.log(a);
        return true;
      },
      message: () => 'E-mail já existente',
    },
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
    required: true,
  },
});

const salt = genSalt(10);

UserSchema.pre('save', async function (next) {
  this.senha = await hash(this.senha, salt);

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
