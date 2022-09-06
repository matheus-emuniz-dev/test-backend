import UserRepository from '../../../domain/user/user.repository.js';

async function getUserService(req, res) {
  const { userId } = req.params;

  const user = await UserRepository.findById(userId);

  if (req.token !== user.token) {
    return res.status(401).json({
      mensagem: 'Não autorizado',
    });
  }

  return res.json(user);
}

export default getUserService;
