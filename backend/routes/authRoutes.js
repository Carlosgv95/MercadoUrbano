
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devolver usuario y token (sin la contraseña)
    res.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo
      },
      token
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
