// config/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Carga las variables de entorno desde .env

// Configuración del pool de conexiones a la base de datos PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // útil si despliegas en la nube
    max: 10, // número máximo de conexiones simultáneas
    idleTimeoutMillis: 30000, // tiempo máximo que una conexión puede estar inactiva
    connectionTimeoutMillis: 2000 // tiempo máximo de espera para establecer conexión
});

// Probar la conexión al iniciar el módulo
pool.query('SELECT NOW()')
    .then(() => console.log('✅ Conexión a la base de datos PostgreSQL exitosa.'))
    .catch(err => console.error('❌ Error al conectar a la base de datos PostgreSQL:', err));

module.exports = pool;
