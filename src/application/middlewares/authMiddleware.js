export default function authMiddleware(req, res, next) {
  const authorizationHeader = req.header('authorization');

  let token;

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    token = authorizationHeader.substring(7, authorizationHeader.length);
  } else {
    return res.status(401).json({
      mensagem: 'Não autorizado',
    });
  }

  req.token = token;

  next();

  return true;
}
