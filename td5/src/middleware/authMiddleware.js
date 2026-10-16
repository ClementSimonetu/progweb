import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
// 1. Récupérer le header Authorization
  const authHeader = req.headers.authorization;

  // 2. Vérifier si le header existe et commence par "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      success: false,
      message: 'Accès refusé : Token manquant ou mal formaté'
    };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedPayload;

    next();
  } catch (err){
    return {
        success: false,
        message: 'Access refused: token invalid or expired.'
    }
  }
}