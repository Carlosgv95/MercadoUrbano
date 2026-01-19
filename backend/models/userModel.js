// models/userModel.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas

/**
 * Registra un nuevo usuario en la base de datos.
 * La contraseña se encripta antes de ser almacenada.
 * @param {string} nombre - El nombre del usuario.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario (sin encriptar).
 * @param {string} rol - El rol del usuario (ej: cliente, admin).
 * @param {string} lenguaje - El lenguaje preferido del usuario.
 * @returns {Object} El objeto usuario recién creado (sin la contraseña encriptada).
 */
const registerUser = async (nombre, email, password, rol = 'cliente', lenguaje = 'es') => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO usuarios (nombre, email, password, rol, lenguaje)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, nombre, email, rol, lenguaje;
        `;
        const values = [nombre, email, hashedPassword, rol, lenguaje];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Error en userModel.registerUser:', error);
        if (error.code === '23505') {
            throw { code: 409, message: 'El email ya está registrado.' };
        }
        throw { code: 500, message: 'Error al registrar el usuario en la base de datos.' };
    }
};

/**
 * Busca un usuario por su email (incluye contraseña encriptada).
 */
const findUserByEmail = async (email) => {
    try {
        const query = 'SELECT id, nombre, email, password, rol, lenguaje FROM usuarios WHERE email = $1;';
        const { rows } = await pool.query(query, [email]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error en userModel.findUserByEmail:', error);
        throw { code: 500, message: 'Error al buscar el usuario en la base de datos.' };
    }
};

/**
 * Obtiene los datos de un usuario por su email (sin contraseña).
 */
const getUserDataByEmail = async (email) => {
    try {
        const query = 'SELECT id, nombre, email, rol, lenguaje FROM usuarios WHERE email = $1;';
        const { rows } = await pool.query(query, [email]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error en userModel.getUserDataByEmail:', error);
        throw { code: 500, message: 'Error al obtener los datos del usuario.' };
    }
};

module.exports = {
    registerUser,
    findUserByEmail,
    getUserDataByEmail
};
