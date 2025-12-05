// backend/server.js (Nuevo contenido)

const express = require('express');
const cors = require('cors');
// require('dotenv').config(); // Si estás usando dotenv

const app = express();
const port = process.env.PORT || 5000; 

// 1. Middlewares globales
app.use(cors());
app.use(express.json()); // Para leer JSON del body
// app.use(express.urlencoded({ extended: true })); // Si manejas datos de formularios

// 2. Importar Rutas
const testRoutes = require('./routes/test.routes');
// const userRoutes = require('./routes/user.route'); // Otras rutas que añadas

// 3. Conectar Rutas a la Aplicación
// Todas las rutas dentro de testRoutes ahora empiezan con '/api'
app.use('/api', testRoutes); 
// app.use('/api/users', userRoutes); 

// 4. (Opcional) Lógica de conexión a DB (mover a db/connect.js más adelante)
// require('./db/connect')(); 

// 5. Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor MVC corriendo en http://localhost:${port}`);
    console.log(`Ruta de prueba: http://localhost:${port}/api`);
});