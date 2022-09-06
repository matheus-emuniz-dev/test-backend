import UserReturnDto from '../../../domain/user/dto/userReturnDto.js';
import UserRepository from '../../../domain/user/user.repository.js';

async function signin(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(401).json({
      mensagem: 'Usuário e/ou senha inválidos',
    });
  }

  const user = await UserRepository.findByEmail(email);

  if (!user || user.comparePassword(senha, user.senha)) {
    return res.status(401).json({
      mensagem: 'Usuário e/ou senha inválidos',
    });
  }

  user.ultimoLogin = Date.now();
  user.save();

  const userReturnDto = new UserReturnDto(user.toJSON());

  return res.status(200).json(userReturnDto);
}

export default signin;
