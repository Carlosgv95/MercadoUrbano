// backend/server.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Rutas
const testRoutes = require('./routes/test.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api', testRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});