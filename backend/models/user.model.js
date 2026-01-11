// backend/models/user.model.js

const { pool } = require('../db/config');

// Función para crear un nuevo usuario en la DB
const createUser = async (userData) => {
    const { nombre, apellido, correo_electronico, usuario, contrasena, ciudad, region } = userData;

    // Consulta SQL para insertar datos
    const query = `
        INSERT INTO users 
        (nombre, apellido, correo_electronico, usuario, contrasena, ciudad, region)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, usuario, correo_electronico, fecha_registro`; // RETURNING devuelve el usuario creado

    // Valores que se insertarán en la consulta
    const values = [nombre, apellido, correo_electronico, usuario, contrasena, ciudad, region];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Devuelve el primer (y único) registro insertado
    } catch (error) {
        throw new Error(`Error al crear el usuario en la DB: ${error.message}`);
    }
};

module.exports = {
    createUser
};