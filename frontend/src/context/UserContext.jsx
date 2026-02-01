import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false); // ⬅️ NUEVO

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Asegura que userLoaded se active DESPUÉS de setUser
    setTimeout(() => setUserLoaded(true), 0);
  }, []);

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

  const register = async (formData) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Error en registro');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const fakeLogin = () => {
    const mockUser = {
      id: 1,
      name: 'Usuario Demo',
      email: 'demo@ejemplo.com'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
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
        setUser,      // ⬅️ NECESARIO PARA ACTUALIZAR PERFIL
        userLoaded    // ⬅️ NECESARIO PARA evitar el Swal al iniciar
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
