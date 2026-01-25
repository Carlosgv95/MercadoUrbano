import './Login.css'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import Loading from "../../components/Loading/Loading"; // importa tu componente Loading

// Funciones de validación
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8; // mínimo 8 caracteres
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authLoading, authError } = useContext(UserContext);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones antes de llamar al contexto
    if (!validateEmail(email)) {
      setLocalError("El correo electrónico no es válido");
      return;
    }
    if (!validatePassword(password)) {
      setLocalError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/profile');
      } else {
        setLocalError("Credenciales incorrectas");
      }
    } catch (error) {
      setLocalError("Error inesperado al iniciar sesión");
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>

      {/* Mostrar errores de validación local o del contexto */}
      {(localError || authError) && (
        <p className="error">{localError || authError}</p>
      )}

      {authLoading ? (
        <Loading message="Iniciando sesión..." />
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <button type="submit">
            Login
          </button>
        </form>
      )}

      <p>
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
  );
};

export default Login;