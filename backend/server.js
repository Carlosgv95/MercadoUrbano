const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Middlewares
const { requestLogger } = require('./middlewares/logger');

// Rutas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Render asigna dinámicamente el puerto
const port = process.env.PORT || 10000;

// --- CORS CORRECTO PARA PRODUCCIÓN ---
app.use(cors({
  origin: [
    'http://localhost:3001',                 // Desarrollo local
    'https://mercado-urbano-u3ip.vercel.app' // Frontend en Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// --- Middlewares globales ---
app.use(express.json());
app.use(requestLogger);

// --- Rutas ---
app.get("/", (req, res) => {
  res.send("¡Bienvenido al Backend de MercadoUrbano!");
});

app.use('/productos', productRoutes);
app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);
app.use('/carrito', cartRoutes);
app.use('/favoritos', favoritosRoutes);
app.use('/ordenes', orderRoutes);

// --- Manejo de rutas no encontradas ---
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada en MercadoUrbano.' });
});

// --- Iniciar servidor ---
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Servidor MercadoUrbano escuchando en http://localhost:${port}`);
    console.log('Rutas disponibles:');
    console.log(`  GET    http://localhost:${port}/productos`);
    console.log(`  POST   http://localhost:${port}/productos`);
    console.log(`  GET    http://localhost:${port}/productos/:id`);
    console.log(`  POST   http://localhost:${port}/usuarios`);
    console.log(`  POST   http://localhost:${port}/auth/login`);
    console.log(`  POST   http://localhost:${port}/favoritos`);
    console.log(`  GET    http://localhost:${port}/favoritos/:usuario_id`);
    console.log(`  DELETE http://localhost:${port}/favoritos`);
    console.log(`  POST   http://localhost:${port}/ordenes`);
    console.log(`  GET    http://localhost:${port}/ordenes/:usuario_id`);
    console.log(`  GET    http://localhost:${port}/ordenes/detalles/:orden_id`);
  });
}

module.exports = app;



