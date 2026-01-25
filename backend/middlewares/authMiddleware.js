// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyCredentials = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }
  next();
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado. Acceso no autorizado.' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido o malformado.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Inicie sesión nuevamente.' });
    }
    res.status(500).json({ message: 'Error al verificar el token.' });
  }
};

module.exports = { verifyCredentials, verifyToken };
