import { userValidationSchema } from './user.entity.js';

export default class UserDomainService {
  static validateUser(payload) {
    userValidationSchema.validate(payload);
  }
}
