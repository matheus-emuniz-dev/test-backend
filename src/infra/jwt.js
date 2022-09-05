import jwt from 'jsonwebtoken';
import config from './config.js';

const currentConfig = config.get();

export default {
  verify(payload) {
    return jwt.verify(payload, currentConfig.secret);
  },

  sign(payload) {
    return jwt.sign(payload, currentConfig.secret);
  },

  decode(payload) {
    return jwt.decode(payload);
  },
};
