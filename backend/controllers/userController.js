// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, getUserDataByEmail, findUserByEmail } = require('../models/userModel');

/**
 * Controlador para registrar nuevos usuarios (POST /usuarios).
 */
const registerUserController = async (req, res) => {
    try {
        const { nombre, email, password, rol, lenguaje } = req.body;

        // Validaciones básicas
        if (!nombre || !email || !password) {
            return res.status(400).json({ success: false, message: 'Nombre, email y contraseña son obligatorios.' });
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Formato de email inválido.' });
        }

        // Validar longitud mínima de contraseña
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Registrar usuario en BD
        const newUser = await registerUser(nombre, email, hashedPassword, rol, lenguaje);

        res.status(201).json({
            success: true,
            message: 'Usuario registrado con éxito en MercadoUrbano',
            data: newUser
        });
    } catch (error) {
        console.error('Error en registerUserController:', error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message || 'Error interno del servidor al registrar el usuario.'
        });
    }
};

/**
 * Controlador para login de usuario (POST /auth/login).
 */
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email y contraseña son obligatorios.' });
        }

        // Buscar usuario en BD
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            token,
            user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
        });
    } catch (error) {
        console.error('Error en loginUserController:', error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message || 'Error interno del servidor al iniciar sesión.'
        });
    }
};

/**
 * Controlador para obtener datos del usuario autenticado (GET /usuarios).
 */
const getUserDataController = async (req, res) => {
    try {
        const { email } = req.user; // viene del JWT

        const userData = await getUserDataByEmail(email);

        if (!userData) {
            return res.status(404).json({ success: false, message: 'Datos de usuario no encontrados.' });
        }

        res.status(200).json({ success: true, data: userData });
    } catch (error) {
        console.error('Error en getUserDataController:', error);
        res.status(error.code || 500).json({
            success: false,
            message: error.message || 'Error interno del servidor al obtener los datos del usuario.'
        });
    }
};

module.exports = {
    registerUserController,
    loginUserController,
    getUserDataController
};

