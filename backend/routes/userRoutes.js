// routes/userRoutes.js
const express = require('express');
const { registerUserController, getUserDataController, loginUserController } = require('../controllers/userController');
const { verifyCredentials, verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * POST /usuarios
 * Registro de nuevos usuarios en MercadoUrbano
 */
router.post('/usuarios', verifyCredentials, registerUserController);

/**
 * POST /login
 * Login de usuario para obtener JWT
 */
router.post('/login', verifyCredentials, loginUserController);

/**
 * GET /usuarios
 * Devuelve los datos del usuario autenticado
 */
router.get('/usuarios', verifyToken, getUserDataController);

module.exports = router;
