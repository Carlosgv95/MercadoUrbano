const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const password_hash = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3)',
      [nombre, email, password_hash]
    );
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
