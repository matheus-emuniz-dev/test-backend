import User from './user.entity.js';

export default class UserRepository {
  static create(userCreateDto) {
    return User.create({
      ...userCreateDto.data,
    });
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
}
