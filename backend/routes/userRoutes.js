
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { nombre, apellido, telefono, direccion, email, password } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Este correo ya está registrado' });
    }

    // Encriptar la contraseña
    const password_hash = await bcrypt.hash(password, 10);

    // Insertar el usuario en la base de datos
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, telefono, direccion, correo, contrasena)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, apellido, telefono, direccion, correo, creado_en`,
      [nombre, apellido, telefono, direccion, email, password_hash]
    );

    // Devolver el usuario creado (sin la contraseña)
    res.status(201).json({ message: 'Usuario registrado con éxito', user: result.rows[0] });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
