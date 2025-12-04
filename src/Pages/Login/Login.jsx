import './Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authLoading, authError } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/profile');
    }
  };
    return (
        <>
    <div className='login'>
      <h2>Login</h2>
      {authError && <p className="error">{authError}</p>}
      <form onSubmit={handleSubmit} >
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
        />
        <button type="submit" disabled={authLoading}>
          {authLoading ? 'Iniciando Sesión...' : 'Login'}
        </button>
      </form>
      <p>
        No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
        </>
    )
}

export default Login