import UserCreateDto from '../../../domain/user/DTOs/userCreateDto.js';
import UserReturnDto from '../../../domain/user/DTOs/userReturnDto.js';
import UserRepository from '../../../domain/user/user.repository.js';
import UserCreateValidator from '../../../infra/validators/userCreate.validator.js';

async function signup(req, res) {
  const userCreateData = req.body;

  const userCreateDto = UserCreateDto(userCreateData);

  const userCreateValidationResult = UserCreateValidator.validate(userCreateDto);

  if (userCreateValidationResult.error) {
    return res.status(400).json({
      mensagem: userCreateValidationResult.error,
    });
  }

  const newUser = await UserRepository.create(userCreateDto.toJSON());

  const userReturnDto = UserReturnDto(newUser.json());

  return res.status(200).json(userReturnDto);
}

export default signup;
