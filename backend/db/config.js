// backend/db/config.js

const Pool = require('pg').Pool;

// Configuración usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Exportamos la Pool para que los modelos puedan ejecutar consultas
module.exports = {
    pool,
    // Función para conectar y probar la conexión
    connectDB: async () => {
        try {
            await pool.connect();
            console.log('✅ Conexión exitosa a PostgreSQL.');
        } catch (error) {
            console.error('❌ Error al conectar a PostgreSQL:', error.message);
            // Si la conexión falla al inicio, el servidor no debería correr
            process.exit(1); 
        }
    }
};