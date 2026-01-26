const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ✅ Crear publicación (POST)
router.post('/', async (req, res) => {
  const { usuario_id, nombre, categoria, descripcion, precio, imagen } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO productos (usuario_id, nombre, categoria, descripcion, precio, imagen)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [usuario_id, nombre, categoria, descripcion, precio, imagen]
    );

    res.json({ message: 'Producto creado con éxito', producto: result.rows[0] });
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// ✅ Obtener todos los productos (GET)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY creado_en DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// ✅ Obtener productos por usuario (GET)
router.get('/usuario/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM productos WHERE usuario_id = $1 ORDER BY creado_en DESC', [usuario_id]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos del usuario:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// ✅ Actualizar producto (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, descripcion, precio, imagen } = req.body;

  try {
    const result = await pool.query(
      `UPDATE productos SET nombre=$1, categoria=$2, descripcion=$3, precio=$4, imagen=$5 WHERE id=$6 RETURNING *`,
      [nombre, categoria, descripcion, precio, imagen, id]
    );

    res.json({ message: 'Producto actualizado', producto: result.rows[0] });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// ✅ Eliminar producto (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM productos WHERE id=$1', [id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

