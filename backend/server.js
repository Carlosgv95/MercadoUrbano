// backend/server.js

const express = require('express');
const cors = require('cors');
// Si usas dotenv, descomenta las siguientes líneas
// require('dotenv').config(); 

const app = express();
// Define el puerto, usa la variable de entorno o un valor por defecto (ej. 5000)
const port = process.env.PORT || 5000; 

// Middlewares
app.use(cors());
app.use(express.json()); // Para poder leer JSON en las peticiones body

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor Express está funcionando!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});