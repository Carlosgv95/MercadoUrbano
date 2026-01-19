// middlewares/logger.js

// Middleware para registrar las peticiones HTTP con más contexto
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip; // IP del cliente
    const userAgent = req.get('User-Agent'); // Navegador/cliente que hace la petición

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - UA: ${userAgent}`);

    next(); // Pasa el control al siguiente middleware o ruta
};

module.exports = {
    requestLogger
};
