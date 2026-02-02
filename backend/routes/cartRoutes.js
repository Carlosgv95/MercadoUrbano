const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken } = require('../middlewares/authMiddleware');

// Obtener carrito del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const result = await pool.query(
      `SELECT c.id, c.producto_id, c.cantidad, p.nombre, p.precio, p.imagen
       FROM carrito c
       INNER JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = $1`,
      [usuarioId]
    );

    res.json({ carrito: result.rows });
  } catch (err) {
    console.error('Error al obtener carrito:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Comprar productos del carrito → crear orden
router.post('/comprar', verifyToken, async (req, res) => {
  const { productos, total } = req.body;
  const usuario_id = req.user.id;

  if (!productos || productos.length === 0 || !total) {
    return res.status(400).json({ message: 'Datos incompletos para crear la orden' });
  }

  try {
    const ordenResult = await pool.query(
      'INSERT INTO ordenes (usuario_id, total) VALUES ($1, $2) RETURNING id',
      [usuario_id, total]
    );
    const ordenId = ordenResult.rows[0].id;

    for (const p of productos) {
      await pool.query(
        'INSERT INTO orden_detalles (orden_id, producto_id, cantidad, precio) VALUES ($1, $2, $3, $4)',
        [ordenId, p.id, p.quantity, p.price]
      );
    }

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

module.exports = router;

