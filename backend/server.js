const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { requestLogger } = require('./middlewares/logger');

// Rutas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 10000;

// 🔥🔥🔥 CORS DEBE IR AQUÍ — ANTES DE TODO 🔥🔥🔥
const corsOptions = {
  origin: [
    'http://localhost:3001',
    'https://mercado-urbano-u3ip.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// 🔥🔥🔥 FIN DE CORS 🔥🔥🔥

// Middlewares globales
app.use(express.json());
app.use(requestLogger);

// Rutas
app.get("/", (req, res) => {
  res.send("¡Bienvenido al Backend de MercadoUrbano!");
});

app.use('/productos', productRoutes);
app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);
app.use('/carrito', cartRoutes);
app.use('/favoritos', favoritosRoutes);
app.use('/ordenes', orderRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada en MercadoUrbano.' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor MercadoUrbano escuchando en http://localhost:${port}`);
});




