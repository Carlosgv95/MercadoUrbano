
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Registro de usuario
router.post('/', async (req, res) => {
  const { nombre, apellido, telefono, direccion, email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Este correo ya está registrado' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, telefono, direccion, correo, contrasena)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nombre, apellido, telefono, direccion, correo, creado_en`,
      [nombre, apellido, telefono, direccion, email, password_hash]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito', user: result.rows[0] });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
  if (result.rows.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.contrasena);
  if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    user: {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.telefono,
      direccion: user.direccion,
      correo: user.correo
    },
    token
  });
});


// Actualizar perfil
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, direccion, correo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE usuarios SET nombre=$1, apellido=$2, telefono=$3, direccion=$4, correo=$5 WHERE id=$6 RETURNING id, nombre, apellido, telefono, direccion, correo`,
      [nombre, apellido, telefono, direccion, correo, id]
    );
    res.json({ message: 'Perfil actualizado', user: result.rows[0] });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Eliminar cuenta
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
