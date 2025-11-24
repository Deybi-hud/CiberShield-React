import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (token && usuarioGuardado) {

      const userData = JSON.parse(usuarioGuardado);
      setUsuario(userData);
      setIsAuthenticated(true);

    }
    setLoading(false);
  }, []);

  const login = (usuarioData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    setUsuario(usuarioData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setUsuario(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ usuario, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
