import joi from 'joi';

class UserCreateValidator {
  static schema = joi.object({
    nome: joi.string().required('Este campo é obrigatório'),
    email: joi.string().email().required('Este campo é obrigatório'),
    senha: joi.string().required('Este campo é obrigatório'),
    telefones: joi.array().items(
      joi.object({
        numero: joi.string().required('Este campo é obrigatório'),
        ddd: joi.string().required('Este campo é obrigatório'),
      }),
    ).required('Este campo é obrigatório').min(0),
  });

  static validate(userCreateDto) {
    return this.schema.validate(userCreateDto.toJSON());
  }
}

export default UserCreateValidator;
