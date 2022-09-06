import UserCreateDto from '../../../domain/user/dto/userCreateDto.js';
import UserReturnDto from '../../../domain/user/dto/userReturnDto.js';
import UserRepository from '../../../domain/user/user.repository.js';
import UserCreateValidator from '../../../infra/validators/userCreate.validator.js';

async function signup(req, res) {
  const userCreateData = req.body;

  const userCreateDto = new UserCreateDto(userCreateData);

  const userCreateValidationResult = UserCreateValidator.validate(userCreateDto);

  if (userCreateValidationResult.error) {
    return res.status(400).json({
      mensagem: userCreateValidationResult.error,
    });
  }

  let newUser;

  try {
    newUser = await UserRepository.create(userCreateDto.toJSON());
  } catch (error) {
    if (error.code === 11000) {
      return res.status(422).json({
        mensagem: 'E-mail já existente',
      });
    }

    return req.status(500).json({
      mensagem: 'Erro ao criar usuário',
    });
  }

  const userReturnDto = new UserReturnDto(newUser.toJSON());

  return res.status(200).json(userReturnDto);
}

export default signup;
