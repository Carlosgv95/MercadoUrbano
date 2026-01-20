// routes/productRoutes.js
const express = require('express');
const router = express.Router();
//const products = require('../data/products'); // importamos el catálogo

// GET /productos → devuelve todo el catálogo
router.get('/', (req, res) => {
    res.json(products);
});

// GET /productos/:id → devuelve un producto por ID
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
});

// GET /productos/categoria/:category → devuelve productos por categoría
router.get('/categoria/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filtered = products.filter(p => p.category.toLowerCase().includes(category));

    if (filtered.length === 0) {
        return res.status(404).json({ message: 'No hay productos en esta categoría' });
    }
    res.json(filtered);
});

module.exports = router;
