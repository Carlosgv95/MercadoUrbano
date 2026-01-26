
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno desde .env

// Middlewares
const { requestLogger } = require('./middlewares/logger');

// Importa las rutas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const orderRoutes = require('./routes/orderRoutes'); // ✅ Nueva ruta para órdenes

const app = express();
const port = process.env.PORT || 3000; // ✅ Backend en puerto 3000

// --- Middlewares Globales ---
app.use(cors({
  origin: 'http://localhost:3001', // ✅ Puerto del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); // ✅ Parseo de JSON
app.use(requestLogger); // ✅ Logger de peticiones

// --- Rutas de la API ---
app.get("/", (req, res) => {
  res.send("¡Bienvenido al Backend de MercadoUrbano!");
});

app.use('/productos', productRoutes);
app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);
app.use('/carrito', cartRoutes);
app.use('/favoritos', favoritosRoutes);
app.use('/ordenes', orderRoutes); // ✅ Ruta para órdenes

// --- Manejo de rutas no encontradas ---
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada en MercadoUrbano.' });
});

// --- Iniciación del servidor ---
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor MercadoUrbano escuchando en http://localhost:${port}`);
    console.log('Rutas disponibles:');
    console.log(`  GET    http://localhost:${port}/productos (Obtener listado de productos)`);
    console.log(`  POST   http://localhost:${port}/productos (Agregar producto)`);
    console.log(`  GET    http://localhost:${port}/productos/:id (Obtener producto por ID)`);
    console.log(`  POST   http://localhost:${port}/usuarios (Registro de usuario)`);
    console.log(`  POST   http://localhost:${port}/auth/login (Inicio de sesión, devuelve JWT)`);
    console.log(`  POST   http://localhost:${port}/favoritos (Añadir producto a favoritos)`);
    console.log(`  GET    http://localhost:${port}/favoritos/:usuario_id (Obtener favoritos del usuario)`);
    console.log(`  DELETE http://localhost:${port}/favoritos (Eliminar producto de favoritos)`);
    console.log(`  POST   http://localhost:${port}/ordenes (Crear orden)`);
    console.log(`  GET    http://localhost:${port}/ordenes/:usuario_id (Obtener órdenes del usuario)`);
    console.log(`  GET    http://localhost:${port}/ordenes/detalles/:orden_id (Detalles de una orden)`);
  });
}

module.exports = app;


