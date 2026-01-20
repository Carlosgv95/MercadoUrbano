import React, { createContext, useState } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
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
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Error en registro');
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ login, register, authLoading, authError, user }}>
      {children}
    </UserContext.Provider>
  );
};