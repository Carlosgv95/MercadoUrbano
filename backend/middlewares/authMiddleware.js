const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware para verificar que las credenciales básicas estén presentes
 * Se usa en rutas como /auth/login o /auth/register
 */
const verifyCredentials = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }
  next();
};

/**
 * Middleware para verificar el token JWT en rutas protegidas
 */
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado. Acceso no autorizado.' });
    }

    // Extraer token del encabezado
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar datos del usuario en la request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido o malformado.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Inicie sesión nuevamente.' });
    }
    console.error('Error al verificar token:', error);
    res.status(500).json({ message: 'Error interno al verificar el token.' });
  }
};

module.exports = { verifyCredentials, verifyToken };

