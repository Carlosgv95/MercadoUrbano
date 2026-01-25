// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');


async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email=$1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Error en loginUser:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = { loginUser };

