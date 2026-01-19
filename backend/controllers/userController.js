// controllers/userController.js
const { registerUser, getUserDataByEmail } = require('../models/userModel');

/**
 * Controlador para la ruta POST /usuarios (Registro de nuevos usuarios).
 */
const registerUserController = async (req, res) => {
    try {
        const { nombre, email, password, rol, lenguaje } = req.body;
        
        // Validaciones básicas
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios.' });
        }

        // Rol y lenguaje pueden tener valores por defecto en el modelo
        const newUser = await registerUser(nombre, email, password, rol, lenguaje);
        
        res.status(201).json({ 
            message: 'Usuario registrado con éxito en MercadoUrbano', 
            user: newUser 
        });
    } catch (error) {
        console.error('Error en userController.registerUserController:', error);
        res.status(error.code || 500).json({ 
            message: error.message || 'Error interno del servidor al registrar el usuario.' 
        });
    }
};

/**
 * Controlador para la ruta GET /usuarios (Obtener datos de usuario autenticado).
 * Requiere que el middleware verifyToken haya adjuntado req.user.
 */
const getUserDataController = async (req, res) => {
    try {
        const { email } = req.user; // viene del JWT
        
        const userData = await getUserDataByEmail(email);
        
        if (!userData) {
            return res.status(404).json({ message: 'Datos de usuario no encontrados.' });
        }
        
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error en userController.getUserDataController:', error);
        res.status(error.code || 500).json({ 
            message: error.message || 'Error interno del servidor al obtener los datos del usuario.' 
        });
    }
};

module.exports = {
    registerUserController,
    getUserDataController
};
