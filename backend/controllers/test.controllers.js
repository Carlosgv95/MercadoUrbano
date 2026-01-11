// backend/controllers/test.controller.js

// Función que maneja la lógica para la ruta GET /
const test = (req, res) => {
    // En un proyecto real, aquí iría la lógica (ej. llamar a un modelo para obtener datos)
    res.status(200).send('¡Servidor Express está funcionando desde el CONTROLADOR!');
};

module.exports = {
    test
};