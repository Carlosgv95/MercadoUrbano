// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carga JWT_SECRET desde .env

/**
 * Middleware para verificar la existencia de credenciales (email y password) en el body.
 * Se usa en las rutas de registro y login.
 */
const verifyCredentials = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
    }
    next();
};

/**
 * Middleware para validar el token JWT en las cabeceras de autorización.
 * Decodifica el token y adjunta el payload (id y email del usuario) a req.user.
 */
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Token no proporcionado. Acceso no autorizado.' });
        }

        // El token viene en formato "Bearer TOKEN_JWT"
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Formato de token inválido. Use "Bearer <token>".' });
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adjuntar el payload decodificado a la solicitud
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error en verifyToken:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido o malformado.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado. Por favor, inicie sesión nuevamente.' });
        }
        res.status(500).json({ message: 'Error al verificar el token.' });
    }
};

module.exports = {
    verifyCredentials,
    verifyToken
};
