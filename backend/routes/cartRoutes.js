// routes/cartRoutes.js
const express = require('express');
const router = express.Router();

/**
 * GET /cart
 * Devuelve el estado actual del carrito
 */
router.get('/', (req, res) => {
    // Aquí podrías obtener el carrito desde la BD o sesión
    res.json({ success: true, message: 'Carrito actual', cart: [] });
});

/**
 * POST /cart/add
 * Agrega un producto al carrito
 */
router.post('/add', (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ success: false, message: 'productId y quantity son obligatorios.' });
    }

    // Aquí podrías guardar en BD o actualizar sesión
    res.json({ success: true, message: `Producto ${productId} agregado con cantidad ${quantity}` });
});

/**
 * DELETE /cart/remove/:productId
 * Elimina un producto específico del carrito
 */
router.delete('/remove/:productId', (req, res) => {
    const { productId } = req.params;

    // Aquí podrías eliminar de BD o sesión
    res.json({ success: true, message: `Producto ${productId} eliminado del carrito` });
});

/**
 * DELETE /cart/clear
 * Vacía todo el carrito
 */
router.delete('/clear', (req, res) => {
    // Aquí podrías vaciar el carrito en BD o sesión
    res.json({ success: true, message: 'Carrito vaciado con éxito' });
});

module.exports = router;
