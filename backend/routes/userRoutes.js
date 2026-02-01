console.log(">>> userRoutes CARGADO");



const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// =========================
// REGISTRO DE USUARIO
// =========================
router.post('/', async (req, res) => {
  const { nombre, apellido, telefono, direccion, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Este correo ya está registrado' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, telefono, direccion, correo, contrasena)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nombre, apellido, telefono, direccion, correo, creado_en, foto_perfil`,
      [nombre, apellido, telefono, direccion, email, password_hash]
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// =========================
// LOGIN
// =========================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.contrasena);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        direccion: user.direccion,
        correo: user.correo,
        foto_perfil: user.foto_perfil
      },
      token
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// =========================
// ACTUALIZAR PERFIL (CORREGIDO)
// =========================
router.put('/:id', async (req, res) => {
  console.log(">>> PUT /usuarios/:id ejecutado");
  console.log("BODY RECIBIDO:", req.body);
  


  const { nombre, apellido, telefono, direccion, correo, foto_perfil } = req.body;

  try {
    const result = await pool.query(
      `UPDATE usuarios 
       SET nombre=$1, apellido=$2, telefono=$3, direccion=$4, correo=$5, foto_perfil=$6
       WHERE id=$7 
       RETURNING id, nombre, apellido, telefono, direccion, correo, foto_perfil, creado_en`,
      [nombre, apellido, telefono, direccion, correo, foto_perfil, req.params.id]
    );

    console.log("RESULTADO UPDATE:", result.rows);

    res.json({ user: result.rows[0] });

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});


// =========================
// ELIMINAR CUENTA
// =========================
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [req.params.id]);
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

