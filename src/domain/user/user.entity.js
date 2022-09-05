import { model, Schema } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import joi from 'joi';
import jwt from 'jsonwebtoken';

export const userSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  data_criacao: {
    type: Date,
    default: Date.now(),
  },
  data_atualizacao: {
    type: Date,
    default: Date.now(),
  },
  ultimo_login: {
    type: Date,
    default: Date.now(),
  },
  telefones: [{
    numero: {
      type: String,
      required: true,
    },
    ddd: {
      type: String,
      required: true,
    },
  }],
  token: {
    type: String,
    required: true,
  },
});

const salt = genSalt(10);

userSchema.pre('save', async function (next) {
  this.senha = await hash(this.senha, salt);

  this.token = jwt.sign({
    sub: this.id,
  }, process.env.AUTH_SECRET, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });

  next();
});

export const userValidationSchema = joi.object({
  nome: joi.string().required(),
  email: joi.string().email().required(),
  senha: joi.string(),
  telefones: joi.array().items(
    joi.object({
      numero: joi.string().required(),
      ddd: joi.string().required(),
    }),
  ).required().min(0),
});

const User = model('User', userSchema);

export default User;
