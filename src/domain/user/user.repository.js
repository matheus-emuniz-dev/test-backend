import User from './user.entity.js';

export default class UserRepository {
  static create(userCreateDto) {
    return User.create(userCreateDto);
  }

  static findById(id) {
    return User.findOne({
      id,
    });
  }

  static findByEmail(email) {
    return User.findOne({
      email,
    });
  }

  static updateUltimoLogin(id) {
    return User.updateOne({
      id,
    }, {
      $set: {
        ultimoLogin: Date.now(),
        dataAtualizacao: Date.now(),
      },
    });
  }
}
