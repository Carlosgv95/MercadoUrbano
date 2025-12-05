// backend/routes/test.route.js

const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controllers'); // Lo crearemos en el paso 3

// Ruta de prueba
router.get('/', testController.test);

module.exports = router;