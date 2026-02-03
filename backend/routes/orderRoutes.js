const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken } = require('../middlewares/authMiddleware');

// Crear orden (protegida)
router.post('/', verifyToken, async (req, res) => {
  const { productos, total } = req.body;
  const usuario_id = req.user.id;

  if (!productos || productos.length === 0 || total == null) {
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

    // Obtener detalles completos con nombre e imagen
    const detallesResult = await pool.query(
      `SELECT od.*, p.nombre, p.imagen 
       FROM orden_detalles od
       INNER JOIN productos p ON od.producto_id = p.id
       WHERE od.orden_id = $1`,
      [ordenId]
    );

    res.status(201).json({
      message: 'Orden creada con éxito',
      orden_id: ordenId,
      total,
      detalles: detallesResult.rows
    });
  } catch (err) {
    console.error('Error al crear orden:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener órdenes (protegida)
router.get('/', verifyToken, async (req, res) => {
  const usuario_id = req.user.id;

  try {
    const ordenesResult = await pool.query(
      'SELECT * FROM ordenes WHERE usuario_id = $1 ORDER BY fecha DESC',
      [usuario_id]
    );

    const ordenes = [];

    for (const orden of ordenesResult.rows) {
      const detallesResult = await pool.query(
        `SELECT od.*, p.nombre, p.imagen 
         FROM orden_detalles od
         INNER JOIN productos p ON od.producto_id = p.id
         WHERE od.orden_id = $1`,
        [orden.id]
      );

      ordenes.push({
        ...orden,
        detalles: detallesResult.rows
      });
    }

    res.json(ordenes);
  } catch (err) {
    console.error('Error al obtener órdenes:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
