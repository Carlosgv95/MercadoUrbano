import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  // 🔐 Validar token y cargar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      api.get('/auth/verify')
        .then(() => {
          setUser(JSON.parse(storedUser));
        })
        .catch(() => {
          // Token inválido o expirado → limpiar sesión
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setUserLoaded(true));
    } else {
      setUserLoaded(true);
    }
  }, []);

  // 🔵 Login
  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Error en login');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // 🟢 Registro
  const register = async (formData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { data } = await api.post('/auth/register', formData);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Error en registro');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // 🔴 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 🟡 Fake login (para pruebas)
  const fakeLogin = () => {
    const mockUser = {
      id: 1,
      nombre: 'Usuario Demo',
      correo: 'demo@ejemplo.com'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'fake-token');
  };

  return (
    <UserContext.Provider
      value={{
        login,
        register,
        logout,
        fakeLogin,
        authLoading,
        authError,
        user,
        setUser,
        userLoaded
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

