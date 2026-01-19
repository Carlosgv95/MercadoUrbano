// controllers/authController.js
const { findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Controlador para la ruta POST /auth/login
 * Inicia sesión y genera un token JWT.
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario en la BD
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas (email no encontrado).' });
        }

        // Validar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales inválidas (contraseña incorrecta).' });
        }

        // Generar token JWT con más información útil
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol }, // payload más completo
            process.env.JWT_SECRET,
            { expiresIn: '2h' } // puedes ajustar el tiempo de expiración
        );

        // Respuesta con datos básicos del usuario
        res.status(200).json({ 
            message: 'Autenticación exitosa en MercadoUrbano',
            token,
            user: {
                id: user.id,
                email: user.email,
                rol: user.rol,
                lenguaje: user.lenguaje
            }
        });
    } catch (error) {
        console.error('Error en authController.loginUser:', error);
        res.status(error.code || 500).json({ 
            message: error.message || 'Error interno del servidor al iniciar sesión.' 
        });
    }
};

module.exports = {
    loginUser
};
