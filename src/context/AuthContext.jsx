
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');

    if (token && usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
      setIsAuthenticated(true);
    }
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
    <AuthContext.Provider value={{ usuario, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
