
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Crear orden
router.post('/', async (req, res) => {
  const { usuario_id, productos, total } = req.body;

  if (!usuario_id || !productos || productos.length === 0 || !total) {
    return res.status(400).json({ message: 'Datos incompletos para crear la orden' });
  }

  try {
    // Insertar orden en la tabla ordenes
    const ordenResult = await pool.query(
      'INSERT INTO ordenes (usuario_id, total) VALUES ($1, $2) RETURNING id',
      [usuario_id, total]
    );
    const ordenId = ordenResult.rows[0].id;

    // Insertar detalles en la tabla orden_detalles
    for (const p of productos) {
      await pool.query(
        'INSERT INTO orden_detalles (orden_id, producto_id, cantidad, precio) VALUES ($1, $2, $3, $4)',
        [ordenId, p.id, p.quantity, p.price]
      );
    }

    res.status(201).json({
      message: 'Orden creada con éxito',
      orden_id: ordenId
    });
  } catch (err) {
    console.error('Error al crear orden:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener todas las órdenes de un usuario
router.get('/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const ordenes = await pool.query(
      'SELECT * FROM ordenes WHERE usuario_id = $1 ORDER BY fecha DESC',
      [usuario_id]
    );
    res.json(ordenes.rows);
  } catch (err) {
    console.error('Error al obtener órdenes:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener detalles de una orden específica
router.get('/detalles/:orden_id', async (req, res) => {
  const { orden_id } = req.params;
  try {
    const detalles = await pool.query(
      `SELECT od.*, p.nombre, p.imagen 
       FROM orden_detalles od
       INNER JOIN productos p ON od.producto_id = p.id
       WHERE od.orden_id = $1`,
      [orden_id]
    );
    res.json(detalles.rows);
  } catch (err) {
    console.error('Error al obtener detalles de la orden:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

