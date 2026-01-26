const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno desde .env

// Importa los middlewares
const { requestLogger } = require('./middlewares/logger');

// Importa los módulos de rutas de MercadoUrbano
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes')

const app = express();
const port = process.env.PORT || 3001; // Usa el puerto del .env o 3000 por defecto

// --- Middlewares Globales ---
app.use('/favoritos', favoritosRoutes);

app.use(cors({
  origin: 'http://localhost:3001', // o el puerto donde corre tu React (5173 si usas Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
 // Habilita CORS para permitir peticiones desde el frontend
app.use(express.json()); // Para parsear cuerpos de petición JSON
app.use(requestLogger); // Middleware para registrar todas las peticiones recibidas

// --- Rutas de la API ---

// Ruta de bienvenida (para verificar que el servidor está corriendo)
app.get("/", (req, res) => {
    res.send("¡Bienvenido al Backend de MercadoUrbano!");
});

// Usa las rutas de productos
app.use('/productos', productRoutes);

// Usa las rutas de usuarios
app.use('/usuarios', userRoutes);

// Usa las rutas de autenticación
app.use('/auth', authRoutes);

// Usa las rutas del carrito
app.use('/carrito', cartRoutes);

// --- Manejo de rutas no encontradas (404) ---
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada en MercadoUrbano.' });
});

// --- Iniciación del servidor ---
// Solo inicia el servidor si NO estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Servidor MercadoUrbano escuchando en http://localhost:${port}`);
        console.log('Rutas disponibles:');
        console.log(`  POST   http://localhost:${port}/usuarios (Registro de usuario)`);
        console.log(`  POST   http://localhost:${port}/auth/login (Inicio de sesión, devuelve JWT)`);
        console.log(`  GET    http://localhost:${port}/productos (Obtener listado de productos)`);
        console.log(`  POST   http://localhost:${port}/productos (Agregar producto)`);
        console.log(`  DELETE http://localhost:${port}/productos/:id (Eliminar producto por ID)`);
        console.log(`  POST   http://localhost:${port}/carrito (Agregar producto al carrito, requiere JWT)`);
        console.log(`  GET    http://localhost:${port}/carrito (Obtener carrito del usuario, requiere JWT)`);
        console.log(`  DELETE http://localhost:${port}/carrito/:productoId (Eliminar producto del carrito, requiere JWT)`);
    });
}

// Exporta la app para Supertest
module.exports = app;


