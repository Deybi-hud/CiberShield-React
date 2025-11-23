import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true
  });

  // Cargar datos al iniciar
  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      try {
        setAuth({
          user: JSON.parse(user),
          token: token,
          isAuthenticated: true,
          loading: false
        });
      } catch (error) {
        console.error('Error al cargar auth:', error);
        setAuth(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setAuth({
      user: userData,
      token: token,
      isAuthenticated: true,
      loading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false
    });
  };

  const updateUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuth(prev => ({
      ...prev,
      user: userData
    }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
