const express = require('express');
const router = express.Router();

// Simulación de base de datos temporal
const users = [];

router.post('/auth/register', (req, res) => {
  const { nombre, apellido, email, usuario, password, ciudad, region } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }

  const newUser = { id: users.length + 1, nombre, apellido, email, usuario, password, ciudad, region };
  users.push(newUser);

  res.json({ message: 'Usuario registrado con éxito', user: newUser });
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ message: 'Login exitoso 🚀', user });
});

module.exports = router;