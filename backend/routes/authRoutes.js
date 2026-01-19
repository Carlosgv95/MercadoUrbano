// routes/authRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/authController');
const { verifyCredentials } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * POST /auth/login
 * Inicia sesión en MercadoUrbano y devuelve un token JWT
 * Middleware verifyCredentials asegura que email y password estén presentes
 */
router.post('/login', verifyCredentials, loginUser);

module.exports = router;
