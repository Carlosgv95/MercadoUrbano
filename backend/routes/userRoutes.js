// routes/userRoutes.js
const express = require('express');
const { registerUser, getUserProfile } = require('../controllers/userController');
const { verifyCredentials, verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * POST /usuarios
 * Registro de nuevos usuarios en MercadoUrbano
 * Middleware verifyCredentials asegura que email y password estén presentes
 */
router.post('/usuarios', verifyCredentials, registerUser);

/**
 * GET /usuarios
 * Devuelve los datos del usuario autenticado
 * Middleware verifyToken valida el JWT antes de acceder a los datos
 */
router.get('/usuarios', verifyToken, getUserProfile);

module.exports = router;
