import jwt from '../../../infra/jwt.js';

export default function authMiddleware(req, res, next) {
  const authorizationHeader = req.header('authorization');

  let token;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    token = authorizationHeader.substring(7, authorizationHeader.length);

    let verified;

    try {
      verified = jwt.verify(token);
      req.user = verified.context;
    } catch (e) {
      return res.status(401).json({
        mensagem: 'Não autorizado',
      });
    }
  } else {
    return res.status(401).json({
      mensagem: 'Não autorizado',
    });
  }

  req.token = token;

  next();

  return true;
}
