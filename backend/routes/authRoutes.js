// routes/authRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/authController');
const { verifyCredentials } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', verifyCredentials, loginUser);

module.exports = router;

