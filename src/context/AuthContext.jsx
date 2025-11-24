 
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('usuario');
    if (saved) {
      setUsuario(JSON.parse(saved));
    }
  }, []);

  const login = (usuarioData) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
    setUsuario(usuarioData);
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const isAuthenticated = () => !!usuario;
  const isAdmin = () => usuario?.rol === 'ADMIN';

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};