
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Añadir producto a favoritos
router.post('/', async (req, res) => {
  const { usuario_id, producto_id } = req.body;
  try {
    // Verificar si ya existe
    const exists = await pool.query(
      'SELECT * FROM favoritos WHERE usuario_id = $1 AND producto_id = $2',
      [usuario_id, producto_id]
    );
    if (exists.rows.length > 0) {
      return res.status(400).json({ message: 'Este producto ya está en favoritos' });
    }

    await pool.query(
      'INSERT INTO favoritos (usuario_id, producto_id) VALUES ($1, $2)',
      [usuario_id, producto_id]
    );
    res.json({ message: 'Producto añadido a favoritos' });
  } catch (err) {
    console.error('Error al añadir favorito:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener favoritos del usuario
router.get('/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT p.* FROM productos p
       INNER JOIN favoritos f ON p.id = f.producto_id
       WHERE f.usuario_id = $1`,
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener favoritos:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Eliminar producto de favoritos
router.delete('/', async (req, res) => {
  const { usuario_id, producto_id } = req.body;
  try {
    await pool.query(
      'DELETE FROM favoritos WHERE usuario_id = $1 AND producto_id = $2',
      [usuario_id, producto_id]
    );
    res.json({ message: 'Producto eliminado de favoritos' });
  } catch (err) {
    console.error('Error al eliminar favorito:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
