import User from './user.entity.js';

export default class UserRepository {
  static create(userDto) {
    return User.create({
      ...userDto.data,
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
