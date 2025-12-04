import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [email, setEmail] = useState(localStorage.getItem('email') || null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    const login = async (email, password) => {
        setAuthLoading(true);
        setAuthError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.token && data.email) {
                setToken(data.token);
                setEmail(data.email);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);
                return true;
            } else {
                setAuthError(data?.error || 'Error al iniciar sesión');
                return false;
            }
        } catch (error) {
            setAuthError('Error de conexión');
            return false;
        } finally {
            setAuthLoading(false);
        }
    };

    const register = async (email, password) => {
        setAuthLoading(true);
        setAuthError(null);
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.token && data.email) {
                setToken(data.token);
                setEmail(data.email);
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);
                return true;
            } else {
                setAuthError(data?.error || 'Error al registrarse');
                return false;
            }
        } catch (error) {
            setAuthError('Error de conexión');
            return false;
        } finally {
            setAuthLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const fetchProfile = async () => {
        if (!token) return null;
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok && data.email) {
                setEmail(data.email);
                localStorage.setItem('email', data.email);
                return data;
            } else {
                logout();
                return null;
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            return null;
        }
    };

    return (
        <UserContext.Provider value={{ token, email, login, register, logout, fetchProfile, authLoading, authError, setToken }}>
            {children}
        </UserContext.Provider>
    );
  };

export default UserProvider;