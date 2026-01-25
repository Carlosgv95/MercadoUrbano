const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');

// Ruta protegida
router.get('/', verifyToken, async (req, res) => {
  res.json({ carrito: [] });
});

module.exports = router;


